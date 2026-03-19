---
outdated: false
showInBlog: true
title: "Open Elements liefert gehärtete Container-Images für die deutsche Verwaltung"
date: 2026-03-19
author: hendrik
excerpt: "Open Elements ist neben ZenDiS und dem Auswärtigen Amt eine der ersten Entitäten, die gehärtete Container-Images für container.gov.de bereitstellen darf. Im Fokus: sichere Eclipse-Temurin-Images für alle Java-LTS-Versionen und die Open-Source-PaaS Coolify."
categories: [Open Elements, Open-Source, Security]
preview_image: "/posts/preview-images/open-source-2-green.svg"
---

Open Elements gehört ab sofort zu den ausgewählten Organisationen, die gehärtete Container-Images für [container.gov.de](https://container.gov.de) bereitstellen dürfen.
Neben dem [Zentrum für Digitale Souveränität (ZenDiS)](https://www.zendis.de) und dem [Auswärtigen Amt](https://www.auswaertiges-amt.de/de) ist Open Elements damit eine der ersten Entitäten, die in diese exklusive Gruppe aufgenommen wurde.

Nach und nach werden weitere ausgewählte Firmen hinzugekommen, doch Open Elements war als **erstes privatwirtschaftliches Unternehmen** mit Fokus auf Open-Source-Technologie dabei.

## Was ist container.gov.de?

Die **Secure Government Container Initiative (SGCI)** hinter container.gov.de stellt geprüfte, gehärtete und signierte Container-Images speziell für die deutsche öffentliche Verwaltung bereit.
In einer Zeit, in der Cyberangriffe auf staatliche Infrastruktur zunehmen und Software-Lieferketten ein bevorzugtes Angriffsziel darstellen, ist diese Initiative ein zentraler Baustein für die digitale Souveränität Deutschlands.

Die Container-Images auf container.gov.de sind nicht einfach Standardimages aus öffentlichen Registries.
Sie durchlaufen einen strengen Härtungsprozess, bei dem Angriffsflächen systematisch reduziert, Schwachstellen aktiv bewertet und False-Positive-CVE-Meldungen minimiert werden.
Nur ausgewählte Organisationen, die die notwendigen Qualitätsmerkmale und Sicherheitsstandards nachweisen können, dürfen Images für diese Plattform bereitstellen.

{{< centered-image src="/posts/2026-03-19-container-gov/oe-delivers.png" width="100%" showCaption="true" alt="Open Elements liefert in Zukunft offizielle gehärtete Container-Images für die deutsche öffentliche Verwaltung">}}

## Warum gehärtete Container für die Verwaltung unverzichtbar sind

Container-Technologie ist aus modernen IT-Infrastrukturen nicht mehr wegzudenken.
Doch Standard-Container-Images aus öffentlichen Registries wie Docker Hub bringen erhebliche Sicherheitsrisiken mit sich:

- **Unbekannte Herkunft:** Viele Images werden von anonymen Dritten erstellt und gepflegt, ohne nachvollziehbare Qualitätssicherung.
- **Veraltete Abhängigkeiten:** Öffentliche Images enthalten häufig bekannte Schwachstellen, die nicht zeitnah gepatcht werden.
- **Fehlende Transparenz:** Ohne Software Bill of Materials (SBOM) ist nicht nachvollziehbar, welche Komponenten in einem Image enthalten sind.
- **Keine Signierung:** Standard-Images bieten keine kryptografische Garantie, dass sie nicht manipuliert wurden.

Für Behörden und Verwaltungen, die mit sensiblen Bürgerdaten und kritischer Infrastruktur arbeiten, sind diese Risiken schlicht inakzeptabel.
Gehärtete Images, wie sie über container.gov.de bereitgestellt werden, adressieren genau diese Probleme:
Sie sind geprüft, dokumentiert, signiert und werden kontinuierlich gegen aktuelle Schwachstellen-Datenbanken abgeglichen.

## Was Open Elements beiträgt

Open Elements wird im Rahmen dieser Initiative gehärtete Container-Images für [Eclipse Temurin](https://adoptium.net/temurin/) erstellen und pflegen.
Eclipse Temurin ist die weltweit meistgenutzte herstellerunabhängige Java-Distribution mit über 600 Millionen Downloads und wird unter dem Dach des Eclipse-Adoptium-Projekts entwickelt.

Konkret umfasst der Beitrag von Open Elements:

- **Gehärtete Temurin-Images für alle aktuellen Java-LTS-Versionen** (Java 11, 17, 21, 25 und zukünftige LTS-Releases)
- **Gehärtete Images für [Coolify](https://coolify.io)**, die Open-Source-PaaS-Plattform, die als selbst gehostete Alternative zu Heroku oder Vercel eine souveräne Hosting-Lösung für Behörden ermöglicht

Die technische Umsetzung und die Images sind transparent auf der OpenCode-Plattform der Bundesverwaltung einsehbar: [gitlab.opencode.de/oci-community/images](https://gitlab.opencode.de/oci-community/images).

{{< centered-image src="/posts/2026-03-19-container-gov/gitlab-view.png" width="100%" showCaption="true" alt="Open Elements hat als erstes Unternehmen eigenen Bereich neben Zendis und Auswärtige Amt in der OpenCode-Plattform erhalten">}}

## Ehrenamtliches Engagement für die digitale Souveränität

Ein besonders wichtiger Aspekt: Open Elements leistet diesen Beitrag **ehrenamtlich**.
Die Erstellung und Pflege der gehärteten Container-Images erfolgt nicht im Rahmen eines bezahlten Auftrags, sondern aus der tiefen Überzeugung, dass die digitale Souveränität der deutschen Verwaltung eine gesamtgesellschaftliche Aufgabe ist.

Dieses Engagement reiht sich in eine lange Tradition von Open Elements ein, aktiv und unentgeltlich zur Verbesserung der Open-Source-Infrastruktur für den öffentlichen Sektor beizutragen.
Ob bei der Pflege von [Apache Maven]({{< ref "support-care-maven" >}}), der Mitarbeit in der [Open Regulatory Compliance Working Group](https://orcwg.org) für den Cyber Resilience Act oder der Arbeit an Eclipse Adoptium:
Open Elements versteht sich als Brücke zwischen der internationalen Open-Source-Community und den spezifischen Anforderungen der deutschen Verwaltung.

## ZenDiS: Ein Vorbild für die Zusammenarbeit mit der Community

An dieser Stelle gebührt dem **Zentrum für Digitale Souveränität (ZenDiS)** besondere Anerkennung.
ZenDiS hat mit der Secure Government Container Initiative und der gesamten OpenCode-Plattform eine Infrastruktur geschaffen, die nicht nur technisch überzeugt, sondern vor allem eines richtig macht:
**die Nähe zur Open-Source-Community**.

{{< centered-image src="/posts/2026-03-19-container-gov/zendis-connects.png" width="100%" showCaption="true" alt="Zendis ist das perfekte Bindeglied zwischen der Regierung und der Open-Source-Community">}}

Anstatt Lösungen hinter verschlossenen Türen zu entwickeln, setzt ZenDiS konsequent auf Zusammenarbeit mit führenden Stewards und Experten für spezielle Technologien.
Im Fall von Java bedeutet das die Zusammenarbeit mit Open Elements, das durch seine Rollen bei der Eclipse Foundation, Eclipse Adoptium und als Open-Source-Steward tiefgreifende Expertise in der Java-Sicherheitslandschaft mitbringt.

Dieser Ansatz, gezielt mit spezialisierten Open-Source-Entitäten zusammenzuarbeiten, ist zukunftsweisend.
Er zeigt, dass die öffentliche Verwaltung nicht alles selbst entwickeln muss, sondern durch kluge Partnerschaften mit der Community bessere und sicherere Ergebnisse erzielt.
ZenDiS setzt hier Maßstäbe, an denen sich andere staatliche Initiativen orientieren können.

## Ein Signal für die Open-Source-Community

Die Aufnahme von Open Elements in den Kreis der Bereitstellenden für container.gov.de ist mehr als ein technisches Detail.
Es ist ein Signal, dass die deutsche Verwaltung die Zusammenarbeit mit der Open-Source-Community ernst nimmt und bereit ist, auf die Expertise spezialisierter Stewards zu vertrauen.

Für Open Elements ist es gleichzeitig ein Beleg dafür, dass ehrenamtliches Engagement und tiefe technische Kompetenz auch im öffentlichen Sektor Anerkennung finden.
Wir sind stolz darauf, mit gehärteten Eclipse-Temurin-Images einen konkreten Beitrag zur sicheren IT-Infrastruktur der deutschen Verwaltung leisten zu dürfen.

**Du möchtest mehr über unsere Arbeit im Bereich Open Source und öffentliche Verwaltung erfahren?**
[Kontaktiere uns]({{< relref "contact" >}}) oder [abonniere unseren Newsletter]({{< relref "newsletter" >}}).
