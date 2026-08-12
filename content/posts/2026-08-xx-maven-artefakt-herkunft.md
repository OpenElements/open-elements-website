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

Reproducible Builds beruhen auf einer einfachen Zusage: derselbe Quellcode, dieselbe Build-Umgebung, dasselbe Ergebnis, Byte für Byte. Wer diese Zusage überprüfen will, braucht eine verlässliche Referenz, und genau an dieser Stelle wird es interessant, denn die Referenz liegt bei Maven im lokalen Repository, also in einem Verzeichnis, dem man auf den ersten Blick nicht ansehen kann, woher sein Inhalt stammt.

Dieser Artikel geht der Frage nach, wie Maven Artefakte auflöst, welche Rolle die Manager und Requests des Maven Resolvers dabei spielen, was in der unscheinbaren Datei `_remote.repositories` steht, und wie sich daraus eine konkrete Verbesserung für das Apache Maven Artifact Plugin ableiten lässt.

## Warum die Herkunft ein Supply-Chain-Thema ist

Das Maven Artifact Plugin ist das Werkzeug, mit dem im Maven-Ökosystem Reproducible Builds nachgewiesen werden. Das Ziel `artifact:buildinfo` erzeugt eine Beschreibung des Build-Ergebnisses inklusive Checksummen, und `artifact:compare` vergleicht das Ergebnis des aktuellen Builds mit einer Referenz. Wenn beide übereinstimmen, ist gezeigt, dass die veröffentlichten Artefakte tatsächlich aus dem angegebenen Quellcode entstanden sein können.

Ein Vergleich ist allerdings nur so gut wie sein Vergleichsmaßstab. Wenn eine der beteiligten Abhängigkeiten nicht aus einem öffentlichen Repository stammt, sondern aus einem `mvn install`, das vor drei Wochen auf demselben Rechner gelaufen ist, dann vergleicht man am Ende ein lokales Ergebnis mit einem anderen lokalen Ergebnis. Das Resultat sieht sauber aus, es sagt aber nichts über die öffentlich veröffentlichten Artefakte aus. Aus Supply-Chain-Sicht ist ein lokal installiertes Artefakt ein Eingang in den Build, der von niemandem geprüft wurde, weder durch eine Signatur noch durch eine Checksumme gegen ein Remote-Repository.

Genau diese Lücke wurde in MARTIFACT-58 beschrieben. Seine Beobachtung: `artifact:compare` vergleicht die Ausgabe des aktuellen Builds mit Inhalten aus dem lokalen Repository, und was sich dabei nicht leicht erkennen lässt, ist, ob dieser Inhalt aus einem früheren lokalen `mvn install` stammt oder aus einem Remote-Repository heruntergeladen wurde. Sein Vorschlag war, dass das Plugin diese Information selbst ermitteln und anzeigen könnte.

## Das lokale Repository als gemischte Ablage

Die Maven-Dokumentation beschreibt das lokale Repository offen als gemischte Ablage, die zwei Aufgaben gleichzeitig erfüllt: Sie ist Cache für Artefakte, die von einem Remote-Repository geladen wurden, und sie ist Ablage für Artefakte, die lokal gebaut und installiert wurden. Beide landen im selben Layout, also unter demselben Pfad aus GroupId, ArtifactId und Version. Aus dem Pfad allein lässt sich die Herkunft folglich nicht ablesen.

Die Dokumentation ist an dieser Stelle sehr deutlich: Nutzer sollen niemals mit einfachen Dateioperationen direkt in das lokale Repository greifen, sondern immer die bereitgestellte API verwenden. Der Grund ist, dass es heute mehrere Implementierungen des lokalen Repositorys gibt, dass sich das Layout ändern kann, und dass direkter Dateizugriff wichtige Aspekte wie Locking und Synchronisation umgeht. Wer die Herkunftsfrage beantworten will, sollte sie also über die API stellen.

## Die Manager im Maven Resolver

Unterhalb von Maven arbeitet der Maven Artifact Resolver, das frühere Aether. Er kapselt alles, was mit Repositories zu tun hat, hinter dem Einstiegspunkt `RepositorySystem` und einer `RepositorySystemSession`, die die aktuelle Konfiguration des Builds trägt.

Für das lokale Repository ist der `LocalRepositoryManager` zuständig, kurz LRM. Der Resolver bringt zwei Implementierungen mit. Die Variante `simple` ist funktionsfähig, aber vor allem für Tests gedacht und nicht für den produktiven Einsatz empfohlen. Die Variante `enhanced` ist die zur Laufzeit verwendete, und sie ist genau dort erweitert, wo es für dieses Thema zählt: Sie merkt sich, aus welchem Repository ein gecachtes Artefakt aufgelöst wurde.

Diese Buchführung hat einen ganz praktischen Zweck. Wenn ein Artefakt A1 aus dem Repository R1 geladen wurde und ein späterer Build dasselbe Artefakt benötigt, R1 aber nicht kennt, dann behandelt der Enhanced LRM das lokal vorhandene A1 als nicht vorhanden und lädt es erneut. Die Begründung ist ein Vertrauensargument: Zwei Artefakte mit identischen Koordinaten aus zwei verschiedenen Repositories müssen nicht dasselbe sein. Dieselbe Mechanik erklärt übrigens die gelegentlich verwirrende Fehlermeldung, dass ein Artefakt nicht auflösbar sei, obwohl es sichtbar im Verzeichnis liegt.

