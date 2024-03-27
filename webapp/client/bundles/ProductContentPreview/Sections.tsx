import { exampleSetup } from 'prosemirror-example-setup';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { useEffect } from 'react';
import { createMenuPluginForBasicTab } from './SectionsRichTextMenu';
import { mySchema } from './mySchema';
import basicTabRichTextDoc from './rtDocBasicTab.json';
import { applicationState, changeProductName } from './stateStores/application';
import { changeEditorState, setEditorView } from './stateStores/textEditor';

function Sections() {
  useEffect(() => {
    const editorState = EditorState.fromJSON(
      {
        schema: mySchema,
        plugins: [...exampleSetup({ schema: mySchema, menuBar: false }), createMenuPluginForBasicTab(mySchema)],
      },
      basicTabRichTextDoc
    );

    const editorView = new EditorView(document.querySelector('#editor'), {
      state: editorState,
      dispatchTransaction(transaction) {
        changeEditorState('basicTab', transaction);
      },
    });

    setEditorView('basicTab', editorView);
  }, []);

  return (
    <>
      <section className="input-group">
        <fieldset>
          <legend>
            <label className="top-level-label" htmlFor=":r4:">
              Name
            </label>
          </legend>
          <input
            id=":r4:"
            name="link_name"
            className="top-level-input"
            type="text"
            placeholder="Name"
            defaultValue={applicationState.productName}
            onChange={(e) => changeProductName(e.currentTarget.value)}
          />
        </fieldset>
        <fieldset>
          <legend>
            <label className="top-level-label" htmlFor=":r5:">
              Description
            </label>
          </legend>
          <div className="rich-text-editor" data-gumroad-ignore="true">
            <div role="toolbar" className="basic-tab rich-text-editor-toolbar">
              <span role="button" aria-pressed="false" aria-label="Bold" tabIndex={0}>
                <span className="icon icon-bold"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Italic" tabIndex={0}>
                <span className="icon icon-italic"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Underline" tabIndex={0}>
                <span className="icon icon-underline"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Strikethrough" tabIndex={0}>
                <span className="icon icon-strikethrough"></span>
              </span>
              <details className="popover toggle">
                <summary>
                  <span
                    role="button"
                    aria-pressed="false"
                    aria-label="Headings"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    <span className="icon icon-headings"></span>
                  </span>
                </summary>
                <div
                  className="dropdown"
                  style={{
                    transform: 'translateX(min(460px - 100% - var(--spacer-4), 0px))',
                    maxWidth: 'calc(673px - 2 * var(--spacer-4))',
                  }}
                >
                  <ul role="menu" style={{ padding: '0px', overflowX: 'hidden' }}>
                    <li role="menuitemradio" aria-checked="false">
                      <span className="icon icon-h1"></span>
                      <span>Large heading</span>
                    </li>
                    <li role="menuitemradio" aria-checked="false">
                      <span className="icon icon-h2"></span>
                      <span>Medium heading</span>
                    </li>
                    <li role="menuitemradio" aria-checked="false">
                      <span className="icon icon-h3"></span>
                      <span>Small heading</span>
                    </li>
                  </ul>
                </div>
              </details>
              <span role="button" aria-pressed="false" aria-label="Toggle code block" tabIndex={0}>
                <span className="icon icon-code"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Bulleted list" tabIndex={0}>
                <span className="icon icon-unordered-list"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Numbered list" tabIndex={0}>
                <span className="icon icon-ordered-list"></span>
              </span>
              <span role="button" aria-label="Horizontal line" tabIndex={0}>
                <span className="icon icon-horizontal-rule"></span>
              </span>
              <span role="button" aria-pressed="false" aria-label="Quote" tabIndex={0}>
                <span className="icon icon-quote"></span>
              </span>
              <details className="popover toggle">
                <summary>
                  <span
                    role="button"
                    aria-pressed="false"
                    aria-label="Insert link"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    <span className="icon icon-link"></span>
                  </span>
                </summary>
                <div
                  className="dropdown"
                  style={{
                    transform: 'translateX(min(244px - 100% - var(--spacer-4), 0px))',
                    maxWidth: 'calc(673px - 2 * var(--spacer-4))',
                  }}
                >
                  <fieldset className="tiptap__link-popover">
                    <input className="top-level-input" type="text" placeholder="Enter text" defaultValue="" />
                    <input className="top-level-input" type="text" placeholder="Enter URL" defaultValue="" />
                    <button className="primary" type="button">
                      Add link
                    </button>
                  </fieldset>
                </div>
              </details>
              <div role="separator" aria-orientation="vertical"></div>
              <label>
                <span role="button" aria-pressed="false" aria-label="Insert image" tabIndex={0}>
                  <span className="icon icon-image"></span>
                </span>
                <input multiple={false} type="file" accept=".jpeg,.jpg,.png,.gif,.webp" />
              </label>
              <details className="popover toggle">
                <summary>
                  <span
                    role="button"
                    aria-label="Insert button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    <span className="icon icon-button"></span>
                  </span>
                </summary>
                <div
                  className="dropdown"
                  style={{
                    transform: 'translateX(min(151px - 100% - var(--spacer-4), 0px))',
                    maxWidth: 'calc(673px - 2 * var(--spacer-4))',
                  }}
                >
                  <fieldset className="tiptap__link-popover">
                    <input className="top-level-input" type="text" placeholder="Enter text" defaultValue="" />
                    <input className="top-level-input" type="text" placeholder="Enter URL" defaultValue="" />
                    <button className="primary" type="button">
                      Add button
                    </button>
                  </fieldset>
                </div>
              </details>
              <details className="popover toggle">
                <summary>
                  <span
                    role="button"
                    aria-pressed="false"
                    aria-label="Insert video"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    <span className="icon icon-embed"></span>
                  </span>
                </summary>
                <div
                  className="dropdown"
                  style={{
                    transform: 'translateX(min(115px - 100% - var(--spacer-4), 0px))',
                    maxWidth: 'calc(673px - 2 * var(--spacer-4))',
                  }}
                >
                  <fieldset>
                    <legend>
                      <label htmlFor=":r16:">Video URL</label>
                    </legend>
                    <input
                      id=":r16:"
                      className="top-level-input"
                      type="text"
                      placeholder="https://youtu.be/Qku-fDzi3Os"
                    />
                    <button className="primary" type="button">
                      Insert
                    </button>
                  </fieldset>
                </div>
              </details>
              <details className="popover toggle">
                <summary>
                  <span
                    role="button"
                    aria-pressed="false"
                    aria-label="Insert tweet"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    <span className="icon icon-twitter"></span>
                  </span>
                </summary>
                <div
                  className="dropdown"
                  style={{
                    transform: 'translateX(min(604px - 100% - var(--spacer-4), 0px))',
                    maxWidth: 'calc(673px - 2 * var(--spacer-4))',
                  }}
                >
                  <fieldset>
                    <legend>
                      <label htmlFor=":r17:">Tweet URL</label>
                    </legend>
                    <input
                      id=":r17:"
                      className="top-level-input"
                      type="text"
                      placeholder="https://x.com/gumroad/status/1663556902624845824"
                    />
                    <button className="primary" type="button">
                      Insert
                    </button>
                  </fieldset>
                </div>
              </details>
              <div style={{ display: 'flex', marginLeft: 'auto' }}>
                <span
                  role="button"
                  aria-pressed="false"
                  aria-disabled="false"
                  aria-label="Undo last change"
                  tabIndex={0}
                >
                  <span className="icon icon-undo"></span>
                </span>
                <span
                  role="button"
                  aria-pressed="false"
                  aria-disabled="true"
                  aria-label="Redo last undone change"
                  tabIndex={0}
                >
                  <span className="icon icon-redo"></span>
                </span>
              </div>
            </div>
            <div
              id="editor"
              style={{ marginBottom: '23px', paddingTop: 0 }}
              className="rich-text-editor"
              data-gumroad-ignore="true"
            ></div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <label className="top-level-label" htmlFor=":r6:">
              URL
            </label>
            <span className="has-tooltip">
              <span aria-describedby=":r7:" style={{ display: 'contents' }}>
                <span style={{ display: 'contents' }}>
                  <a role="button">Copy URL</a>
                </span>
              </span>
              <span role="tooltip" id=":r7:">
                Copy to Clipboard
              </span>
            </span>
          </legend>
          <div className="input">
            <div className="pill">jdesma.gumroad.jacquesdesmarais.dev/l/</div>
            <input id=":r6:" type="text" placeholder="dcfqu" defaultValue="" />
          </div>
        </fieldset>
        <fieldset className="">
          <legend>
            <label htmlFor=":r8:">Custom domain</label>
            <a href="https://help.gumroad.com/article/153-setting-up-a-custom-domain" target="_blank" rel="noreferrer">
              Learn more
            </a>
          </legend>
          <div className="input input-wrapper">
            <input id=":r8:" placeholder="yourdomain.com" type="text" defaultValue="" />
          </div>
          <small></small>
        </fieldset>
      </section>
      <section className="input-group top-level-input cover-editor">
        <header>
          <h2>Cover</h2>
        </header>
        <div className="placeholder">
          <div>
            <button type="button" className="primary">
              <span className="icon icon-upload-fill"></span> Upload images or videos
            </button>
          </div>
          Images should be horizontal, at least 1280x720px, and 72 DPI (dots per inch).
        </div>
      </section>
      <section className="input-group">
        <header>
          <h2>Thumbnail</h2>
        </header>
        <div className="image-uploader">
          <details className="popover toggle">
            <summary>
              <div
                className="placeholder"
                style={{
                  background:
                    "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjRkY5MEU4IiBkPSJNMCAwaDIwMHYyMDBIMHoiLz48cGF0aCBkPSJNNDMuOTggMTYxLjc1aDk0LjYxN3YtLjk1bC4wMDQuOTVjMy41NDItLjAxNCA2Ljk3OC0xLjI5MyA5Ljg1MS0zLjYzNyAyLjg3LTIuMzQzIDUuMDQyLTUuNjM2IDYuMjQ3LTkuNDI1bC4wMDEtLjAwNCAxNy40MS01NS40NTFhMjIuOTE2IDIyLjkxNiAwIDAgMCAuOTAyLTkuMzQ5Yy0uMzQ4LTMuMTUzLTEuMzQxLTYuMTctMi45MDUtOC43OTMtMS41NjQtMi42MjMtMy42NTYtNC43ODItNi4xMDgtNi4yNzktMi40NTQtMS40OTgtNS4xOTItMi4yODYtNy45OC0yLjI4NmgtMS41MDdjLS4xODMtNC45MjQtMS45MzUtOS42MjQtNC45NTYtMTMuMTU4LTMuMTk2LTMuNzM5LTcuNTY0LTUuODc4LTEyLjE1OC01Ljg4M0g5My4wNzNjLTMuMjY2LTQuNzg3LTcuOTg0LTguMDA3LTEzLjI0Ny04Ljk0OWwtLjA4My0uMDE1aC0uMDU4YTE4LjM5OCAxOC4zOTggMCAwIDAtMy4xMzgtLjI3MUg2MC4yNzFjLTMuMjY0IDAtNi40NzYuODgxLTkuMzg1IDIuNTY1LTIuNzY3IDEuNjAyLTUuMTg1IDMuODg3LTcuMDkzIDYuNjgtNC41MjYuMDYzLTguODIgMi4xOTQtMTEuOTcyIDUuODgzLTMuMTkyIDMuNzM0LTQuOTY3IDguNzctNC45NzIgMTMuOTk3djc0LjQ5MWMuMDA1IDUuMjI3IDEuNzggMTAuMjYzIDQuOTcyIDEzLjk5OSAzLjE5NSAzLjczOSA3LjU2MyA1Ljg3OSAxMi4xNTggNS44ODZaIiBmaWxsPSIjRkY5MEU4IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS45Ii8+PHBhdGggZD0iTTE1OC41NiA4MS4wNzZhMy42MyAzLjYzIDAgMCAxIDEuOTA0LjU0NWMuNTg4LjM2IDEuMDkzLjg4IDEuNDczIDEuNTE4LjM3OS42MzguNjIxIDEuMzc0LjcwNiAyLjE0NWE1LjYyNiA1LjYyNiAwIDAgMS0uMjIxIDIuMjg1bC0xOC4wMyA1Ny41NjZjLS4yOTIuOTI3LS44MTkgMS43MjgtMS41MSAyLjI5My0uNjkxLjU2Ni0xLjUxMy44NjktMi4zNTYuODY5aC0xLjI2NGMuNTQxIDAgMS4wNzctLjEyNSAxLjU3Ni0uMzY4LjUtLjI0My45NTMtLjU5OSAxLjMzNS0xLjA0Ny4zODMtLjQ0OS42ODYtLjk4Mi44OTItMS41NjhhNS41NDYgNS41NDYgMCAwIDAgLjMxMi0xLjg1VjgxLjA3NmgxNS4xODNabS00Mi40MjkgMjcuMDhhLjExNi4xMTYgMCAwIDEgMCAuMDg2bC02LjQxNCAxMS4zNzhhLjEwMi4xMDIgMCAwIDEtLjA1MS4wNDcuMDkxLjA5MSAwIDAgMS0uMDQuMDEuMDk1LjA5NSAwIDAgMS0uMDQtLjAxbC0yMS41NjMtMTIuNjczLTQuMDczIDE3LjE0YS4xMDQuMTA0IDAgMCAxLS4wMy4wNTYuMTAzLjEwMyAwIDAgMS0uMDU4LjAyNi4wOTcuMDk3IDAgMCAxLS4wNi0uMDEuMS4xIDAgMCAxLS4wNDUtLjA0MmwtMjIuMzY4LTM5LjQ0YS4xMDUuMTA1IDAgMCAxIC4wMzYtLjE0Ni4wOTguMDk4IDAgMCAxIC4wNTMtLjAxM2w0NC41OTItLjEwNGEuMTA0LjEwNCAwIDAgMSAuMS4wNjYuMTEuMTEgMCAwIDEtLjAyNS4xMTlsLTExLjgzIDExLjI3IDIxLjc3OCAxMi4xNzVjLjAyLjAxNy4wMzMuMDM5LjAzOC4wNjVaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEzOS4yODMgMTQ4LjI5N2MuNTQxIDAgMS4wNzctLjEyNSAxLjU3Ni0uMzY4LjUtLjI0My45NTMtLjU5OSAxLjMzNi0xLjA0Ny4zODItLjQ0OS42ODUtLjk4Mi44OTEtMS41NjhhNS41NDYgNS41NDYgMCAwIDAgLjMxMi0xLjg1VjY2LjEzN2E1LjUzNiA1LjUzNiAwIDAgMC0uMzEyLTEuODQ4IDQuOTQ1IDQuOTQ1IDAgMCAwLS44OTItMS41NjcgNC4xMzYgNC4xMzYgMCAwIDAtMS4zMzUtMS4wNDcgMy41OTIgMy41OTIgMCAwIDAtMS41NzYtLjM2Nkg4NC40NDljMC0yLjI4Ni0uNjk2LTQuNDk3LTEuOTYtNi4yMzUtMS4yNjYtMS43MzktMy4wMTktMi44OS00Ljk0My0zLjI0OGE3LjIzIDcuMjMgMCAwIDAtMS4yNjQtLjExNEg1OS40MzZjLTIuMTY5IDAtNC4yNSAxLjAxMS01Ljc4MyAyLjgxMS0xLjUzNCAxLjgtMi4zOTYgNC4yNDEtMi4zOTYgNi43ODZoLTguNjcxYTMuNTkgMy41OSAwIDAgMC0xLjU3Ni4zNjZjLS41LjI0My0uOTUzLjU5OC0xLjMzNSAxLjA0N2E0Ljk1MiA0Ljk1MiAwIDAgMC0uODkyIDEuNTY3IDUuNTU3IDUuNTU3IDAgMCAwLS4zMTIgMS44NDh2NzcuMzI3YzAgLjYzNS4xMDUgMS4yNjMuMzEyIDEuODVhNC45NiA0Ljk2IDAgMCAwIC44OTIgMS41NjhjLjM4Mi40NDguODM2LjgwNCAxLjMzNSAxLjA0Ny41LjI0MyAxLjAzNS4zNjggMS41NzYuMzY4aDEuNzgxIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS45IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTQzLjM5OCA4MS4wNzZoMTUuMTYyYTMuNjMgMy42MyAwIDAgMSAxLjkwNC41NDVjLjU4OC4zNiAxLjA5My44OCAxLjQ3MyAxLjUxOC4zNzkuNjM4LjYyMSAxLjM3NC43MDYgMi4xNDVhNS42MjYgNS42MjYgMCAwIDEtLjIyMSAyLjI4NWwtMTguMDMgNTcuNTY2Yy0uMjkyLjkyNy0uODE5IDEuNzI4LTEuNTEgMi4yOTMtLjY5MS41NjYtMS41MTMuODY5LTIuMzU2Ljg2OUg0NC4zNjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMDkuNjY2IDExOS42NjdhLjA5MS4wOTEgMCAwIDEtLjA0LjAxLjA5NS4wOTUgMCAwIDEtLjA0LS4wMWwtMjEuNTYzLTEyLjY3My00LjA3MyAxNy4xNGEuMTA0LjEwNCAwIDAgMS0uMDMuMDU2LjEwMy4xMDMgMCAwIDEtLjA1OC4wMjYuMDk3LjA5NyAwIDAgMS0uMDYtLjAxLjEuMSAwIDAgMS0uMDQ1LS4wNDJsLTIyLjM2OC0zOS40NGEuMTA1LjEwNSAwIDAgMSAuMDM2LS4xNDYuMDk4LjA5OCAwIDAgMSAuMDUzLS4wMTNsNDQuNTkyLS4xMDRhLjEwNC4xMDQgMCAwIDEgLjEuMDY2LjExLjExIDAgMCAxLS4wMjUuMTE5bC0xMS44MyAxMS4yNyAyMS43NzggMTIuMTc1YS4xMTEuMTExIDAgMCAxIC4wNTEuMDY1Yy4wMS4wMjcuMDEuMDU4IDAgLjA4NmwtNi40MjcgMTEuMzc4YS4xMDIuMTAyIDAgMCAxLS4wNTEuMDQ3WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')",
                }}
              >
                <button type="button" className="primary" aria-haspopup="true" aria-expanded="false">
                  <span className="icon icon-upload-fill"></span> Upload files
                </button>
              </div>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(609px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(673px - 2 * var(--spacer-4))',
              }}
            >
              <div style={{ width: '38rem', maxWidth: '100%' }}>
                <input type="file" name="file" accept=".jpeg,.jpg,.png,.gif" />
                <div className="tab-buttons small" role="tablist">
                  <button role="tab" type="button">
                    <span className="icon icon-upload-fill"></span>Computer files
                  </button>
                  <button role="tab" type="button" aria-selected="false" aria-controls=":rb:">
                    <span className="icon icon-unsplash"></span>Unsplash
                  </button>
                </div>
              </div>
            </div>
          </details>
          <div>
            This image appears in the Gumroad Library, Discover and Profile pages. Your image should be square, at least
            600x600px, and JPG, PNG or GIF format.
          </div>
        </div>
      </section>
      <section className="input-group">
        <h2>Product info</h2>
        <fieldset>
          <legend>
            <label className="top-level-label" htmlFor=":rc:">
              Call to action
            </label>
          </legend>
          <select id=":rc:" className="appearance-none top-level-input">
            <option value="i_want_this_prompt">I want this!</option>
            <option value="buy_this_prompt">Buy this</option>
            <option value="pay_prompt">Pay</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>
            <label htmlFor=":rd:" className="top-level-label">
              Summary
            </label>
          </legend>
          <input
            className="summary-input top-level-input"
            id=":rd:"
            type="text"
            placeholder="You'll get..."
            defaultValue=""
          />
        </fieldset>
        <fieldset>
          <legend className="additional-details-legend">Additional details</legend>
          <div className="placeholder">
            <h2>Add details</h2>
            Call out important features of your product that help your customers decide to buy
            <button className="primary" type="button" style={{ alignSelf: 'center' }}>
              <span className="icon icon-plus-circle"></span>Add detail
            </button>
          </div>
        </fieldset>
      </section>
      <section className="input-group">
        <header>
          <h2 className="h4">Integrations</h2>
        </header>
        <details className="toggle">
          <summary>
            <label>
              <input type="checkbox" role="switch" />
              Invite your customers to a Circle community
              <a
                href="/help/circle-integration"
                target="_blank"
                rel="noopener noreferrer"
                className="learn-more"
                style={{ flexShrink: 0 }}
              >
                Learn more
              </a>
            </label>
          </summary>
          <div className="dropdown">
            <div className="paragraphs">
              People who purchase your product will be automatically invited to your Circle community. To get your API
              token, visit your-community.circle.so/settings/API.
              <fieldset className="">
                <legend>
                  <label htmlFor=":rg:">API Token</label>
                </legend>
                <input id=":rg:" type="text" placeholder="Type or paste your API token" defaultValue="" />
              </fieldset>
              <button className="primary" type="button" style={{ marginTop: 'var(--spacer-4)' }}>
                Update
              </button>
            </div>
          </div>
        </details>
        <label>
          <input type="checkbox" role="switch" />
          Invite your customers to a Discord server
          <a
            href="/help/discord-integration"
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more"
            style={{ flexShrink: 0 }}
          >
            Learn more
          </a>
        </label>
      </section>
      <section className="input-group pricing-section">
        <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
          <header>
            <h2>Pricing</h2>
          </header>
          <fieldset className="relative">
            <legend>
              <label className="top-level-label" htmlFor=":rj:">
                Amount
              </label>
            </legend>
            <div className="input-with-button">
              <div className="input">
                <div className="pill">CAD$</div>
                <input id=":rj:" type="text" placeholder="2" maxLength={10} autoComplete="off" defaultValue="1" />
              </div>
            </div>
            <div className="clear legacy-only"></div>
          </fieldset>
          <label className="legacy-only top-level-label">Settings</label>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" />
                Allow customers to pay what they want
              </label>
            </summary>
            <div className="dropdown">
              <div
                className="pay-what-you-want-tooltip__row"
                style={{
                  display: 'grid',
                  gap: 'var(--spacer-3)',
                  gridTemplateColumns: 'repeat(auto-fit, max(var(--dynamic-grid), 50% - var(--spacer-3) / 2))',
                  alignItems: 'flex-end',
                }}
              >
                <fieldset>
                  <legend>
                    <label className="top-level-label" htmlFor=":rk:">
                      Minimum amount
                    </label>
                  </legend>
                  <div className="input disabled">
                    <div className="pill">CAD$</div>
                    <input
                      id=":rk:"
                      type="text"
                      placeholder="2"
                      maxLength={10}
                      disabled={false}
                      readOnly={false}
                      defaultValue="1"
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>
                    <label className="top-level-label" htmlFor=":rl:">
                      Suggested amount
                    </label>
                  </legend>
                  <div className="input">
                    <div className="pill">CAD$</div>
                    <input id=":rl:" type="text" placeholder="2" maxLength={10} defaultValue="" />
                  </div>
                </fieldset>
              </div>
            </div>
          </details>
        </div>
      </section>
      <section className="input-group">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Versions</h2>
          <a href="/help/variants" target="_blank" rel="noopener noreferrer" className="learn-more">
            Learn more
          </a>
        </div>
        <div className="rows" role="list" aria-label="Version editor">
          <div role="listitem">
            <div className="content">
              <div aria-grabbed="false" data-drag-handle="true" draggable="true"></div>
              <span className="icon icon-stack-fill"></span>
              <h3>one</h3>
            </div>
            <div className="actions">
              <span className="has-tooltip bottom">
                <span aria-describedby=":r1n:" style={{ display: 'contents' }}>
                  <button className="" type="button" aria-label="Close drawer">
                    <span className="icon icon-outline-cheveron-up"></span>
                  </button>
                </span>
                <span role="tooltip" id=":r1n:">
                  Close drawer
                </span>
              </span>
              <span className="has-tooltip bottom">
                <span aria-describedby=":r1o:" style={{ display: 'contents' }}>
                  <button className="outline-danger" type="button" aria-label="Remove version">
                    <span className="icon icon-trash2"></span>
                  </button>
                </span>
                <span role="tooltip" id=":r1o:">
                  Remove
                </span>
              </span>
            </div>
            <div className="drawer paragraphs" style={{ display: 'grid', gap: 'var(--spacer-5)' }}>
              <fieldset>
                <legend>
                  <label htmlFor="option_VjBqZpNx9c12Y-2cAYTCVg==_name">Name</label>
                </legend>
                <div className="input">
                  <input
                    id="option_VjBqZpNx9c12Y-2cAYTCVg==_name"
                    type="text"
                    placeholder="Version name"
                    defaultValue="one"
                  />
                  <a
                    target="_blank"
                    aria-label="Share one"
                    href="https://jdesma.gumroad.jacquesdesmarais.dev/l/dcfqu?option=VjBqZpNx9c12Y-2cAYTCVg%3D%3D"
                    data-gumroad-ignore="true"
                    rel="noreferrer"
                  >
                    Share
                  </a>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="option_VjBqZpNx9c12Y-2cAYTCVg==_description">Description</label>
                </legend>
                <textarea id="option_VjBqZpNx9c12Y-2cAYTCVg==_description" maxLength={255}></textarea>
              </fieldset>
              <div style={{ display: 'grid', gap: 'var(--spacer-5)', gridAutoFlow: 'column', alignItems: 'flex-end' }}>
                <fieldset>
                  <legend>
                    <label htmlFor="option_VjBqZpNx9c12Y-2cAYTCVg==_price_diff">Additional amount</label>
                  </legend>
                  <div className="input">
                    <div className="pill">CAD$</div>
                    <input
                      id="option_VjBqZpNx9c12Y-2cAYTCVg==_price_diff"
                      type="text"
                      placeholder="0"
                      defaultValue="0"
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>
                    <label htmlFor="option_VjBqZpNx9c12Y-2cAYTCVg==_qty">Quantity</label>
                  </legend>
                  <input id="option_VjBqZpNx9c12Y-2cAYTCVg==_qty" placeholder="∞" type="text" defaultValue="" />
                </fieldset>
              </div>
            </div>
          </div>
          <div role="listitem">
            <div className="content">
              <div aria-grabbed="false" data-drag-handle="true" draggable="true"></div>
              <span className="icon icon-stack-fill"></span>
              <h3>two</h3>
            </div>
            <div className="actions">
              <span className="has-tooltip bottom">
                <span aria-describedby=":r1q:" style={{ display: 'contents' }}>
                  <button className="" type="button" aria-label="Close drawer">
                    <span className="icon icon-outline-cheveron-up"></span>
                  </button>
                </span>
                <span role="tooltip" id=":r1q:">
                  Close drawer
                </span>
              </span>
              <span className="has-tooltip bottom">
                <span aria-describedby=":r1r:" style={{ display: 'contents' }}>
                  <button className="outline-danger" type="button" aria-label="Remove version">
                    <span className="icon icon-trash2"></span>
                  </button>
                </span>
                <span role="tooltip" id=":r1r:">
                  Remove
                </span>
              </span>
            </div>
            <div className="drawer paragraphs" style={{ display: 'grid', gap: 'var(--spacer-5)' }}>
              <fieldset>
                <legend>
                  <label htmlFor="option_NxP68JiGajkgCRohWGNmOg==_name">Name</label>
                </legend>
                <div className="input">
                  <input
                    id="option_NxP68JiGajkgCRohWGNmOg==_name"
                    type="text"
                    placeholder="Version name"
                    defaultValue="two"
                  />
                  <a
                    target="_blank"
                    aria-label="Share two"
                    href="https://jdesma.gumroad.jacquesdesmarais.dev/l/dcfqu?option=NxP68JiGajkgCRohWGNmOg%3D%3D"
                    data-gumroad-ignore="true"
                    rel="noreferrer"
                  >
                    Share
                  </a>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="option_NxP68JiGajkgCRohWGNmOg==_description">Description</label>
                </legend>
                <textarea id="option_NxP68JiGajkgCRohWGNmOg==_description" maxLength={255}></textarea>
              </fieldset>
              <div style={{ display: 'grid', gap: 'var(--spacer-5)', gridAutoFlow: 'column', alignItems: 'flex-end' }}>
                <fieldset>
                  <legend>
                    <label htmlFor="option_NxP68JiGajkgCRohWGNmOg==_price_diff">Additional amount</label>
                  </legend>
                  <div className="input">
                    <div className="pill">CAD$</div>
                    <input
                      id="option_NxP68JiGajkgCRohWGNmOg==_price_diff"
                      type="text"
                      placeholder="0"
                      defaultValue="0"
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>
                    <label htmlFor="option_NxP68JiGajkgCRohWGNmOg==_qty">Quantity</label>
                  </legend>
                  <input id="option_NxP68JiGajkgCRohWGNmOg==_qty" placeholder="∞" type="text" defaultValue="" />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="primary" type="button">
            <span className="icon icon-plus-circle"></span>Add version
          </button>
        </div>
      </section>
      <section className="input-group settings-group">
        <h2>Settings</h2>
        <fieldset>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" />
                Limit product sales
              </label>
            </summary>
            <div className="dropdown">
              <fieldset>
                <legend>
                  <label className="top-level-label" htmlFor=":ro:">
                    Maximum number of purchases
                  </label>
                </legend>
                <span className="has-tooltip bottom">
                  <span aria-describedby=":rr:" style={{ display: 'contents' }}>
                    <input id=":ro:" className="full-width" type="text" placeholder="∞" defaultValue="" />
                  </span>
                  <span role="tooltip" id=":rr:">
                    Total sales
                  </span>
                </span>
              </fieldset>
            </div>
          </details>
          <label>
            <input type="checkbox" role="switch" />
            Allow customers to choose a quantity
          </label>
          <label>
            <input type="checkbox" role="switch" />
            Publicly show the number of sales on your product page
          </label>
          <label>
            <input type="checkbox" role="switch" />
            Mark product as e-publication for VAT purposes
            <a
              href="/help/vat#EPublications"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more"
              style={{ flexShrink: 0 }}
            >
              Learn more
            </a>
          </label>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" />
                Specify a refund policy for this product
                <a href="https://help.gumroad.com/article/335-custom-refund-policy">Learn more</a>
              </label>
            </summary>
            <div className="dropdown paragraphs">
              <fieldset>
                <legend>
                  <label htmlFor=":rt:-refund-policy-title">Refund policy</label>
                </legend>
                <input
                  id=":rt:-refund-policy-title"
                  maxLength={50}
                  type="text"
                  placeholder="30-day money back guarantee"
                  defaultValue=""
                />
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor=":rt:-refund-policy-fine-print">Fine print (optional)</label>
                </legend>
                <textarea id=":rt:-refund-policy-fine-print" maxLength={3000} rows={10}></textarea>
              </fieldset>
            </div>
          </details>
        </fieldset>
      </section>
    </>
  );
}

export default Sections;
