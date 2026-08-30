---
outdated: false
showInBlog: true
title: "KI und KI-Agenten – wo genau der Unterschied liegt"
slug: ai-and-agents
date: 2026-08-30
author: hendrik
excerpt: "Ein Sprachmodell schreibt Text. Ein Agent handelt. Dazwischen liegt eine überschaubare Menge Technik – und viele Verständnisprobleme. Wie diese Dinge Zusammenspiel und noch souverän in der EU betrieben werden können, wird in diesem Artikel aufgezeigt."
categories: [Open Elements, AI]
preview_image: "/posts/preview-images/agent-yellow.svg"
---

In Besprechungen, Ausschreibungen und Pressemitteilungen werden „KI“ und „KI-Agent“ derzeit weitgehend synonym verwendet.
Technisch ist das schlicht falsch – und die Verwechslung ist teuer, weil sie zu falschen Architekturentscheidungen,
falschen Sicherheitsannahmen und falschen Kostenprognosen führt.

Der Unterschied lässt sich in einem Satz sagen: **Ein Sprachmodell erzeugt Text. Ein Agent führt Handlungen aus.**
Alles Weitere ist die Frage, welche Bausteine zwischen diesen beiden Polen liegen.
Genau darum geht es in diesem Artikel – und im zweiten Teil darum, wer diese beiden Ebenen heute anbietet und unter welchen Lizenzbedingungen.

## Was ein Large Language Model tatsächlich ist