Ergänzend gibt es weitere Manager und Komponenten, die in derselben Schicht arbeiten. Der `RemoteRepositoryManager` aggregiert Repositories, wendet Mirrors an und verwaltet Update-Policies. Ein `WorkspaceReader` erlaubt es, Artefakte aus dem laufenden Reactor oder einer IDE zu beziehen, ohne dass sie überhaupt installiert werden. Und der Chained Local Repository Manager kombiniert ein schreibbares LRM mit einer Liste nur lesbarer weiterer lokaler Repositories, was insbesondere für verschachtelte Builds hilfreich ist.

Erwähnenswert ist außerdem das Split-Feature des Enhanced LRM. Es ist standardmäßig deaktiviert, kann aber über Konfigurationsschalter aktiviert werden und trennt den Inhalt des lokalen Repositorys physisch, nämlich nach gecacht und lokal installiert, nach Herkunftsrepository, sowie nach Release und Snapshot. Wer regelmäßig Rebuilds verifiziert, bekommt damit ein sehr direktes Werkzeug in die Hand, denn dann lassen sich alle lokal installierten Artefakte löschen, ohne dass anschließend das halbe Internet erneut heruntergeladen werden muss.

## Die Requests im Maven Resolver

Die Resolver-API ist konsequent nach dem Muster Request und Result aufgebaut, und die verschiedenen Request-Typen entsprechen den verschiedenen Fragen, die man an ein Repository stellen kann.

`VersionRequest` und `VersionRangeRequest` klären Koordinaten, etwa die Auflösung eines Versionsbereichs oder die Übersetzung einer Snapshot-Version in eine konkrete Zeitstempelversion. Der `ArtifactDescriptorRequest` liest die Beschreibung eines Artefakts, also im Wesentlichen dessen POM inklusive direkter Abhängigkeiten und möglicher Relocations. Der `CollectRequest` baut daraus einen Abhängigkeitsgraphen auf und liefert im `CollectResult` einen Baum aus `DependencyNode`-Objekten, ohne dabei die eigentlichen Dateien herunterzuladen. Der `DependencyRequest` geht einen Schritt weiter und löst zusätzlich die Dateien des Graphen auf. Der `ArtifactRequest` schließlich fragt nach genau einem Artefakt und liefert ein `ArtifactResult` zurück. Daneben stehen `MetadataRequest` für Repository-Metadaten, `LocalArtifactRequest` als Frage direkt an das lokale Repository, sowie `InstallRequest` und `DeployRequest` für den Weg nach außen.

Die Trennung zwischen Sammeln und Auflösen ist für unsere Fragestellung der entscheidende Punkt. Man kann den vollständigen Abhängigkeitsbaum aufbauen, ohne Downloads auszulösen, und danach gezielt einzelne Knoten auflösen, um zu erfahren, woher sie kommen. Denn `ArtifactResult` trägt eine Methode `getRepository()`, und diese liefert das Repository, aus dem das Artefakt tatsächlich bezogen wurde.

## Die Datei `_remote.repositories`

Damit `getRepository()` überhaupt eine sinnvolle Antwort geben kann, muss die Information irgendwo persistiert sein, und genau das ist die Aufgabe der Tracking-Datei `_remote.repositories`. Der Enhanced LRM legt sie in jedem Verzeichnis des lokalen Repositorys an, in dem er Artefakte verwaltet. Ihr Name ist konfigurierbar, der Standard ist der genannte.

Der Inhalt ist eine Java-Properties-Datei. Die Schlüssel bestehen aus dem Dateinamen, einem `>` als Trenner und der Id des Repositorys, aus dem die Datei bezogen wurde. Der Wert bleibt leer. Ein Verzeichnis kann damit etwa so aussehen:

```
#NOTE: This is a Maven Resolver internal implementation file, its format can be changed without prior notice.
artifact-1.0.pom>central=
artifact-1.0.jar>central=
artifact-1.0.pom>my_repo_id=
```

Der entscheidende Sonderfall ist die leere Repository-Id. Ein Eintrag der Form `artifact-1.0.jar>=` bedeutet, dass diese Datei nicht heruntergeladen, sondern lokal installiert wurde. Der Resolver verwendet dafür intern eine Konstante mit dem Wert einer leeren Zeichenkette. Fehlt zu einer vorhandenen Datei jeglicher Eintrag, dann behandelt der Enhanced LRM sie ebenfalls als lokal installiert, und zwar aus Kompatibilität mit dem Simple LRM, der keine Tracking-Datei schreibt.

