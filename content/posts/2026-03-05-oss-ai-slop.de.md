---
outdated: false
showInBlog: true
title: "Wenn „Contribution“ zur Belastung wird"
date: 2026-03-05
author: hendrik
excerpt: "TODO"
categories: [open-source]
preview_image: "/posts/preview-images/open-source-green.svg"
---

Open-Source-Software ist die Grundlage moderner Software-Ökosysteme.
Freiwillige und aktive Kontributionen tragen dazu bei, Bibliotheken, Frameworks und Infrastrukturcode zu entwickeln, zu verbessern und langfristig zu pflegen.
Doch diese Offenheit bringt in Zeiten generativer KI neue Herausforderungen mit sich.

Viele Projekte berichten aktuell, dass die Zahl von maschinell erstellten und wenig durchdachten Beiträgen (meist in Form von Pull-Requests) so stark gestiegen ist, dass Maintainer an ihre Grenzen kommen und traditionelle Review-Prozesse zunehmend ungeeignet sind.
Beispielsweise berichten Teams wie die Maintainer des Godot-Projekts, dass sie täglich Dutzende solcher Beiträge erhalten, die zwar automatisch erzeugt wurden, aber meist nicht ausreichend geprüft oder sinnvoll sind.
Die Maintainer beschreiben den Review-Aufwand als „demoralizing“ und warnen, dass diese Last langfristig die Sicherstellung von Qualität und Sicherheit belastet (Quelle: https://www.pcgamer.com/software/platforms/open-source-game-engine-godot-is-drowning-in-ai-slop-code-contributions-i-dont-know-how-long-we-can-keep-it-up/).
Diese Entwicklung ist kein theoretisches Problem: Viele Projekte stellen sich aktuell die Frage, wie sie mit einer steigenden Zahl von low-value, AI-gestützten Beiträgen umgehen sollen, ohne dabei legitime menschliche Contributions zu behindern.

## Fallstudie: Ein ungewöhnlicher Beitragstrend im Kontext größerer Projekte

Ein konkretes Beispiel für ungewöhnliche Contribution-Muster zeigt ein GitHub-Account, der nach etwa sieben Jahren ohne nennenswerte Aktivität in kurzer Zeit tausende Commits erzeugte – darunter Aktivitäten an Wochenenden und in hoher Zahl, die teilweise automatisch generiert zu sein scheinen.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/github-timeline.png" width="100%" showCaption=true alt="Contribution Timeline des Accounts auf GitHub">}}

Bei oberflächlicher Betrachtung könnte ein unbedarfter Beobachter bei dieser Menge an Beiträgen denken:
„Das ist ein sehr aktiver Entwickler.“
Doch bei näherer Betrachtung zeigt sich, dass viele dieser “Contributions” inhaltslos sind und selten echten Mehrwert liefern, wie man am Beispiel des automatischen und zyklischen Überschreibens von Temperaturdaten in einem persönlichen Repository sehen kann (https://github.com/ambicuity/Weather)
Vom selben Account werden immer wieder Beiträge in mehreren bekannten Open-Source-Projekten eingereicht. Hier ein paar Beispiele der letzten Vergangenheit:

- In einem SDK des Hiero Projektes wurde ein Issue erstellt, in dem der Account beschreibt, dass er ein “white-box security and architectural review“ des Projektes durchgeführt hat und verschiedene Sicherheitslücken entdeckt hat: https://github.com/hiero-ledger/hiero-sdk-python/issues/1859
- Ein Beitrag im zentralen Kubernetes-Repository in dem es um “dynamic gpu sharing“ geht: https://github.com/kubernetes/kubernetes/pull/137156
- In dem aktuell in Social Media und AI Kreisen gehypten, aber aus Sicherheitsaspekten extrem kritisch und problematisch angesehen AI Projekt OpenClaw wurden versucht Code beizutragen: https://github.com/openclaw/openclaw/pull/22785

Diese Beispiele dienen hier nicht dazu, eine Person an den Pranger zu stellen, sondern zu zeigen, wie sich ungewöhnliche Contribution-Patterns manifestieren können, auch dort, wo Review-Qualität und Sicherheitsprozesse besonders wichtig sind.
In den genannten Projekten wurden diese Beiträge nicht akzeptiert.
Dies zeigt, dass die Maintainer der Projekte ihre Review- und Governance-Standards aktiv wahren:

- Einige PRs wurden geschlossen, weil sie zu viele nicht zusammenhängende Änderungen enthielten.
- Andere wurden zurückgewiesen, weil solch große strukturelle Änderungen erst über formelle Prozesse vorgeschlagen werden müssen.
- In Teilen der Linux Foundation wurde der Account vorübergehen blockiert.

## Warum dieser AI-Slop relevant ist

In modernen Open-Source-Entwicklungsprozessen muss ein soziales Vertragsverhältnis zwischen Maintainer:innen und Contributor:innen bestehen.
Beiträge werden in guter Absicht eingebracht, und erfahrene Maintainer helfen bei Review, Mentorship und Integration.
Doch eine große Zahl automatisch generierter oder kontextloser Beiträge kann dazu führen, dass die Balance und damit Vertragsverhältnis nachhaltig gestört wird.
Hierdurch entsteht eine Fülle an Problemen:
- **Hoher Review-Aufwand für Maintainer** – oft ohne proportionalen Nutzen.
  Dies führt dazu, dass vor allem Maintainer die OSS in ihrer Freizeit betreuen sich aus den Projekten zurückziehen, da die Aufgaben entweder keinen Spaß mehr machen oder emotional zu belastend werden.
- **Risiko von Qualitäts- und Sicherheitsproblemen**, da Maintainer erschöpft sind und Fehler leichter übersehen werden können.
  Vorfälle wir Log4Shell zeigen, wie schnell ein Bug in einer zentralen OSS Library starke Auswirkungen für die gesamte Welt haben kann.
  Grade diese zentralen und sicherheitskritischen Projekte werden aber auch as Ziel von sinnlos generierten AI Beiträgen, da die Personen hinter den AI Agents sich fälschlicherweise Prestige durch mögliche angenommene Beiträge in diesen Projekten erhoffen.
  Dazu kommt, dass Angriffe auf OSS Bibliotheken, wie im Fall von XZ, immer einfacher durchzuführen sind.
- **Verzerrung der OSS-Indikatoren**, weil quantitative Metriken alleine nicht mehr aussagekräftig über tatsächliche Kompetenz oder Wert sind.
  Durch immer mehr automatisch erstellte Beiträge an willkürlichen eigenen Projekten, wird das Bild von Accounts bei GitHub verzerrt.
  Konnte man in der Vergangenheit durch einen Blick auf den GitHub Accounts eines potentiellen Contributors wichtige Informationen finde, so zerstört die Masse an sinnlosen Contributions jegliche Erkenntnis.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/alone.svg" width="80%" alt="Einzelne Personen müssen die neue Last allein tragen">}}

Solche Entwicklungen werden in der Community bereits als strukturelle Risiken diskutiert.
Hierbei geht es nicht um einzelne Projekte, sondern um eine Gefahr für das gesamte OSS-Ökosystem.
In der Community hat sich für diese große Anzahl von wenig hilfreichen oder automatisierten Beiträgen mittlerweile der Begriff AI-Slop etabliert.

## Wie OSS mit der Flut von Beiträgen umgehen kann

Im Bereich OSS Governance gibt es Bewegungen.
Viele Maintainer diskutieren aktuell, wie die CONTRIBUTING-Guidelines oder PR-Richtlinien ihrer Projekte angepasst werden können um dem Problem entgegenzuwirken.
Die OSS Community muss hier Best Practices teilen, damit Projekte gemeinsam lernen, wie sie mit einem steigenden Volumen an Contributions umgehen.

Generell muss die Balance zwischen Mensch, Maschine und Automatismen neu betrachtet und wieder in Einklang gebracht werden.
AI sollte nicht nur automatisch Beiträge erzeugen, sondern immer im Kontext menschlicher Nachvollziehbarkeit und Verantwortung genutzt werden.
Richtig eingesetzt können und Tools wie GitHub Co-Pilot oder Claude Code wichtige Mehrwerte im Bereich OSS liefern.
Sie können Contributions verbessern und Reviews deutlich vereinfachen. Dafür muss allerdings auch ein Mind-Shift der Personen passieren, die aktuell durch Agenten die Community mit AI-Slop befeuern.
Auch wenn Mentoring hier sicherlich ein gutes Mittel der Wahl wäre, darf es nicht wieder den Maintainer:innen der Projekte als Bürde auferlegt werden.
AI Tools sind immernoch Tools die von einem Menschen bedient werden.

Auch die Platform GitHub hat das Problem erkannt und begonnen, spezifische Werkzeuge bereitzustellen, um Maintainer:innen gezielt zu unterstützen.
Zu diesen Funktionen gehören unter anderem:
- **Pull Requests auf Repository-Ebene einschränken oder deaktivieren:** Maintainer:innen können PRs komplett ausschalten oder nur bestimmten Contributor-Gruppen (z. B. internen Mitwirkenden) erlauben, so dass ungewollte Beiträge nicht öffnen.
  (https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/disabling-pull-requests)
- **Temporäre Interaktionslimits:** Auf Repository- oder User-Ebene können Interaktionsgrenzen gesetzt werden, wenn Beiträge auffällig werden.

Neben diesen Sofortmaßnahmen wird auch intern und gemeinsam mit Maintainer:innen über weitergehende Mechanismen diskutiert.
Beispielsweise gibt es den Vorschlag nur PRs zuzulassen, die an bestehende Issues gebunden sind.
Eine aktive Diskussion bzgl. Features in GitHub um dem Problem auf Tool-Ebene Herr zu werden kann man hier finden: https://github.com/orgs/community/discussions/185387

Eine weitergehende Auswertung bzgl. des Umgangs und der Gefahr von AI-Slop in verschiedenen OSS Foundations und Projekten kann man bei RedMonk finden: https://redmonk.com/kholterhoff/2026/02/26/generative-ai-policy-landscape-in-open-source/

## Unser Ziel: AI-Slop erkennen und die Qualität bewahren

Maintainer-Teams sind keine Maschinen – sie investieren Zeit, mentale Energie und Leidenschaft, oft in ihrer Freizeit, um Projekte lebendig zu halten.
Das sollte nicht durch eine unstrukturierte Masse an halbautomatischen Beiträgen erschwert werden, sondern durch Tools, Policies und Workflows unterstützt werden, die Qualität und Effizienz fördern.

Die Entwicklung neuer Werkzeuge und Diskussionen um einen besseren Umgang mit Beiträgen ist ein Signal dafür, dass die Plattform und viele Maintainer:innen sich dieser Herausforderung nicht nur bewusst sind, sondern aktiv nach Lösungen suchen.
Gerade bei Projekten mit hoher Sichtbarkeit oder großer Community ist es wichtig, dass nicht nur individuelle Review-Arbeit geleistet wird, sondern dass auch strukturelle Hilfsmittel etabliert werden, um die Review-Last zu verringern und unerwünschte Beiträge schneller zu identifizieren oder auszuschließen.

Neben diesen Problemen soll in Zukunft sowohl Automatisierung als auch AI als leistungsstarke Tools mehr und mehr Einzug in die Open Source Community haben.
Generative KI-Tools haben das Potenzial, Entwickler:innen zu unterstützen, Routineaufgaben zu automatisieren und Contributor zu befähigen, größere Probleme zu adressieren, ohne dass sie jedes Detail von Hand schreiben müssen.
Gleichzeitig zeigt die Diskussion um AI-Slop, dass wir bewusst darauf achten müssen, Qualität über Quantität zu stellen, Review-Workflows zu stärken und Maintainer:innen echte Werkzeuge zur Entlastung zu geben.

Durch alle diese verschiedenen Bemühungen bleibt Open Source auch in Zukunft offen, nachhaltig und menschlich.

{{< centered-image src="/posts/2026-03-05-oss-ai-slop/oss-tree.svg" width="80%" alt="Personen arbeiten zusammen am Projekt">}}
