import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import marked from 'marked';

/* eslint-disable indent */
function infoDescriptionHeadingRenderer() {
  const renderer = new marked.Renderer();
  renderer.heading = ((text, level, raw, slugger) => `<h${level} class="observe-me" id="overview--${slugger.slug(raw)}">${text}</h${level}>`);
  return renderer;
}

export default function overviewTemplate() {
  return html`
    <div id="overview" 
      class="observe-me ${this.renderStyle === 'view' ? 'section-gap' : 'section-gap--read-mode'}">
      ${this.resolvedSpec?.info
        ? html`
          <div id="api-title" style="font-size:32px">
            ${this.resolvedSpec.info.title}
            ${!this.resolvedSpec.info.version ? '' : html`
              <span style = 'font-size:var(--font-size-small);font-weight:bold'>
                ${this.resolvedSpec.info.version}
              </span>`
            }
          </div>
          <div id="api-info" style="font-size:calc(var(--font-size-regular) - 1px); margin-top:8px;">
            ${this.resolvedSpec.info.contact?.email
              ? html`<span>${this.resolvedSpec.info.contact.name || 'Email'}: 
                <a href="mailto:${this.resolvedSpec.info.contact.email}">${this.resolvedSpec.info.contact.email}</a>
              </span>`
              : ''
            }
            ${this.resolvedSpec.info.contact?.url
              ? html`<span>URL: <a href="${this.resolvedSpec.info.contact.url}">${this.resolvedSpec.info.contact.url}</a></span>`
              : ''
            }
            ${this.resolvedSpec.info.license
              ? html`<span>License: 
                ${this.resolvedSpec.info.license.url
                ? html`<a href="${this.resolvedSpec.info.license.url}">${this.resolvedSpec.info.license.name}</a>`
                : this.resolvedSpec.info.license.name
              } </span>`
              : ''
            }
            ${this.resolvedSpec.info.termsOfService
              ? html`<span><a href="${this.resolvedSpec.info.termsOfService}">Terms of Service</a></span>`
              : ''
            }
          </div>
          <div id="api-description">
          ${this.resolvedSpec.info.description
            ? html`${
              unsafeHTML(`
                <div class="m-markdown regular-font">
                ${marked(this.resolvedSpec.info.description, this.infoDescriptionHeadingsInNavBar === 'true' ? { renderer: infoDescriptionHeadingRenderer() } : undefined)}
              </div>`)}`
            : ''
          }
          </div>
        `
        : ''
      }
    </div>
  `;
}
/* eslint-enable indent */