Diese Datei ist damit die eigentliche Antwort auf MARTIFACT-58, allerdings nicht als Datei, die man selbst lesen sollte. Sie trägt ihren Warnhinweis im Kopf, ihr Format kann sich jederzeit ändern, ihr Name ist konfigurierbar, und bei aktiviertem Split-Feature liegt sie ohnehin an einem anderen Ort als erwartet. Der richtige Weg führt über die API, und dort ist die Information bereits aufbereitet: `LocalArtifactResult.getRepository()` liefert das Remote-Repository, aus dem ein Artefakt gecacht wurde, und `null`, wenn es lokal installiert wurde. Der `DefaultArtifactResolver` übersetzt diesen Fall nach oben, indem er im `ArtifactResult` das lokale Repository einträgt. Aus der leeren Repository-Id in einer Textdatei wird auf diesem Weg eine Instanz von `LocalRepository` in der Plugin-API.

## Die Umsetzung im Maven Artifact Plugin

Genau diese Kette nutzt der Pull Request [#227](https://github.com/apache/maven-artifact-plugin/pull/227) für das Apache Maven Artifact Plugin. Die Änderung sitzt in `ReferenceBuildinfoUtil`, also dort, wo das Plugin die Referenz für den Vergleich ermittelt, und wird aus `CompareMojo` aufgerufen, das nun die `RepositorySystemSession` und die Liste der Remote-Repositories durchreicht.

Der Ablauf ist bewusst schlicht. Zunächst wird über einen `CollectRequest` der Abhängigkeitsbaum des betrachteten Artefakts gesammelt, was ohne Downloads geschieht. Anschließend wird der Baum traversiert, und für jeden betrachteten Knoten wird ein `ArtifactRequest` gestellt, dem explizit die Remote-Repositories des Projekts mitgegeben werden. Aus dem `ArtifactResult` wird das Repository ausgelesen, und wenn dieses eine `LocalRepository` ist, dann steht fest, dass das Artefakt aus einer lokalen Installation stammt.

In diesem Fall gibt das Plugin eine Warnung aus:

```
The artifact org.slf4j:slf4j-api:1.7.36 is stemming from a local install to your
local Maven repository. Please ensure that this is intended. If not, consider
removing this artifact and rebuilding and that your locally installed artifact
from /home/user/.m2/repository/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar
matches public reference from remote.
```

Drei Details an dieser Meldung sind das Ergebnis des Reviews und lohnen einen Blick. Erstens wurde die Formulierung von der ursprünglichen Fassung präzisiert, denn die Aussage lautet nicht, dass das Artefakt aus dem lokalen Repository kommt, was auf jedes gecachte Artefakt zutreffen würde, sondern dass es aus einer lokalen Installation in dieses Repository stammt. Zweitens benennt die Meldung ausdrücklich das eigentliche Risiko, nämlich dass das lokal installierte Artefakt der öffentlich veröffentlichten Referenz entsprechen muss. Drittens enthält sie den absoluten Pfad, damit man die betroffene Datei direkt löschen und den Build wiederholen kann.

Bewusst gewählt ist auch, dass es sich um eine Warnung handelt und nicht um einen Fehler. Lokale Installationen sind ein legitimer Teil vieler Arbeitsabläufe, etwa bei Multi-Modul-Projekten oder beim Testen eines noch nicht veröffentlichten Snapshots. Der Build soll deshalb weiterlaufen, aber die Information soll sichtbar sein. Aus demselben Grund führt ein Fehlschlag der Prüfung selbst nur zu einer weiteren Warnung und nicht zum Abbruch. Ein Integrationstest im Szenario `compare-mono` prüft, dass die Warnung tatsächlich im Build-Log erscheint, damit die Zusage nicht unbemerkt verloren geht.

## Was sich daraus für die Praxis ergibt

Für Anwender bedeutet die Änderung, dass ein Reproducible-Build-Vergleich künftig von selbst darauf hinweist, wenn seine Grundlage nicht so belastbar ist, wie sie aussieht. Wer Rebuilds systematisch verifiziert, sollte darüber hinaus zwei Dinge in Betracht ziehen. Zum einen lohnt es sich, Verifikationsbuilds in einem separaten lokalen Repository laufen zu lassen, damit lokal installierte Artefakte gar nicht in Reichweite kommen. Zum anderen ist das Split-Feature des Enhanced LRM genau für diese Art von Hygiene gedacht, denn es macht die Trennung zwischen selbst gebauten und heruntergeladenen Artefakten physisch sichtbar und erlaubt gezieltes Aufräumen.

Der allgemeinere Punkt aber ist, dass die Information über die Herkunft eines Artefakts in Maven längst vorhanden war. Sie lag in einer internen Datei, die man nicht anfassen soll, und war über eine API erreichbar, die man dafür kennen muss. Was gefehlt hat, war die Verbindung zwischen dieser vorhandenen Information und der Stelle, an der sie eine Entscheidung beeinflusst. Solche Verbindungen zu ziehen ist ein guter Teil der Arbeit an Supply-Chain-Sicherheit, und sie besteht seltener aus neuen Mechanismen als aus dem Sichtbarmachen dessen, was das Werkzeug längst weiß.

---

*Die Arbeit an Apache Maven im Rahmen von Support & Care wird durch die Sovereign Tech Agency gefördert.*

*Dieser Artikel ist mithilfe von AI entstanden*