---
outdated: false
showInBlog: true
title: "Good-First-Issues – Brücken für Newcomer, Treibstoff für Projekte"
date: 2026-01-30
author: hendrik
excerpt: "TODO"
categories: [TODO]
preview_image: "/posts/preview-images/security-green.svg"
---

Die meisten Open‑Source‑Projekte leben davon, dass neue Entwicklerinnen und Entwickler den Schritt in eine ihnen fremde
Codebasis wagen.
Damit das gelingt, braucht es Einstiegsaufgaben, die nicht überfordern, aber einen echten Mehrwert bringen.
In der Hiero‑Community haben sich sogenannte Good-First-Issues (GFI) als wirkungsvolles Instrument etabliert.
Dieser Beitrag beleuchtet, was ein Good-First-Issue auszeichnet, welche Vorteile solche Aufgaben sowohl für Projekte als
auch für Newcomer bieten, welche Ergebnisse Hiero bereits erzielt hat und wie Automatisierung und Welcome‑Bots die Hürde
zum Mitmachen weiter senken.

## Was ist ein Good-First-Issue?

Hiero definiert ein Good-First-Issue als eine Aufgabe, die für Neulinge geeignet ist und klar beschrieben, überschaubar,
lehrreich, nicht geschäftskritisch, vollständig dokumentiert und in einem freundlichen Ton formuliert ist.
Typische Beispiele sind Dokumentations‑Updates, kleine Tests, Code‑Style‑Korrekturen, einfache Bugfixes oder kleine
Verbesserungen.
Ziel dieser Aufgaben ist es, Menschen ohne umfassende Projektkenntnisse den Einstieg zu erleichtern und ihnen mithilfe
einer strukturierten Schritt‑für‑Schritt‑Anleitung den Weg zum ersten Pull Request (PR) zu zeigen.

### Warum sind Good-First-Issues für Newcomer wichtig?

- **Klare Einstiegsbarrieren:** Viele Entwicklerinnen und Entwickler scheuen den ersten PR, weil sie den Prozess nicht
  kennen.
  Der Good‑First‑Issue‑Ansatz reduziert diese Unsicherheit durch detaillierte Beschreibungen, Beispielcode und Links
  zur relevanten Dokumentation.
- **Lerneffekt:** Die Aufgaben sind klein, aber lehrreich. Sie vermitteln Einblicke in den Aufbau des Projekts und
  machen mit den Tools und Prozessen (z.B. DCO, signierte Commits, Branch‑Workflows) vertraut.
  Forschende analysierten über 100 Open‑Source‑Projekte und stellten fest, dass Newcomer Good-First-Issues als nützlich
  empfinden und der Onboarding‑Nutzen mit 70,5/100 Punkten bewertet wurde.
- **Willkommens‑Atmosphäre:** Die Issues sind bewusst freundlich formuliert und enthalten meist ein
  „First Timers Only“‑Hinweis.
  Dies signalisiert, dass Fragen erwünscht sind und die Community bereit ist, Hilfe zu leisten.
  In einer Umfrage gaben 53-% der Befragten an, dass sie Issue‑Labels wie „good-first-issue“ aktiv nutzen wollen.

### Vorteile für Projekte und Maintainer
- **Neue Talente und Diversität:** Gute Einstiegsaufgaben helfen, den Kreis der Contributor zu vergrößern.
  Studien zeigen, dass rund 44-% der untersuchten GitHub‑Projekte „good-first-issue“ nutzen, aber nur etwa 1,5-% ihrer
  Issues so labeln – es gibt also viel Potenzial.
  Für Hiero ist der Zuwachs neuer Contributor ein wichtiger Schritt zur Vendor‑Neutralität:
  Bereits ein Jahr nach Gründung waren knapp 800 Beitragende aus über 80 Organisationen aktiv ￼.
- **Qualitätsverbesserung ohne große Risiken:** Dokumentationskorrekturen, Testfälle oder kleine Feature‑Erweiterungen
  verbessern die Codebasis, ohne kritische Komponenten zu gefährden.
  Regelmäßige kleine Verbesserungen haben eine große Wirkung auf die Wartbarkeit.
