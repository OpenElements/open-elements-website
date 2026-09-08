---
outdated: false
showInBlog: true
title: "Am 11. September beginnt die 24-Stunden-Frist — auch für Code, den Sie nicht geschrieben haben"
slug: cra-clock-is-ticking
date: 2026-09-06
author: hendrik
excerpt: "Ab 11.09.2026 gilt die CRA-Meldepflicht: 24 Stunden für aktiv ausgenutzte Schwachstellen — auch in Open-Source-Bausteinen tief in Ihrer Software. Was das praktisch bedeutet."
categories: [CRA]
preview_image: "/posts/preview-images/agent-yellow.svg"
---
Am 11.September 2026 nimmt die Single Reporting Platform der ENISA den Betrieb auf.
Ab diesem Tag müssen Hersteller von Produkten mit digitalen Elementen eine aktiv ausgenutzte Schwachstelle innerhalb von
24 Stunden als Frühwarnung melden _(Quelle: [BSI](https://www.bsi.bund.de/DE/Service-Navi/Presse/Alle-Meldungen-News/Meldungen/2026/Treffen_CRA_Markt%C3%BCberwachungsbeh%C3%B6rden_260625.html))_.

Es ist die erste Pflicht aus dem Cyber Resilience Act, die nicht irgendwann 2027 greift, sondern jetzt.
Die Frist selbst ist inzwischen von vielen Seiten erklärt worden.
Was in diesen Erklärungen meist fehlt, ist der Teil, der in der Praxis am schwersten wiegt:
Der überwiegende Teil des Codes in einem typischen Software-Produkt stammt nicht vom Hersteller.

## Was am 11. September tatsächlich beginnt

Drei Fristen, gestaffelt: eine Frühwarnung binnen **24 Stunden** nach Kenntnis,
eine vollständige Meldung binnen **72 Stunden**, ein Abschlussbericht binnen **14 Tagen** _(Quelle: [Article 14, CRA](https://www.cyberresilienceact.eu/regulation.html))_.
Meldepflichtig sind aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfälle.Adressat ist der Hersteller.
Genauso wichtig ist, was **nicht** beginnt: CE-Kennzeichnung, Konformitätsbewertung und technische Dokumentation gehören
zur vollen Anwendbarkeit des CRA am* *11.12.2027** _(Quelle: [Article 71, CRA](https://www.cyberresilienceact.eu/regulation.html))_.
Wer heute versucht, beides gleichzeitig zu erledigen, arbeitet an der falschen Frist.

## Die Bausteine, die Sie nicht gebaut haben

Ein durchschnittliches Java-Projekt zieht mit den ersten Abhängigkeiten dutzende weitere transitive Abhängigkeiten hinein,
bevor eine Zeile Geschäftslogik geschrieben ist:
In der SBOM eines üblichen Projekts auf Basis des Spring-Frameworks finden sich in Summe über 150 Abhängigkeiten _(Quelle: angehängte SBOM)_.

Diese Bausteine — Laufzeitumgebung, Build-Werkzeug, Logging, Testframework, Standardbibliotheken — sind die Schicht, auf der alles andere steht.
Sie sind auch die Schicht, in der Log4Shell saß _(Quelle: [BSI](https://www.allianz-fuer-cybersicherheit.de/Webs/ACS/DE/Informationen-und-Empfehlungen/Cyber-Sicherheitslage-fuer-die-Wirtschaft/gravierende-Cyber-Risiken/log4j/log4j_node.html))_.

Ein Einwand kommt an dieser Stelle regelmäßig: "Wir haben doch Support für unser Framework."
Das stimmt, und es hilft — aber es hilft eine Schicht zu hoch.
Ein Vertrag über [Spring Boot](https://enterprise.spring.io/), [Quarkus](https://quarkus.io/support/) oder [Jakarta EE](https://jakarta.ee)
deckt die mittlere Schicht ab.
Er sagt nichts darüber, wer die Laufzeitumgebung härtet, wer das Build-Werkzeug pflegt, wer die Logging-Bibliothek patcht
und wer entscheidet, ob eine Standardbibliothek weiterentwickelt wird.
Das sind vier verschiedene Projekte mit vier verschiedenen Gemeinschaften, und in mehreren davon hängt die Arbeit an einer sehr kleinen Zahl von Menschen _(Quellen: [Quarkus](https://github.com/quarkusio/quarkus/blob/main/MAINTAINERS.adoc); [Spring Boot](https://github.com/spring-projects/spring-boot/graphs/contributors?from=1.1.2020&to=9.6.2026), bezogen auf regelmäßige Contributions; [log4j](https://logging.apache.org/team-list.html))_.

{{< centered-image src="/posts/2026-09-6-cra-uhr-tickt/alone.png" width="100%" showCaption=false alt="Alleine mit dem Problem">}}


Der CRA kennt keinen Passus, der diese Schicht ausnimmt.
Wenn eine Schwachstelle in einer eingebundenen Bibliothek aktiv ausgenutzt wird und Ihr Produkt betroffen ist, ist die Meldepflicht Ihre.
Nicht die des Projekts, in dessen Repository der Fehler steht.

## Warum „das melden wir dann eben" schwerer ist, als es klingt

Die 24 Stunden laufen ab Kenntnis. Bis zur Meldung liegen aber vier Schritten:

- **Erkennen**, dass es eine Schwachstelle gibt.
- **Zuordnen**, ob sie in Ihrem Produkt steckt und nicht in irgendeiner Version, sondern in der ausgelieferten.
- **Bewerten**, ob der betroffene Codepfad in Ihrem Kontext überhaupt erreichbar ist.
- Und erst dann **melden**.

{{< centered-image src="/posts/2026-09-6-cra-uhr-tickt/steps.png" width="100%" showCaption=false alt="Die 4 Steps">}}

Eine Software-Stückliste hilft beim zweiten Schritt.
Sie hilft nicht beim dritten, und sie beantwortet die Frage nicht, die dahinter steht:
Wer entscheidet das um zwei Uhr nachts, und wen ruft diese Person an, wenn sie sich nicht sicher ist?
Eine SBOM sagt Ihnen, was drin ist.
Sie sagt Ihnen nicht, wer zuständig ist.

Hinzu kommt eine Unterscheidung, die in der Praxis mehr Aufwand macht, als sie klingt:
Die Meldepflicht hängt an der **aktiven Ausnutzung**, nicht an der Veröffentlichung einer Schwachstelle.
Eine neue CVE in einer Ihrer Bibliotheken löst die 24 Stunden also nicht automatisch aus.
Ein Hinweis darauf, dass sie in freier Wildbahn ausgenutzt wird, tut es.
Wer diese beiden Zustände in seiner Überwachung nicht auseinanderhalten kann, hat künftig zwei Probleme statt einem:
er meldet zu viel oder zu spät _(Quelle: [Article 14, CRA](https://www.cyberresilienceact.eu/regulation.html))_.

## Was die Kommission im Juli klargestellt hat

Am 27.Juli 2026 hat die Europäische Kommission Leitlinien veröffentlicht, die erstmals praktisch auslegen, wann
Open-Source-Software unter den CRA fällt und wann die leichtere Regelung für den **Open Source Steward** greift.
Die Leitlinien sind nicht bindend, aber sie prägen die Auslegung.

Zwei Punkte daraus sind für Sie relevant:

- Erstens: Der Steward hat einen **reduzierten** Pflichtenkatalog: keine CE-Kennzeichnung, keine Konformitätsbewertung,
  aber eine Cybersicherheitsstrategie, Zusammenarbeit mit den Behörden und eine eigene Meldepflicht _(Quelle: [Article 24, CRA)](https://www.cyberresilienceact.eu/regulation.html)_.
- Zweitens: Bezahlte Beratung, Schulung und Support machen ein Open-Source-Projekt nach dieser Auslegung **nicht** zu 
  einer kommerziellen Tätigkeit, solange die Software frei verfügbar bleibt _(Quelle: [European Commission, C(2026) 5252 - Annex, 3.2.3 (55)](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation))_.

Praktisch heißt das: Es gibt jetzt eine benennbare Rolle für den, der Ihre Bausteine pflegt.
Sie selbst können sie nicht ausfüllen — Sie sind Hersteller, nicht Steward.
Aber Sie können prüfen, ob es für die Komponenten, auf denen Ihr Produkt läuft, jemanden gibt, der sie ausfüllt.

Wir schreiben in der [Open Regulatory Compliance Working Group](https://orcwg.org) an diesen Praxisregeln mit;
unser Kollege Sebastian Tiemann [arbeitet](https://github.com/orcwg/cra-attestations) in der Arbeitsgruppe zur CRA-Attestierung.
Was wir dort sehen, ist auch:
Längst nicht alle Auslegungsfragen sind beantwortet.
Wer Ihnen heute vollständige CRA-Sicherheit verkauft, verkauft eine Zahl, die es noch nicht gibt.

## Was sich in den nächsten zwei Wochen realistisch tun lässt

1. **Klären Sie, ob Sie Hersteller sind.** Wenn Ihr Produkt digitale Elemente enthält und auf den EU-Markt kommt, lautet die Antwort in aller Regel ja — unabhängig davon, wie viel Software Sie selbst geschrieben haben.
2. **Legen Sie den Meldeweg fest und benennen Sie eine Person — mit Vertretung.** 24 Stunden kennen kein Wochenende.
3. **Schreiben Sie für die fünf bis zehn kritischsten Open-Source-Bausteine auf, wer sie pflegt und wie Sie diese Person erreichen.** Nicht welche Version — welcher Mensch.
4. **Prüfen Sie, ob Ihre Überwachung „aktiv ausgenutzt" von „bekannt" unterscheiden kann.** Die Meldepflicht hängt an der Ausnutzung, nicht an der Veröffentlichung.
5. **Fangen Sie jetzt nicht mit der technischen Dokumentation für 2027 an.** Die hat ihren eigenen Termin.

{{< centered-image src="/posts/2026-09-6-cra-uhr-tickt/team.svg" width="100%" showCaption=false alt="Team and open source">}}

##### Was am 11. September nicht passiert

Am Stichtag beginnt eine Pflicht, keine Prüfungswelle.
Die Meldeplattform [ENISA](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp) selbst geht an diesem Tag erst in Betrieb.

Der Termin ist also keine Klippe.
Die eigentliche Arbeit ist auch nicht die Meldung — es ist die Frage, wer für die Schicht unter Ihrem Code zuständig ist.
Diese Frage hat keine Frist.
Sie hat einen Zustand, und der ist bei den meisten Herstellern heute unbeantwortet.

## Ein konkreter nächster Schritt

Nehmen Sie Ihre Abhängigkeitsliste — die aus dem Build, nicht die aus der Präsentation.
Setzen Sie eine Spalte daneben mit der Überschrift „Wen rufe ich an?".
Füllen Sie sie für die zehn wichtigsten Einträge aus, mit Namen, nicht mit Projektnamen.

Wenn dort mehr als drei Zeilen leer bleiben, haben Sie das Ergebnis, mit dem Sie in Ihre nächste Produktsicherheitsrunde gehen sollten.
Und wenn Sie wissen wollen, wie Sie die Spalten für Laufzeit, Build, Test, Logging und Standardbibliotheken ausfüllen können:
Das ist genau das, was wir mit [Support&Care](https://open-elements.com/de/support-care) machen.