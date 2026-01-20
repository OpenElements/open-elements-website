import React from 'react';
import {createRoot} from 'react-dom/client';
import MavenPRs from './maven-prs';

class MavenPRsElement extends HTMLElement {
  connectedCallback() {
    const status = this.getAttribute('status'); // 👈 Attribut auslesen

    const root = createRoot(this);
    root.render(<MavenPRs status={status || undefined}/>);
  }
}

customElements.define('maven-prs', MavenPRsElement);