- **Community‑Bindung:** Wer eine Hürde genommen hat und positive Rückmeldungen erhält, bleibt eher dabei.
  Die Forschung zeigt, dass ein Drittel der Neulinge nach einer Dokumentationsaufgabe weitere Beiträge leisten.
  In Hiero wurde sogar ein Karrierepfad beobachtet:
  Ein Contributor, der 2024 per Hacktoberfest eingestiegen ist, wurde später Committer.
- **Entlastung der Maintainer:** Durch ein strukturiertes GFI‑Programm müssen Maintainer nicht jede Kleinigkeit selbst
  übernehmen.
  Im SDK‑Präsentationsdeck wird geschätzt, dass ein GFI‑Komitee die Arbeitslast der Maintainer um 95-% reduzieren kann,
  indem es Issues vorfiltert, zuweist, Nachwuchs betreut und eine erste Prüfung („soft-approval“) durchführt.

## Good-First-Issues bei Hiero – Erfolgsstorys aus der Praxis

### Hacktoberfest-2024: erste Erfolge

Im Oktober-2024 beteiligten sich die Projekte `hiero‑solo‑action` und `hiero‑enterprise‑java` am virtuellen Event
Hacktoberfest.
Mehrere Good-First-Issues wurden von neuen Contributor gelöst; einige blieben dem Projekt treu, und mindestens eine
Person stieg später zum Committer auf.
Diese frühe Erfahrung zeigte, dass gut kuratierte Einsteigeraufgaben Menschen dauerhaft binden können.

### Hacktoberfest-2025: Python-SDK im Fokus

Bei Hacktoberfest-2025 setzte das Team des neuen Python‑SDKs das GFI‑Konzept konsequent um:
- **Gezielt Issues erstellen:** Es wurden regelmäßig neue Good-First-Issues formuliert und mit dem Label `hacktoberfest`
- versehen.
- **Umfassend dokumentieren:** Jede Aufgabe enthielt eine ausführliche Problembeschreibung, Lösungshinweise und Links
  zu Support‑Artikeln.
  Diese Investition war entscheidend für die Qualität der eingehenden PRs.
- **Sichtbarkeit erhöhen:** Durch die Kombination aus Labeln und proaktiver Kommunikation landeten die Issues regelmäßig
  ganz oben in den Hacktoberfest‑Listen, was die Sichtbarkeit für tausende Entwickler weltweit erhöhte.

Der Erfolg ließ nicht lange auf sich warten: 74 Pull Requests wurden im Oktober gemergt, 39 einzigartige Autorinnen und
Autoren (viele zum ersten Mal) waren beteiligt und die Repository‑Seite verzeichnete etwa 1500 Besucher.
Viele Neulinge engagierten sich sogar in mehreren PRs und übernahmen echten Produktverantwortung.
Der Hacktoberfest‑Blogbeitrag fasst die Atmosphäre treffend zusammen:
Es ging nicht um Zahlen, sondern um Menschen – und um das Gefühl einer globalen Community.

### Python‑SDK als Blaupause für andere SDKs

Die Erfahrung aus 2025 motivierte Hiero, das GFI‑Programm systematisch auszuweiten.
Der „Good-First-Issue-&-Mentorship Strategy“-Plan (Januar-2026) definiert konkrete Ziele:
Pro Quartal sollen mindestens 15 neue Contributor, darunter jeweils 10 für das Java‑ und JavaScript‑SDK und 5 für die
übrigen SDKs, gewonnen werden. Das Programm arbeitet mit einer cross‑Projekt‑Arbeitsgruppe, die:
- nur wenige (3–5) offene GFIs pro Projekt bereithält, damit Maintainer nicht überrollt werden,
- mithilfe eines Templates sicherstellt, dass jede Aufgabe verständlich und einladend ist,
- wöchentliche Treffen abhält, um neue Issues zu prüfen, Kandidaten zu labeln und die Qualität zu sichern,
- Newcomer aktiv unterstützt, indem Mentoren zugewiesen und Fragen schnell beantwortet werden.

Besonders eindrucksvoll war der Oktober-2025 für das Python‑SDK: über 80-Good-First-Issues wurden gelöst und die
Contributor‑Zahl stieg um 38 Personen. Einige dieser Contributors blieben dauerhaft dabei.
Dadurch konnte die Hiero‑Gemeinschaft erstmals messen, wie stark GFIs die Diversität erhöhen – ein entscheidender
Schritt in Richtung Vendor‑Neutralität.