Ein [Large Language Model (LLM)](https://de.wikipedia.org/wiki/Large_Language_Model), auf Deutsch: großes Sprachmodell, ist ein statistisches Modell über Token-Sequenzen.
Token sind Textfragmente: häufige Wörter meist als Ganzes, seltene Wörter, Zahlen und – im Deutschen besonders oft – Komposita in mehreren Stücken.
Das Modell bekommt eine Sequenz solcher Token und berechnet daraus eine Wahrscheinlichkeitsverteilung über den jeweils nächsten Token.
Aus dieser Verteilung wird ein Token ausgewählt – je nach Einstellung zufällig gezogen oder schlicht das wahrscheinlichste –, an die Sequenz angehängt,
und der Vorgang wiederholt sich. Dieses Verfahren heißt autoregressive Generierung.

Mehr passiert bei einem Aufruf nicht. Ein LLM ist eine reine Funktion von Text nach Text. Das ist keine Verkürzung,
sondern die vollständige Beschreibung der Schnittstelle.

{{< centered-image src="/posts/2026-08-30-ki-und-agenten/llm.png" width="100%" showCaption=true alt="Vereinfachte Darstellung eines LLM">}}

Daraus folgen drei Eigenschaften, die in der Praxis regelmäßig unterschätzt werden.

- **Ein LLM ist zustandslos:** Es gibt kein Gedächtnis zwischen zwei Aufrufen. Was in einem Chat wie Erinnerung aussieht, ist eine Illusion:
  Der komplette bisherige Gesprächsverlauf wird bei jedem Aufruf erneut mitgegeben.
  Das Modell sieht bei der zehnten Nachricht die neun vorherigen als frisch übergebenen Text – nicht als etwas, woran es sich erinnert.
  Manche Anbieter halten den Verlauf inzwischen serverseitig vor, sodass Sie nur noch die neue Nachricht senden.
  Das ändert nichts an der Zustandslosigkeit des Modells; es verlagert nur die Buchführung vom Client zum Anbieter,
  mit allem, was das für Datenhaltung und Portabilität bedeutet.
- **Der Wissensstand ist zum Trainingszeitpunkt eingefroren:** Ein Modell weiß nichts über die vergangene Woche,
  nichts über Ihre Datenbank und nichts über den Zustand Ihres Systems.
  Es kennt nur das, was im Training vorkam, plus das, was ihm im aktuellen Aufruf mitgegeben wurde.
- **Die Ausgabe ist plausibel, nicht notwendigerweise richtig:** Das Vortraining optimiert auf sprachliche Wahrscheinlichkeit,
  nicht auf Faktentreue; spätere Trainingsstufen korrigieren das teilweise, aber nicht grundsätzlich.
  Ein Modell kann eine falsche Antwort mit derselben stilistischen Sicherheit formulieren wie eine richtige.
  Interne Unsicherheitssignale existieren durchaus – sie schlagen sich aber nur unzuverlässig in der Formulierung nieder, 
  und gängige Benchmarks belohnen bis heute Raten stärker als das Zugeben von Nichtwissen.
  Das ist der Kern dessen, was umgangssprachlich „Halluzination“ heißt: kein Implementierungsfehler, sondern eine Konsequenz aus Trainings- und Bewertungsanreizen.

**Ein LLM kann folglich nichts speichern, nichts abrufen, nichts versenden und nichts ausführen. Es produziert Sprache, keine Wirkung.**

## Was einen Agenten daraus macht

Ein KI-Agent ist keine andere Art von Modell. Er ist ein Programm, das ein Modell nutzt. Die gängige Formel lautet:

> **Agent = Modell + Werkzeuge + Schleife**

**Das Modell** ist die Entscheidungsinstanz:
Es bekommt die Aufgabe, den bisherigen Verlauf und eine Beschreibung der verfügbaren Werkzeuge – und entscheidet, was als Nächstes zu tun ist.

**Die Werkzeuge** sind die Handlungsfähigkeit:
eine Datei lesen, eine Datei schreiben, ein Kommando ausführen, eine [HTTP-Anfrage](https://de.wikipedia.org/wiki/Hypertext_Transfer_Protocol) stellen, eine Datenbankabfrage absetzen.
Jedes Werkzeug ist gewöhnlicher, deterministischer Code – er tut, was dort steht, und nichts anderes.

**Die Schleife** ist die Ausdauer: “Denken” → Handeln → Beobachten → erneut “Denken”.
Und zwar so lange, bis das Ziel erreicht ist oder eine Abbruchbedingung greift.
Wie beschreiben, “denkt” eine LLM natürlich nicht. Sie liefert Ergebnisse durch Wahrscheinlichkeiten basierend auf trainierten Mustern.
Oft wird es aber als “Denken” beschrieben und die vereinfachte Beschreibung hilft hier hoffentlich zum verstehen des Ablaufs.

Erst diese Kombination erzeugt die Fähigkeit, die man landläufig einem „Agenten“ zuschreibt: mehrstufige Aufgaben zu bearbeiten,
auf Zwischenergebnisse zu reagieren und eigene Fehler zu korrigieren.
Ein fehlgeschlagener Test liefert eine Fehlermeldung, die Fehlermeldung geht zurück ins Modell, das Modell schlägt eine Korrektur vor,
der Agent wendet sie an und startet den Test erneut. Diese Rückkopplung ist der eigentliche Fortschritt gegenüber einem reinen Chat.

{{< centered-image src="/posts/2026-08-30-ki-und-agenten/agents-flow.png" width="100%" showCaption=true alt="Ablauf eines Agenten">}}

## Der Punkt, an dem die meisten Erklärungen ungenau werden

Es heißt oft, das Modell „rufe ein Werkzeug auf“. Das stimmt nicht, und die Ungenauigkeit hat sicherheitsrelevante Folgen.

Das Modell kann nichts aufrufen. Es kann ausschließlich Text erzeugen.
Was beim sogenannten Tool Calling – dem Werkzeugaufruf – tatsächlich passiert:
Das Modell erzeugt eine strukturierte Ausgabe, üblicherweise ein JSON-Objekt mit Werkzeugnamen und Parametern.
Diese Ausgabe ist ein **Vorschlag**. Ein Stück konventioneller Code parst sie, prüft sie gegen ein Schema, entscheidet über die Ausführung,
führt aus und schreibt das Ergebnis als neuen Text zurück in den Verlauf. Dann läuft der nächste Durchlauf.

Zwischen der Absicht des Modells und der Wirkung auf Ihre Daten liegt also immer eine ausführende Codeschicht – im Regelfall Ihre eigene.
Genau dort gehören Berechtigungsprüfung, Freigabedialoge und Protokollierung (Audit-Log) hin.
Wer unerwünschtes Verhalten allein über die Formulierung von Prompts zu verhindern versucht, verlagert eine Sicherheitsentscheidung in eine Schicht,
die statistisch arbeitet und keine Garantien geben kann.

{{< centered-image src="/posts/2026-08-30-ki-und-agenten/agents-internals.png" width="100%" showCaption=true alt="Interner Ablauf eines Agenten">}}

Zwei Einschränkungen gehören dazu. Erstens liegt diese Codeschicht **nicht** immer bei Ihnen:
Bei anbieterseitig ausgeführten Werkzeugen – Websuche, Code-Sandbox, serverseitig eingebundene Konnektoren – führt der Modellanbieter aus,
und Sie sehen nur das Ergebnis. Wer die Kontrolle wirklich behalten will, führt Werkzeuge clientseitig aus.

Zweitens löst Schema-Validierung das schwierigere Problem nicht. Werkzeug-Ergebnisse fließen als Text zurück in den Kontext,
und dieser Text stammt aus nicht vertrauenswürdigen Quellen: Webseiten, Tickets, E-Mails, fremden Dateien.
Eine schemakonforme, sauber geparste Löschanfrage bleibt gefährlich, wenn sie aus einer eingeschleusten Anweisung in einem gelesenen Dokument stammt.
Kritisch wird die Kombination aus Zugriff auf vertrauliche Daten, Kontakt mit fremdem Inhalt und einem Weg nach draußen.
Wer alle drei zulässt, hat kein Prompt-Problem, sondern ein Architekturproblem.

## Chatbot und Agent im direkten Vergleich

|     | Chatbot | Agent |
| --- | --- | --- |
| Interaktion | Frage → Antwort | Ziel → Ausführung → Bericht |
| Modellaufrufe | einer pro Antwort | viele pro Aufgabe |
| Zugriff auf Systeme | keiner | über definierte Werkzeuge |
| Wer handelt | der Mensch | der Agent, im Auftrag des Menschen (Im Idealfall basierend auf Erlaubnissen die durch den Menschen erteilt wurden) |
| Fehlerwirkung | eine falsche Auskunft | eine falsche Auskunft plus deren Ausführung |
| Kosten pro Anfrage | vorhersehbar | nicht vorhersehbar, nur über Schrittlimits steuerbar |

Die letzte Zeile ist die kaufmännisch interessanteste, die vorletzte die sicherheitstechnisch relevanteste.
Ein Chatbot, der irrt, sagt etwas Falsches – ein Mensch prüft es und verwirft es.
Ein Agent, der irrt, handelt. Und weil jeder Schritt auf dem vorherigen aufbaut, kann sich ein früher Fehler über die Schleife verstärken, statt sich auszumitteln.

{{< centered-image src="/posts/2026-08-30-ki-und-agenten/chatbot-vs-agent.png" width="100%" showCaption=true alt="Unterschied zwischen Chatbot und Agent">}}

## Das Kontextfenster als eigentliche Grenze

Weil ein LLM zustandslos ist, muss bei jedem Durchlauf der gesamte relevante Zustand erneut übergeben werden:
Aufgabe, gelesene Dateien, alle bisherigen Schritte und Ergebnisse.
Dieser Speicher heißt Kontextfenster und ist die harte Ressource jedes Agentensystems – heute großzügig bemessen, aber endlich.

Drei Effekte greifen ineinander. **Überlauf:** Ist das Fenster voll, muss der Agent entscheiden, was verschwindet;
naive Implementierungen verlieren dabei die Aufgabenstellung, brauchbare fassen abgeschlossene Abschnitte zusammen.
**Qualitätsverlust schon vorher:** Modelle nutzen lange Kontexte nicht gleichmäßig – sobald eine Aufgabe nicht im wörtlichen Wiederfinden besteht,
sondern im Verknüpfen über mehrere Stellen hinweg, sinkt die Trefferquote mit wachsender Länge deutlich.
**Kosten:** Weil jeder Durchlauf den gewachsenen Kontext erneut übergibt, summieren sich die Eingabe-Token über _n_ Schritte quadratisch statt linear.
Prompt Caching senkt den Faktor erheblich, nicht die Struktur.

{{< centered-image src="/posts/2026-08-30-ki-und-agenten/context-window.png" width="100%" showCaption=true alt="Größenanstieg des Kontextfensters">}}

Daraus folgt die zentrale Betriebsregel: **„Gib der KI einfach alles“ ist genau der falsche Instinkt.**
Erfolgreiche Agentensysteme unterscheiden sich von erfolglosen weniger durch das gewählte Modell als durch die Disziplin,
mit der sie den Kontext klein und relevant halten. „Wie verwaltet ihr euren Kontext?“
ist die aufschlussreichste Frage, die Sie einem Team stellen können, das Agenten baut.

## Wer liefert was: Modell-Ebene und Agenten-Ebene bei den gängigen Anbietern

Die begriffliche Trennung ist keine Theorie – sie entspricht bei jedem Anbieter zwei verschiedenen Produkten, oft mit verschiedenen Lizenzen.
Wer beides in einem Vertrag bündelt, verliert die Möglichkeit, sie einzeln auszutauschen.

Zwei Fragen entscheiden über die Portabilität: Ist der Agent Open Source? Und lässt er sich auf fremde Modelle richten?

| Anbieter | Modell-Ebene | Agenten-Ebene | Agent quelloffen? | Modellagnostisch? |
| --- | --- | --- | --- | --- |
| **[Anthropic](https://www.anthropic.com)** | [Claude](https://www.claude.com) (Opus, Sonnet, Haiku, Fable) – ausschließlich proprietär, keine offenen Gewichte | Claude Code, Claude Agent SDK | **Nein.** Das Repository ist öffentlich, die Lizenz erlaubt aber nur die Nutzung unter Anthropics kommerziellen AGB. Das Agent SDK ist [MIT](https://opensource.org/license/mit)-lizenziert. | **Nein.** Nur Claude-Modelle, wenn auch über verschiedene Clouds. |
| **[OpenAI](https://openai.com)** | GPT-Familie (proprietär) sowie [`gpt-oss`](https://github.com/openai/gpt-oss) mit offenen Gewichten unter [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [Codex CLI](https://github.com/openai/codex), Agents SDK, AgentKit | **Ja** – Codex CLI unter Apache 2.0, Agents SDK unter MIT. AgentKit selbst ist ein gehostetes Produkt. | **Ja.** Codex lässt sich per Konfiguration auf fremde Anbieter und lokale Modelle richten. |
| **[Google](https://ai.google/)** | Gemini (proprietär), [Gemma 4](https://ai.google.dev/gemma) mit offenen Gewichten unter Apache 2.0 | Antigravity und Antigravity CLI, Jules, ADK | **Nein – und das ist eine Rückentwicklung.** Die Vorgängerin Gemini CLI war Apache 2.0; die Nachfolgerin wird ohne Lizenzdatei ausgeliefert. | Eingeschränkt: mehrere Modelle wählbar, aber ausschließlich über Googles Vermittlung. |
| **[Mistral AI](https://mistral.ai)** | Large und Small mit offenen Gewichten unter Apache 2.0; Medium und Devstral 2 unter [„Modified MIT“](https://mistral.ai/news/devstral-2-vibe-cli); Codestral proprietär | Vibe (gehostet), Mistral Vibe CLI | **Ja** – Vibe CLI unter Apache 2.0. Das gehostete Produkt ist proprietär. | **Ja** – dokumentiert für jede OpenAI-kompatible Schnittstelle, inklusive [vLLM](https://docs.vllm.ai) und Ollama. |

## Die europäische Option – nüchtern betrachtet

Für Organisationen, die europäischem Datenschutzrecht unterliegen, ist **Mistral AI** der naheliegende Kandidat.
Die Fakten dazu, ohne Marketingfilter.

**Was belastbar ist:** Mistral ist eine französische Aktiengesellschaft mit Sitz in Paris; der Auftragsverarbeitungsvertrag unterliegt französischem Recht und französischer Gerichtsbarkeit.
Es gibt ein EU-Endpunkt-Angebot mit Aufpreis, eine europäische Recheninfrastruktur im Aufbau und – am wichtigsten – **dokumentierten Betrieb auf eigener Hardware**, empfohlen mit vLLM. Mehrere Modelle stehen unter echtem Apache 2.0.

**Warum der Firmensitz überhaupt zählt.** Der [US CLOUD Act](https://de.wikipedia.org/wiki/CLOUD_Act) greift auf Daten zu, die ein Anbieter _unter US-Jurisdiktion_ kontrolliert – unabhängig davon, wo die Server stehen. Datenhaltung in Frankfurt beendet diese Jurisdiktion nicht; Konzernkontrolle ist das Kriterium, nicht Geografie. Der [Europäische Datenschutzausschuss](https://www.edpb.europa.eu/) und der [EDSB](https://www.edps.europa.eu/) [haben 2019 gemeinsam festgestellt](https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en), dass sich die Rechtmäßigkeit einer Herausgabe an US-Behörden ohne entsprechendes internationales Abkommen nicht feststellen lässt. Vor dem französischen Senat konnte [Microsoft](https://www.microsoft.com) 2025 unter Eid nicht garantieren, dass Daten französischer Bürger niemals an US-Behörden gelangen – und bestätigte, einer rechtlich einwandfreien Anordnung Folge leisten zu müssen. Beides gleichzeitig gilt: Die technischen Residenzgarantien sind echt, und sie lösen die Jurisdiktionsfrage nicht.

## Der vollständig offene, anbieterunabhängige Weg

Es gibt zu beiden Ebenen komplett quelloffene Alternativen. Nur muss man dabei sauber zwischen drei Lizenzstufen unterscheiden – hier stecken die unangenehmen Überraschungen.

**Stufe 1 – echte offene Lizenzen.** Gewichte unter Apache 2.0 oder MIT, ohne Nutzungsbeschränkung: [DeepSeek V4](https://www.deepseek.com) unter MIT, [Mistral Large und Small](https://mistral.ai/models) sowie [Ministral](https://mistral.ai/news/ministraux) unter Apache 2.0, [Qwen](https://qwen.ai) in den Arbeitsgrößen, Googles Gemma 4, Metas destilliertes 30B-Modell, OpenAIs `gpt-oss`. Bemerkenswert: Google und Meta haben 2026 ihre eigenen restriktiven Lizenzen aufgegeben und auf Apache 2.0 umgestellt.

**Stufe 2 – offene Gewichte mit Beschränkung, also _nicht_ Open Source.** Hier lohnt genaues Lesen. Mistrals „Modified MIT“ – der Name ist großzügig gewählt – schließt die Nutzung aus, wenn der weltweite konsolidierte Konzernumsatz **20 Millionen US-Dollar im Monat** übersteigt, also etwa 240 Millionen im Jahr. Das betrifft praktisch jede Bank, jeden Versicherer, jeden Industriekonzern und jede größere Klinikgruppe in Europa. Betroffen sind ausgerechnet Mistrals stärkstes Modell und das große Devstral. Ähnlich funktionieren Metas Llama-Lizenz mit ihrer Nutzerschwelle und Benennungspflicht, Googles alte Gemma-Bedingungen mit einem vorbehaltenen Fernabschalter – und auf der Agenten-Seite Lizenzen vom Typ „Functional Source“, die Wettbewerbsnutzung untersagen und erst nach zwei Jahren in MIT übergehen. Alle diese Modelle sind legitim. Open Source im Sinne der Open Source Definition sind sie nicht.

Für Open Elements ist das kein akademischer Streit. Wenn Ihre Rechtsabteilung „Open Source“ liest und die Lizenz eine Umsatzschwelle enthält, haben Sie ein Compliance-Problem, das erst beim Audit auffällt.

**Auf der Agenten-Ebene** ist die Auswahl inzwischen gut. Wer Apache 2.0 oder MIT, echte Modellagnostik und aktive Pflege verlangt, findet unter anderem OpenCode (MIT, mit Abstand die breiteste Anbieterunterstützung), [OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT, als selbstbetriebene Kontrollzentrale), [goose](https://block.github.io/goose/) von Block (Apache 2.0, MCP-nativ), Cline (Apache 2.0), [Qwen Code](https://github.com/QwenLM/qwen-code), Mistrals [Vibe CLI](https://github.com/mistralai/mistral-vibe) und OpenAIs Codex CLI. Zwei Warnungen: Aider, jahrelang die Referenz für modellagnostisches Arbeiten, hat 2026 praktisch keine Releases mehr gesehen. Und bei jedem Agenten mit Erweiterungs- oder Skill-Ökosystem gilt die Lieferkettenfrage – Sicherheitsforscher haben in solchen Erweiterungen bereits Datenabfluss und eingeschleuste Anweisungen nachgewiesen.

**Die Betriebsschicht** ist der unkomplizierteste Teil des Stapels: vLLM unter Apache 2.0 für den produktiven Betrieb auf GPUs, Ollama und llama.cpp unter MIT für Arbeitsplatz und Edge. Hier gibt es keine Lizenzambiguität.

## Eine offene und standardisierter Verbindungsschicht

Und in jedem dieser Fälle gilt derselbe Rat für die Verbindungsschicht: Setzen Sie auf **[MCP](https://modelcontextprotocol.io)** für die Anbindung Ihrer Systeme und auf [**AGENTS.md**](https://agents.md) für Ihre Regeln. Beide werden herstellerneutral von der [Agentic AI Foundation](https://aaif.io) unter dem Dach der [Linux Foundation](https://www.linuxfoundation.org) betreut. Ein MCP-Server ist zugleich die kontrollierte Tür zu Ihrem System – dort gehören Zugriffsregeln und Protokollierung hin. Damit überlebt die Integrationsarbeit, die Sie heute leisten, den nächsten Anbieter- und Modellwechsel. Das ist keine Kleinigkeit: Die Arbeit steckt nicht im Modell, sie steckt in der Anbindung.

## Fazit

- Ein **LLM** ist eine zustandslose Funktion von Text nach Text: kein Gedächtnis, kein Zugriff, keine Handlungsfähigkeit.
- Ein **Agent** ist ein Programm, das ein LLM in eine Schleife mit Werkzeugen einbettet. Erst dadurch entsteht Wirkung – und Risiko.
- Das Modell führt nie selbst aus. Die **Kontrollschicht** ist der Ort für Berechtigungen und Protokollierung, vorausgesetzt sie liegt tatsächlich bei Ihnen.
- **Modell und Agent sind zwei Produkte mit zwei Lizenzen.** Prüfen Sie beide getrennt. Ein öffentliches Repository ist kein Open-Source-Nachweis, offene Gewichte sind keine offene Lizenz, und eine Umsatzschwelle in der Lizenz ist ein Compliance-Risiko.
- **Der Agent bindet stärker als das Modell.** Modellagnostik ist deshalb das wichtigere Auswahlkriterium.
- Es gibt einen **vollständig offenen Weg** über beide Ebenen – aber europäische Herkunft und offene Lizenz sind zwei verschiedene Ziele, die man bewusst gegeneinander abwägen muss.

Unsere Empfehlung bei Open Elements ist dieselbe wie bei jeder anderen Basistechnologie: Nutzen Sie die Fähigkeiten früh und entschlossen – aber bauen Sie sie bewusst auf offenen Standards auf, und lesen Sie die Lizenz, bevor Sie „Open Source“ in die Präsentation schreiben.