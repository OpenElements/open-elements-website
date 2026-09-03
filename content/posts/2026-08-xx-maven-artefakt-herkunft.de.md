---
outdated: false
showInBlog: true
title: "Von der Supply Chain, lokal gebauten Artefakten und wie Maven damit umgeht"
slug: von-der-supply-chain-lokal-gebauten-artefakten-und-wie-maven-damit-umgeht
date: 2026-08-12
author: sebastian
excerpt: "Lokal gebaute Artefakte können ein Problem für Reproducible Builds sein und damit ein Risiko für die Supply Chain. Ich zeige hier, wie das Auflösen von Artefakten in Maven passiert und wie man sehen kann, ob ein selbstgebautes Artefakt fäschlicher Weise verwerndet wurde."
categories: [Open Elements, Open-Source, Security, Java]
preview_image: "/posts/preview-images/oss-world.svg"
---


# Woher kommt dieses Artefakt eigentlich? Vom Maven Repository und der Datei `_remote.repositories`

Reproducible Builds beruhen auf einer einfachen Zusage: derselbe Quellcode, dieselbe Build-Umgebung, dasselbe Ergebnis, 
Byte für Byte. Wer diese Zusage überprüfen will, braucht eine verlässliche Referenz, und genau an dieser Stelle wird es 
interessant, denn die Referenz liegt bei Maven im lokalen Repository, also in einem Verzeichnis, dem man auf den 
ersten Blick nicht ansehen kann, woher sein Inhalt stammt. Technisch haben wir das Thema Reproducible Builds bereits 
in einem anderen [Blogpost](https://open-elements.com/posts/2025/09/12/reproducible-builds) im Kontext von Apache Maven 
und den Auswirkungen auf die Supply Chain beleuchtet.

Hier wollen wir die Frage beantworten, wie Maven Artefakte auflöst und verwaltet, was in der 
unscheinbaren Datei `_remote.repositories` steht, und wie sich daraus eine konkrete Verbesserung für 
das Apache Maven Artifact Plugin und am Ende sogar die Supply Chain integrieren lässt.

## Warum die Herkunft ein Supply-Chain-Thema ist

Das [Maven Artifact Plugin](https://maven.apache.org/plugins/maven-artifact-plugin/) ist das Werkzeug, mit dem im 
Maven-Ökosystem Reproducible Builds nachgewiesen werden. Das Goal `artifact:buildinfo` erzeugt eine Beschreibung des 
Build-Ergebnisses inklusive Checksummen, und `artifact:compare` vergleicht das Ergebnis des aktuellen Builds mit einer 
Referenz. Wenn beide übereinstimmen, ist gezeigt, dass die veröffentlichten Artefakte tatsächlich aus dem angegebenen 
Quellcode entstanden sein können.

Ein Vergleich ist allerdings nur so gut wie sein Vergleichsmaßstab. Wenn eine der beteiligten Abhängigkeiten nicht aus 
einem öffentlichen Repository stammt, sondern lokal via `mvn install` vor drei Wochen auf demselben Rechner 
gebaut worden sind, dann vergleicht man am Ende ein lokales Ergebnis mit einem anderen lokalen Ergebnis. Das Resultat 
sieht sauber aus, es sagt aber nichts über die veröffentlichten Artefakte aus. Aus Supply-Chain-Perspektive ist ein 
lokal installiertes Artefakt ein Input in den Build, der von niemandem geprüft wurde, weder durch eine Signatur noch 
durch eine Checksumme gegen ein Remote-Repository. Wie sich in der Vergangenheit gezeigt hat, könnte hier bereits 
eine böswillige Manipulation stattgefunden haben, mehr dazu auf [hier](https://reproducible-builds.org/docs/why/) 
von (reproducible-builds.org)[https://reproducible-builds.org] 

Genau diese Lücke wurde in [MARTIFACT-58](https://github.com/apache/maven-artifact-plugin/issues/146) beschrieben. 
Die Beobachtung: `artifact:compare` vergleicht die Ausgabe des aktuellen Builds mit Inhalten aus dem lokalen Repository, 
und was sich dabei nicht leicht erkennen lässt, ist, ob dieser Inhalt aus einem früheren lokalen `mvn install` stammt 
oder aus einem Remote-Repository heruntergeladen wurde. Der Vorschlag war, dass das Plugin diese Information selbst 
ermitteln und anzeigen könnte.

## Das lokale Repository als gemischte Ablage

Für die Umsetzung ist ein Blick und das Verstehen der Funktionsweise des lokalen Maven-Repositories notwendig.
Die [Maven-Dokumentation](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) beschreibt 
dies als gemischte Ablage, die zwei Aufgaben gleichzeitig erfüllt: Sie ist Cache für Artefakte, 
die von einem Remote-Repository geladen wurden, und sie ist Ablage für Artefakte, die lokal gebaut und installiert 
wurden. Beide landen im selben Layout, also unter demselben Pfad aus GroupId, ArtifactId und Version. Aus dem Pfad 
allein lässt sich die Herkunft folglich nicht ablesen.

## Wie Maven das lokale Repository verwaltet

Unterhalb von Maven arbeitet der Maven Artifact Resolver, das frühere Aether. Es kapselt alles, was mit Repositories 
zu tun hat, also das Auflösen von Koordinaten, das Herunterladen, das Zwischenspeichern und das Installieren. 
Für das lokale Repository ist dabei eine eigene Verwaltungsschicht zuständig, und die zur Laufzeit verwendete Variante 
tut mehr, als Dateien an der richtigen Stelle abzulegen. Sie führt Buch darüber, aus welchem Repository ein 
zwischengespeichertes Artefakt ursprünglich stammt.

Diese Buchführung hat einen ganz praktischen Zweck. Wenn ein Artefakt aus einem Repository R1 geladen wurde und ein 
späterer Build dasselbe Artefakt benötigt, R1 aber nicht kennt, dann gilt das lokal vorhandene Artefakt als nicht 
vorhanden und wird erneut geladen. Die Begründung ist ein Vertrauensargument: Zwei Artefakte mit identischen 
Koordinaten aus zwei verschiedenen Repositories müssen nicht dasselbe sein. Dieselbe Mechanik erklärt übrigens die 
gelegentlich verwirrende Fehlermeldung, dass ein Artefakt nicht auflösbar sei, obwohl es sichtbar im Verzeichnis liegt.

Bleibt die Frage, wo diese Buchführung eigentlich liegt, und die Antwort ist eine einzelne, leicht zu übersehende Datei.

## Die Datei `_remote.repositories`

Die Herkunftsinformation, die Maven beim Herunterladen mitschreibt, landet in der Tracking-Datei `_remote.repositories`. 
Maven legt sie in jedem Verzeichnis des lokalen Repositorys an, in dem Artefakte verwaltet werden.

Der Inhalt ist eine Java-Properties-Datei. Die Schlüssel bestehen aus dem Dateinamen, einem `>` als Trenner und der Id 
des Repositorys, aus dem die Datei bezogen wurde. Der Wert bleibt leer. Ein Verzeichnis kann damit etwa so aussehen:

```
#NOTE: This is a Maven Resolver internal implementation file, its format can be changed without prior notice.
artifact-1.0.pom>central=
artifact-1.0.jar>central=
artifact-1.0.pom>my_repo_id=
```

Der entscheidende Sonderfall ist die leere Repository-Id. Ein Eintrag der Form `artifact-1.0.jar>=` bedeutet, dass diese 
Datei nicht heruntergeladen, sondern lokal installiert wurde. Fehlt zu einer vorhandenen Datei jeglicher Eintrag, 
dann gilt sie intern ebenfalls als lokal installiert.

Diese Datei ist damit essentiell für die Basis für die Lösung von MARTIFACT-58. 
Über die API lässt sich herausbekommen, aus welchem Repository ein Artefakt kam, und im Fall einer lokalen Installation 
ist das eben das lokale Repository selbst.

## Die Umsetzung im Maven Artifact Plugin

Genau diese Möglichkeit nutzt der Pull Request [#227](https://github.com/apache/maven-artifact-plugin/pull/227) für das 
Apache Maven Artifact Plugin. Die Änderung sitzt dort, wo das Plugin die Referenz für den Vergleich ermittelt, 
und sie bekommt vom Vergleichsziel die aktuelle Repository-Konfiguration des Builds mitgegeben.

Zusätzlich zum zu prüfenden Artefakt ist es ebenso wichtig, den Abhängigkeitsbaum des jeweiligen Artefakts zu 
durchlaufen, falls noch weitere enthaltene Komponenten oder deren Kind-Abhängigkeiten lokal gebaut wurden.

Sollte das der Fall sein, findet sich anschließend folgende Art von Warnung im Log mit der dringenden Empfehlung,
den Build nachzuprüfen und potentiell lokal gefundene Artefakte zu löschen, um auf die Versionen des
Remote-Repositories zurückzugreifen:

```
The artifact org.slf4j:slf4j-api:1.7.36 is stemming from a local install to your
local Maven repository. Please ensure that this is intended. If not, consider
removing this artifact and rebuilding and that your locally installed artifact
from /home/user/.m2/repository/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar
matches public reference from remote.
```

## Was sich daraus für die Praxis ergibt

Durch diese Änderung im Artifact-Plugin ist es nun deutlich komfortabler geworden, Komponenten zu releasen, 
ohne versehentlich lokal gebaute Abhängigkeiten mit zu verbauen. Gerade solche eher unscheinbare Unterschiede auf 
Byte-Ebene können sehr aufwendig aufzuspüren sein, sind aber nicht weniger wichtig für vollständige Reproduzierbarkeit.
Somit kann eine mögliche Fehlerquelle gerade in komplexen Komponenten vermieden werden und am Ende Zeit 
bei Fehlersuche und zusätzlicher, nachträglicher Arbeit gespart werden. Damit leistet diese scheinbar kleine
Information im Log einen weiteren Beitrag zur Supply Chain Security.

---

*Die Arbeit an Apache Maven im Rahmen von Support & Care wird durch die Sovereign Tech Agency gefördert.*

*Dieser Artikel ist mithilfe von AI entstanden*