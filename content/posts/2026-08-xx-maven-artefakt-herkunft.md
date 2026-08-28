---
outdated: false
showInBlog: true
title: "Von der Supply Chain, lokal gebauten Artefakten und wie Maven damit umgeht"
slug: genug-geredet-wie-digitale-souveränität-von-der-un-bis-dortmund-konkret-wird
date: 2026-08-12
author: sebastian
excerpt: "Lokal gebaute Artefakte können ein Problem für Reproducible Builds sein und damit ein Risiko für die Supply Chain. Ich zeige hier, wie das Auflösen von Artefakten in Maven passiert und wie man sehen kann, ob ein selbstgebautes Artefakt fäschlicher Weise verwerndet wurde."
categories: [Open Elements, Open-Source, Security, Java]
preview_image: "/posts/preview-images/oss-world.svg"
---


# Woher kommt dieses Artefakt eigentlich? Maven, das lokale Repository und die Datei `_remote.repositories`

Reproducible Builds beruhen auf einer einfachen Zusage: derselbe Quellcode, dieselbe Build-Umgebung, dasselbe Ergebnis, Byte für Byte. Wer diese Zusage überprüfen will, braucht eine verlässliche Referenz, und genau an dieser Stelle wird es interessant, denn die Referenz liegt bei Maven im lokalen Repository, also in einem Verzeichnis, dem man auf den ersten Blick nicht ansehen kann, woher sein Inhalt stammt. Technisch haben wir das Thema bereits in einem anderen [Blogpost](https://open-elements.com/posts/2025/09/12/reproducible-builds) im Kontext von Apache Maven und den Auswirkungen auf die Supply Chain beleuchtet.

Hier wollen wir die Frage beantworten, wie Maven Artefakte auflöst und verwaltet, was in der unscheinbaren Datei `_remote.repositories` steht, und wie sich daraus eine konkrete Verbesserung für das Apache Maven Artifact Plugin ableiten lässt.

## Warum die Herkunft ein Supply-Chain-Thema ist

Das [Maven Artifact Plugin](https://maven.apache.org/plugins/maven-artifact-plugin/) ist das Werkzeug, mit dem im Maven-Ökosystem Reproducible Builds nachgewiesen werden. Das Ziel `artifact:buildinfo` erzeugt eine Beschreibung des Build-Ergebnisses inklusive Checksummen, und `artifact:compare` vergleicht das Ergebnis des aktuellen Builds mit einer Referenz. Wenn beide übereinstimmen, ist gezeigt, dass die veröffentlichten Artefakte tatsächlich aus dem angegebenen Quellcode entstanden sein können.

Ein Vergleich ist allerdings nur so gut wie sein Vergleichsmaßstab. Wenn eine der beteiligten Abhängigkeiten nicht aus einem öffentlichen Repository stammt, sondern aus einem `mvn install`, das vor drei Wochen auf demselben Rechner gelaufen ist, dann vergleicht man am Ende ein lokales Ergebnis mit einem anderen lokalen Ergebnis. Das Resultat sieht sauber aus, es sagt aber nichts über die öffentlich veröffentlichten Artefakte aus. Aus Supply-Chain-Sicht ist ein lokal installiertes Artefakt ein Eingang in den Build, der von niemandem geprüft wurde, weder durch eine Signatur noch durch eine Checksumme gegen ein Remote-Repository.

Genau diese Lücke wurde in [MARTIFACT-58](https://github.com/apache/maven-artifact-plugin/issues/146) beschrieben. Seine Beobachtung: `artifact:compare` vergleicht die Ausgabe des aktuellen Builds mit Inhalten aus dem lokalen Repository, und was sich dabei nicht leicht erkennen lässt, ist, ob dieser Inhalt aus einem früheren lokalen `mvn install` stammt oder aus einem Remote-Repository heruntergeladen wurde. Sein Vorschlag war, dass das Plugin diese Information selbst ermitteln und anzeigen könnte.

## Das lokale Repository als gemischte Ablage

Die [Maven-Dokumentation](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) beschreibt das lokale Repository als gemischte Ablage, die zwei Aufgaben gleichzeitig erfüllt: Sie ist Cache für Artefakte, die von einem Remote-Repository geladen wurden, und sie ist Ablage für Artefakte, die lokal gebaut und installiert wurden. Beide landen im selben Layout, also unter demselben Pfad aus GroupId, ArtifactId und Version. Aus dem Pfad allein lässt sich die Herkunft folglich nicht ablesen.

Die Dokumentation ist an dieser Stelle sehr deutlich: Nutzer sollen niemals mit einfachen Dateioperationen direkt in das lokale Repository greifen, sondern immer die bereitgestellte API verwenden. Der Grund ist, dass es heute mehrere Implementierungen des lokalen Repositorys gibt, dass sich das Layout ändern kann, und dass direkter Dateizugriff wichtige Aspekte wie Locking und Synchronisation umgeht. Wer die Herkunftsfrage beantworten will, sollte sie also über die API stellen.

## Wie Maven das lokale Repository verwaltet

Unterhalb von Maven arbeitet der Maven Artifact Resolver, das frühere Aether. Er kapselt alles, was mit Repositories zu tun hat, also das Auflösen von Koordinaten, das Herunterladen, das Zwischenspeichern und das Installieren. Für das lokale Repository ist dabei eine eigene Verwaltungsschicht zuständig, und die zur Laufzeit verwendete Variante tut mehr, als Dateien an der richtigen Stelle abzulegen. Sie führt Buch darüber, aus welchem Repository ein zwischengespeichertes Artefakt ursprünglich stammt.

Diese Buchführung hat einen ganz praktischen Zweck. Wenn ein Artefakt aus einem Repository R1 geladen wurde und ein späterer Build dasselbe Artefakt benötigt, R1 aber nicht kennt, dann gilt das lokal vorhandene Artefakt als nicht vorhanden und wird erneut geladen. Die Begründung ist ein Vertrauensargument: Zwei Artefakte mit identischen Koordinaten aus zwei verschiedenen Repositories müssen nicht dasselbe sein. Dieselbe Mechanik erklärt übrigens die gelegentlich verwirrende Fehlermeldung, dass ein Artefakt nicht auflösbar sei, obwohl es sichtbar im Verzeichnis liegt.

Erwähnenswert ist außerdem eine Möglichkeit, die standardmäßig nicht aktiv ist, sich aber über Konfigurationsschalter einschalten lässt. Maven kann das lokale Repository physisch aufteilen, nämlich nach zwischengespeichert und lokal installiert, nach Herkunftsrepository, sowie nach Release und Snapshot. Wer regelmäßig Rebuilds verifiziert, bekommt damit ein sehr direktes Werkzeug in die Hand, denn dann lassen sich alle lokal installierten Artefakte löschen, ohne dass anschließend das halbe Internet erneut heruntergeladen werden muss.

Bleibt die Frage, wo diese Buchführung eigentlich liegt, und die Antwort ist eine einzelne, leicht zu übersehende Datei.

## Die Datei `_remote.repositories`

Die Herkunftsinformation, die Maven beim Herunterladen mitschreibt, landet in der Tracking-Datei `_remote.repositories`. Maven legt sie in jedem Verzeichnis des lokalen Repositorys an, in dem Artefakte verwaltet werden. Ihr Name ist konfigurierbar, der Standard ist der genannte.

Der Inhalt ist eine Java-Properties-Datei. Die Schlüssel bestehen aus dem Dateinamen, einem `>` als Trenner und der Id des Repositorys, aus dem die Datei bezogen wurde. Der Wert bleibt leer. Ein Verzeichnis kann damit etwa so aussehen:

```
#NOTE: This is a Maven Resolver internal implementation file, its format can be changed without prior notice.
artifact-1.0.pom>central=
artifact-1.0.jar>central=
artifact-1.0.pom>my_repo_id=
```

Der entscheidende Sonderfall ist die leere Repository-Id. Ein Eintrag der Form `artifact-1.0.jar>=` bedeutet, dass diese Datei nicht heruntergeladen, sondern lokal installiert wurde. Fehlt zu einer vorhandenen Datei jeglicher Eintrag, dann gilt sie ebenfalls als lokal installiert.

Diese Datei ist damit die eigentliche Antwort auf MARTIFACT-58, allerdings nicht als Datei, die man selbst lesen sollte. Sie trägt ihren Warnhinweis im Kopf, ihr Format kann sich jederzeit ändern, ihr Name ist konfigurierbar, und bei aufgeteiltem lokalen Repository liegt sie ohnehin an einem anderen Ort als erwartet. Der richtige Weg führt über die API, und dort ist die Information bereits aufbereitet. Wer ein Artefakt auflöst, erfährt gleich mit, aus welchem Repository es kam, und im Fall einer lokalen Installation ist das eben das lokale Repository selbst. Aus der leeren Repository-Id in einer Textdatei wird auf diesem Weg eine schlichte Ja-oder-Nein-Frage, die ein Plugin stellen kann.

## Die Umsetzung im Maven Artifact Plugin

Genau diese Möglichkeit nutzt der Pull Request [#227](https://github.com/apache/maven-artifact-plugin/pull/227) für das Apache Maven Artifact Plugin. Die Änderung sitzt dort, wo das Plugin die Referenz für den Vergleich ermittelt, und sie bekommt vom Vergleichsziel die aktuelle Repository-Konfiguration des Builds mitgegeben.

Der Ablauf ist bewusst schlicht. Zunächst wird der Abhängigkeitsbaum des betrachteten Artefakts aufgebaut, ohne dass dabei Dateien heruntergeladen werden. Anschließend wird der Baum durchlaufen, und jedes betrachtete Artefakt wird gegen die Remote-Repositories des Projekts aufgelöst. Stellt sich dabei heraus, dass die Auflösung im lokalen Repository geendet hat, dann stammt das Artefakt aus einer lokalen Installation.

In diesem Fall gibt das Plugin eine Warnung aus:

```
The artifact org.slf4j:slf4j-api:1.7.36 is stemming from a local install to your
local Maven repository. Please ensure that this is intended. If not, consider
removing this artifact and rebuilding and that your locally installed artifact
from /home/user/.m2/repository/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar
matches public reference from remote.
```

Drei Details an dieser Meldung sind das Ergebnis des Reviews und lohnen einen Blick. Erstens wurde die Formulierung von der ursprünglichen Fassung präzisiert, denn die Aussage lautet nicht, dass das Artefakt aus dem lokalen Repository kommt, was auf jedes gecachte Artefakt zutreffen würde, sondern dass es aus einer lokalen Installation in dieses Repository stammt. Zweitens benennt die Meldung ausdrücklich das eigentliche Risiko, nämlich dass das lokal installierte Artefakt der öffentlich veröffentlichten Referenz entsprechen muss. Drittens enthält sie den absoluten Pfad, damit man die betroffene Datei direkt löschen und den Build wiederholen kann.

Bewusst gewählt ist auch, dass es sich um eine Warnung handelt und nicht um einen Fehler. Lokale Installationen sind ein legitimer Teil vieler Arbeitsabläufe, etwa bei Multi-Modul-Projekten oder beim Testen eines noch nicht veröffentlichten Snapshots. Der Build soll deshalb weiterlaufen, aber die Information soll sichtbar sein. Aus demselben Grund führt ein Fehlschlag der Prüfung selbst nur zu einer weiteren Warnung und nicht zum Abbruch. Ein Integrationstest prüft, dass die Warnung tatsächlich im Build-Log erscheint, damit die Zusage nicht unbemerkt verloren geht.

## Was sich daraus für die Praxis ergibt

Für Anwender bedeutet die Änderung, dass ein Reproducible-Build-Vergleich künftig von selbst darauf hinweist, wenn seine Grundlage nicht so belastbar ist, wie sie aussieht. Wer Rebuilds systematisch verifiziert, sollte darüber hinaus zwei Dinge in Betracht ziehen. Zum einen lohnt es sich, Verifikationsbuilds in einem separaten lokalen Repository laufen zu lassen, damit lokal installierte Artefakte gar nicht in Reichweite kommen. Zum anderen ist die oben erwähnte Aufteilung des lokalen Repositorys genau für diese Art von Hygiene gedacht, denn sie macht die Trennung zwischen selbst gebauten und heruntergeladenen Artefakten physisch sichtbar und erlaubt gezieltes Aufräumen.

Der allgemeinere Punkt aber ist, dass die Information über die Herkunft eines Artefakts in Maven längst vorhanden war. Sie lag in einer internen Datei, die man nicht anfassen soll, und war über eine API erreichbar, die man dafür kennen muss. Was gefehlt hat, war die Verbindung zwischen dieser vorhandenen Information und der Stelle, an der sie eine Entscheidung beeinflusst. Solche Verbindungen zu ziehen ist ein guter Teil der Arbeit an Supply-Chain-Sicherheit, und sie besteht seltener aus neuen Mechanismen als aus dem Sichtbarmachen dessen, was das Werkzeug längst weiß.

---

*Die Arbeit an Apache Maven im Rahmen von Support & Care wird durch die Sovereign Tech Agency gefördert.*

*Dieser Artikel ist mithilfe von AI entstanden*