## Automatisierung und Welcome‑Bots: der nächste Schritt

Die Erfahrungen aus Hacktoberfest und dem GFI‑Programm machten deutlich, dass technische Prozesse häufig die größte
Hürde sind.
Hiero setzt daher auf Automatisierung und freundliche Willkommens‑Bots, um den Einstieg weiter zu erleichtern:
- **Automatische Zuweisung und Willkommens‑Nachrichten:** Ein Bot weist neue Contributor den passenden Good-First-Issues zu
  und hinterlässt eine personalisierte Begrüßung sowie hilfreiche Links.
  Dadurch fühlen sich Neulinge sofort eingebunden und wissen, wohin sie sich wenden können.
- **Checklisten und Vorlagen:** Mithilfe von GitHub‑Workflows und GFI‑Templates werden Issue‑Beschreibungen standardisiert,
  notwendige Informationen wie DCO‑Erklärungen und Sign‑off‑Hinweise automatisch ergänzt und alle erforderlichen Labels
  gesetzt.
  Dies reduziert Rückfragen und verhindert, dass Maintainer identische Hinweise immer wieder manuell geben.
- **GFI‑Komitee zur Erst‑Review:** Das Good-First-Issue Committee führt eine erste Prüfung („soft-approval“) durch und
  stellt sicher, dass die Lösung die GFI‑Kriterien erfüllt.
  Laut der Präsentation reduziert dieses Vorgehen die Arbeitslast der Maintainer um bis zu 95-%.
- **Mentorship‑Programme und Community‑Calls:** Der Strategieplan betont, dass soziale Kompetenzen ebenso wichtig sind wie
  technisches Wissen.
  Zoom‑Calls, Discord‑Channels und regelmäßige Community‑Meetings geben Newcomern Raum für Fragen und Feedback.
  In einem Fall führten persönliche Gespräche dazu, dass ein Contributor finanziell über GitHub-Sponsorship unterstützt
  und später offizieller Committer wurde.

### Best-Practices: Was andere Projekte von Hiero lernen können

- **Einladende Kommunikation:** Ein freundlicher Ton und Emojis im Issue‑Template signalisieren Offenheit und senken
  Hemmschwellen.
- **Qualität vor Quantität:** Lieber wenige, gut aufbereitete Good-First-Issues anbieten, statt eine Liste mit unklaren
  Aufgaben zu haben.
- **Mentorship ernst nehmen:** Maintainer sollten Zeit einplanen, um Newcomer zu begleiten; alternativ können
  Community‑Manager diese Aufgabe übernehmen. Hacktoberfest zeigte, dass zusätzliche Unterstützung
  (Discord, Video‑Tutorials) die Qualität der Beiträge erhöht.
- **Automatisieren, wo sinnvoll:** Bots für Willkommens‑Nachrichten, automatische Labelvergabe und Soft‑Reviews
  entlasten Maintainer und sorgen für Konsistenz.
- **Langfristige Perspektive:** Good-First-Issues sind keine „Arbeitsauslagerung“, sondern eine Investition.
  Sie kosten kurzfristig Zeit, zahlen sich aber durch neue Contributor und langfristige Diversität aus.

## Fazit

Good-First-Issues sind mehr als eine nette Geste – sie sind ein strategisches Werkzeug, um Open‑Source‑Projekte
nachhaltig zu stärken.
Für Newcomer sind sie ein freundlicher Einstiegspunkt, der Lernen und Selbstvertrauen fördert.
Für Projekte wie Hiero sind sie ein Multiplikator: Sie bringen neue Talente, verbessern die Codebasis, entlasten
Maintainer und erhöhen die Glaubwürdigkeit als vendor‑neutrale Plattform.
Der Erfolg der Hiero‑Python‑SDK während Hacktoberfest-2025 und die umfassende Good‑First‑Issue‑Strategie zeigen, dass
strukturierte Aufgaben, Mentorship, Automatisierung und Willkommens‑Bots gemeinsam das nächste Level erreichen.
Andere IT‑Projekte können von diesen Erfahrungen profitieren, indem sie klare Leitfäden erstellen, die Community aktiv
einbinden und automatisierte Abläufe nutzen.
Nur so wird aus einem ersten Issue eine echte, langfristige Zusammenarbeit.