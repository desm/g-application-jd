import * as React from 'react';

function DiscoverSettings() {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Gumroad Discover</h2>
        <a
          className="learn-more"
          href="https://help.gumroad.jacquesdesmarais.dev/article/79-gumroad-discover"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </header>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        Gumroad Discover recommends your products to prospective customers, helping you grow beyond your existing
        following and find even more people who care about your work. When enabled, the product will also become part of
        the Gumroad affiliate program.
      </p>
      <fieldset>
        <legend>
          <label htmlFor=":rt:">Category</label>
        </legend>
        <div className="combobox css-b62m3t-container">
          <span id="react-select-:rt:-live-region" className="css-7pg0cj-a11yText"></span>
          <span
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions text"
            role="log"
            className="css-7pg0cj-a11yText"
          ></span>
          <div className="input css-0">
            <div className="css-15pp9oa">
              <div className="css-1yh68ch-singleValue">
                <span>
                  <em></em>Other
                </span>
              </div>
              <div className="css-1kc4aue" data-value="">
                <input
                  className=""
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  id=":rt:"
                  spellCheck="false"
                  type="text"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  role="combobox"
                  aria-owns=":ru:"
                  aria-controls=":ru:"
                  defaultValue=""
                  style={{
                    color: 'inherit',
                    background: '0px center',
                    opacity: 1,
                    width: '100%',
                    gridArea: '1 / 2',
                    font: 'inherit',
                    minWidth: '2px',
                    border: '0px',
                    margin: '0px',
                    outline: '0px',
                    padding: '0px',
                  }}
                />
              </div>
            </div>
            <div className="css-1obf64m">
              <div className="css-0" aria-hidden="true">
                <span className="icon icon-solid-x" aria-label="Clear value" role="button"></span>
              </div>
              <div className="css-0" aria-hidden="true">
                <span className="icon icon-outline-cheveron-down"></span>
              </div>
            </div>
          </div>
        </div>
        <small>Select a category to show your product on Gumroad Discover.</small>
      </fieldset>
      <fieldset>
        <legend>
          <label htmlFor=":rv:">Tags</label>
        </legend>
        <div className="combobox discover-tags css-b62m3t-container">
          <span id="react-select-:rv:-live-region" className="css-7pg0cj-a11yText"></span>
          <span
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions text"
            role="log"
            className="css-7pg0cj-a11yText"
          ></span>
          <div className="input css-0">
            <div className="css-15pp9oa">
              <div className="css-1bkpx9o-placeholder" id="react-select-:rv:-placeholder">
                Begin typing to add a tag...
              </div>
              <div className="css-1kc4aue" data-value="">
                <input
                  className=""
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  id=":rv:"
                  spellCheck="false"
                  type="text"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  role="combobox"
                  aria-describedby="react-select-:rv:-placeholder"
                  aria-owns=":r10:"
                  aria-controls=":r10:"
                  maxLength={20}
                  defaultValue=""
                  style={{
                    color: 'inherit',
                    background: '0px center',
                    opacity: 1,
                    width: '100%',
                    gridArea: '1 / 2',
                    font: 'inherit',
                    minWidth: '2px',
                    border: '0px',
                    margin: '0px',
                    outline: '0px',
                    padding: '0px',
                  }}
                />
              </div>
            </div>
            <div className="css-1obf64m"></div>
          </div>
        </div>
      </fieldset>
      <div className="settings-group">
        <fieldset>
          <label>
            <input type="checkbox" role="switch" checked={true} />
            Display your product's 1-5 star rating to prospective customers
          </label>
          <label>
            <input type="checkbox" role="switch" />
            This product contains content meant only for adults, including the preview
          </label>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" />
                Boost your product's visibility in Gumroad recommendations
              </label>
            </summary>
            <div className="dropdown paragraphs">
              Increase your product visibility by setting a higher fee. The higher the fee the better the boost.
              <fieldset className="danger">
                <legend>
                  <label htmlFor=":rs:">Gumroad Fee</label>
                </legend>
                <div className="input">
                  <div className="pill">%</div>
                  <input type="number" id=":rs:" min="30" max="100" defaultValue="10" />
                </div>
                <small>Please enter a value between 30 and 100.</small>
              </fieldset>
            </div>
          </details>
        </fieldset>
      </div>
    </>
  );
}

export default DiscoverSettings;
