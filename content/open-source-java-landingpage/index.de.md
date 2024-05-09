---
title: "Open Source Java"
description: "TODO"
layout: "single"
url: "/de/open-source-java"
---

Die Java-Plattform ist eins der meistgenutzten digitalen Tools weltweit und besonders die Verwendung von Java als
Programmiersprache für Web-Services, Web-Anwendungen und Enterprise Services bzw. Anwendungen ist aus der
digitalisierten Welt nicht mehr wegzudenken. Was die Programmiersprache so besonders macht, ist, dass sowohl die
Plattform auf der Java läuft als auch die Programmiersprache als offene Quellen verfügbar sind. Auch die daraus
resultierenden Java-Distributionen sind zu einem großen Teil kostenfrei verfügbar. Das bedeutet, dass in vielen
Bereichen **Open Source Java**-Entwicklern auf der ganzen Welt zur Verfügung stehen, ohne dass dafür gezahlt werden
muss.

## Was ist Java?

Unter Java verstehen die meisten ausschließlich die Programmiersprache, welche eine der weitverbreitetsten
Programmiersprachen der Welt ist. Sie war in den letzten 20 Jahren quasi durchgängig in der **Top 3 der populärsten
Programmiersprachen** im anerkannten [Toibe Index](https://www.tiobe.com/tiobe-index/). Neben der Programmiersprache
bezieht sich der Begriff Java aber auch auf die Laufzeitumgebung, in der Java Programme ausgeführt werden können: der
Java Virtual Machine (JVM).

[@formatter:off]: # (This actually is the most platform independent comment)
{{< centered-image src="toibe-de.png" width="100%" alt="Prozentueller Anteil von Java im Toibe Index über die letzten 20 Jahre">}}

[@formatter:on]: # (This actually is the most platform independent comment)

Diese besondere Kombination aus Programmiersprache und Laufzeitumgebung ermöglicht es, dass Java Anwendungen auf jeder
Maschine, auf der eine JVM installiert ist, ausgeführt werden. Hierdurch entstand auch einer der Leitsprüche von
Java: **"Write Once, Run Anywhere"** (WORA). Sowohl die Bestandteile der Programmiersprache als auch der Quelltext der
JVM von Java sind im OpenJDK zu finden, welches die Open Source Quellen von Java beinhaltet.

[@formatter:off]: # (This actually is the most platform independent comment)
{{< centered-image src="wora-de.png" width="80%" alt="Die Schichten einer Java Anwendung">}}

[@formatter:on]: # (This actually is the most platform independent comment)

## Was bedeutet Open Source?

Open Source lässt sich heute in den meisten Bereichen unseres digitalen Alltags wiederfinden und wird dabei häufig
einfach als gegeben angenommen. Das fängt bereits bei unseren Smartphones an: Sowohl iOS (_Apple_) als auch Android 
(_Google, Samsung, etc._) basieren auf einer ganzen Fülle von Open Source Komponenten. Ein großer Teil der genutzten
Sicherheits- und Verschlüsselungsalgorithmen steht zum Beispiel Quelloffen zur Verfügung. Das gleiche gilt für den
Safari bzw. Chrome Browser. Beide basieren zum größten Teil auf Open Source Software (OSS). Aber nicht nur im Privaten
begegnen uns Open-Source-Anwendungen immer mehr – auch die deutliche Mehrheit aller deutschen Unternehmen setzt
Open-Source-Software ein.

[@formatter:off]: # (This actually is the most platform independent comment)
{{< centered-image src="os-logo.png" width="50%" alt="Das Logo der Open Source Initiative und das offizielle Open Source Logo">}}

[@formatter:on]: # (This actually is the most platform independent comment)


**Open Source ist ein starker Treiber von Innovation.** Schließlich fallen weder Lizenzkosten an, noch muss man sich bei
der Verwendung sorgen, dass Nutzungsrechte in Zukunft durch den Urheber eingeschränkt werden. Open Source bedeutet, dass
der **Quellcode offen einsehbar** ist. Dadurch können sich Entwickler untereinander zu den Open-Source-Projekten
austauschen und diese gemeinsam weiterentwickeln. Open Source bedeutet nicht, dass einfach jeder die Quellen ändern
kann. Jedoch gibt es heute Workflows die es projektexternen Personen erlauben, einen Beitrag zu einem Open Source
Projekt zu leisten. Dies wirkt sich positiv auf die Diversität in OSS aus, da hierdurch jede Person an Open Source
mitarbeiten kann. Die größte Plattform für Open Source Software, auf der auch die Quellen des OpenJDK – also Java – zu
finden sind, ist [GitHub](https://github.com/).

[@formatter:off]: # (This actually is the most platform independent comment)
{{< centered-image src="pull-request-de.png" width="80%" alt="Pull Request Workflow, um als externer Entwickler an OSS mitzuarbeiten">}}

[@formatter:on]: # (This actually is the most platform independent comment)

### Wo wird Open Source grundsätzlich genutzt?

Meist wird unterschätzt, in wie vielen Bereichen wir eigentlich mit Open Source Software (OSS) in Kontakt kommen:

- **Infrastruktur und Services:** Linux, WordPress
- **Anwendungen:** Firefox, Open Office
- **Software- & Web-Entwicklung:** Java, Java Script, Angular
- **Protokolle, Formate und Schnittstellen:** HTTPS, PDF, ZIP, Bluetooth

Dazu kommen Projekte und Produkte, die intern Open Source Komponenten nutzen. So basieren z.B. große Teile des Google
Chrome auf OSS, jeder DVD-Player beinhaltet Open Source Software (in der Regel Java) und das Gleiche gilt für Handys,
Fernseher, Autos oder Staubsaugerroboter. Neben diesen Produkten sind auch einige der bekanntesten Online-Services der
Welt auf OSS aufgebaut: YouTube, Netflix, PayPal oder eBay sind alle auf einer Open Source Basis aufgebaut.

### Vorteile von Open Source

Der wohl offensichtlichste Vorteil von Open Source Software ist die kostenfreie Verwendung. Weitere Vorteile die vor
allem von Unternehmen als sehr positiv wahrgenommen werden, sind in folgendem Diagramm zu finden:

[@formatter:off]: # (This actually is the most platform independent comment)
{{< centered-image src="os-benefits-de.png" width="80%" alt="Ergebnis zur Umfrage bzgl. Vorteilen von Open Source bei mittelständischen Unternehmen">}}

[@formatter:on]: # (This actually is the most platform independent comment)

OSS bringt allerdings noch weitaus mehr positive Aspekte mit sich:

[@formatter:off]: # (This actually is the most platform independent comment)

- **Wissensaustausch und Bildung:**
  Dank der offengelegten Codes in Open-Source-Projekten dienen diese auch als wertvolle Bildungsressourcen. Codes können
  erlernt werden, Programmierer können sich darüber austauschen und so andere Projekte vorantreiben. Da die Grundlagen
  der Open Source Software bereits allen vorliegen, kann eine hohe Innovationsgeschwindigkeit für neue Projekte
  realisiert werden.

- **Transparenz:**
  Da die Codes offen zugänglich sind, besteht ein hohes Maß an Transparenz. Eventuelle Mängel oder versteckte Funktionen
  sind sichtbar. Open Source schafft somit Vertrauen durch Transparenz. Dieses Vertrauen wird dadurch gestärkt, dass es
  ein Source-Code-Control-System gibt, wodurch jede Änderung im Quellcode auf Funktionalität geprüft und die
  Code-Sequenzen einer konkreten Person als Autor zugeordnet werden können. Für die **Open Source Java-Laufzeitumgebung** zum Beispiel gibt es das Test- und Qualitätsframework AQAvit.

- **Anbieter-Unabhängigkeit:**
  Open-Source-Projekte wie Java funktionieren unabhängig von Softwareanbietern und ihren Geschäftsmodellen. Dies ist
  wichtig, um eine langfristige Verfügbarkeit sicherstellen zu können. Außerdem müssen Bugs nicht von einem zentralen
  Entwicklerteam eines Softwareanbieters behoben werden, sondern können prinzipiell von der gesamten Entwicklergemeinde
  angegangen werden.

- **Soziale Gerechtigkeit:**
  Open Source schafft, woran viele andere Bildungsangebote scheitern: OSS steht Menschen aus allen sozialen und
  wirtschaftlichen Hintergründen zur Verfügung.

- **Stabilität & Leistungsfähigkeit:**
  Die besonderen Eigenschaften von Open Source Software ermöglichen, dass kontinuierlich daran gearbeitet werden kann.
  Transparente Testverfahren, wie Eclipse AQAvit stellen sicher, dass die Codes hohen Leistungsstandards entsprechen.

- **Leichte Integration:**
  Die Source Codes von OSS lassen sich individuell auf den speziellen Anwendungsfall anpassen. Somit kann die Software
  gut in die bestehende Infrastruktur integriert werden.

  [@formatter:on]: # (This actually is the most platform independent comment)

## Open Source Java – das OpenJDK

Sowohl die Programmiersprache **Java** als auch die Plattform zum Ausführen von Java Anwendungen, die Java Virtual
Machine (JVM), **basieren auf den Quellen des OpenJDK**. Initial wurde Java von der Firma Sun Microsystems erfunden und
entwickelt.

Da Oracle Sun Microsystems aufgekauft hat, ist die Firma aktueller Hauptentwickler im OpenJDK. Da das
**OpenJDK** eine **Open Source Software** ist, tragen neben Oracle immer mehr Firmen und auch individuelle Personen
Quelltext zum OpenJDK bei. Das OpenJDK ist als Projekt bei [GitHub](https://github.com/openjdk) zu finden. Auf dem folgenden Bild ist dargestellt,
welche Firmen Änderungen zu Java 19 beigetragen haben (also Änderungen, die zwischen der Veröffentlichung von Java 18
und 19 hinzugefügt wurden).

Der OpenJDK-Quelltext lässt sich in drei Teile teilen:

- Quelltext zur Programmiersprache
- Quelltext zur Plattform (JVM)
- Quelltext für Tooling (z.B. der Compiler von Java)

Ein Nutzer von Java lädt eine Distribution in Form des JDKs (Java Development Kit) herunter, das alle drei Bestandteile
enthält und genutzt wird, um Java Anwendungen zu programmieren und zu betreiben.

Das **OpenJDK** selbst stellt nur sogenannte **“General-Availability”**-Versionen von Java zum Download bereit. Diese
sind nicht
für die Verwendung im Enterprise Umfeld gedacht. Das OpenJDK definiert allerdings die Versionen des Quelltextes (z.B.
Stand 17.0.1), damit alle Anbieter von Java Distributionen über die gleiche Ausgangsbasis verfügen. Wer Java produktiv
nutzen möchte, sollte daher eine Distribution von einem konkreten Anbieter (Oracle, Microsoft, RedHat) herunterladen.
Die bei weitem **meistgenutzte Distribution ist Eclipse Temurin**, welche von der Eclipse Foundation als
**“herstellerneutrale” Distribution** zur Verfügung gestellt wird.

Bild: verschiedene Distributionen

Viele der verfügbaren Laufzeitumgebungen werden heute durch das **Java Test Compatibility Kit (TCK)** auf ihre
**Kompatibilität zum offiziellen Standard** hin überprüft. Es gibt also auch zahlreiche [Distributionen und Support
Services jenseits von Oracle](https://www.heise.de/blog/Java-ohne-Kopfschmerzen-Distributionen-und-Support-jenseits-von-Oracle-9232113.html),
die ihren Nutzen vollen Funktionsumfang bieten. Eclipse bietet
einen [Marktplatz](https://adoptium.net/en-GB/marketplace/) an, auf welchem Nutzer eine Übersicht über alle durch TCK
und AQAvit verifizierten Java Distributionen zum Download finden.

### Warum gibt es überhaupt unterschiedliche Anbieter?

Für Open-Source-Projekte wie Java gibt es je nach Nutzung verschiedene Support-Angebote und Anfragen. Manche Firmen, wie
Oracle, nehmen zum Beispiel eigene interne Änderungen vor, wenn sie ihre kommerzielle Distribution bauen. Diese
Änderungen werden nie quelloffen zum OpenJDK hinzugefügt.

## Warum sollte ich Geld in Support investieren, wenn Java eine Open Source Software ist?

Open Source Software Anwendungen sind beliebt, gerade weil sie kostenfrei zur Verfügung stehen. Warum sollten
Unternehmen also Geld in einen Support Service investieren?

Damit Ihre Java Anwendungen langfristig leistungsfähig sind, müssen Sie sich nicht nur mit der Anwendung selbst, sondern
auch mit der Laufzeitumgebung auskennen und diese pflegen. Die Funktionsweise, Neuerungen und Besonderheiten der Java
Laufzeitumgebung sowie des Java Toolings und der Sprache ist äußerst komplex und das Wissen muss ständig aktualisiert
werden. Dazu kommt, dass Wissen über mögliche Schwachstellen frühzeitig bekannt und im Unternehmen verbreitet werden
muss. Nur so lassen sich Sicherheitslücken umgehen. In Unternehmen gibt es selten die erforderlichen Ressourcen, um
diese Herausforderung zu meistern. Da Open Source Software wie Java mittlerweile aber häufig zur kritischen
Infrastruktur von Unternehmen gehört, braucht es externen Support.

Open Elements Support & Care unterstützt Unternehmen bei dieser wichtigen Aufgabe. Wir helfen bei der Instandhaltung und
Wartung der Java Laufzeitumgebung. Im Rahmen unseres [Eclipse Temurin Supports](/support-care-landingpage-temurin/)
informieren wir Sie über Updates zu Temurin, bieten Webbinare und Meetings an, sowie einen direkten Support bei Fragen
und Problemen.

