import * as React from 'react';

function DiscoverSettings() {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Gumroad Discover</h2>
        <a
          className="learn-more"
          href="https://help.gumroad.com/article/79-gumroad-discover"
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
          <label htmlFor=":r17:">Category</label>
        </legend>
        <div className="combobox css-b62m3t-container">
          <span id="react-select-:r17:-live-region" className="css-7pg0cj-a11yText"></span>
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
                  id=":r17:"
                  spellCheck="false"
                  tabIndex={-1}
                  type="text"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  role="combobox"
                  aria-owns=":r18:"
                  aria-controls=":r18:"
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
          <label htmlFor=":r19:">Tags</label>
        </legend>
        <div className="combobox discover-tags css-b62m3t-container">
          <span id="react-select-:r19:-live-region" className="css-7pg0cj-a11yText"></span>
          <span
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions text"
            role="log"
            className="css-7pg0cj-a11yText"
          ></span>
          <div className="input css-0">
            <div className="css-15pp9oa">
              <div className="css-1bkpx9o-placeholder" id="react-select-:r19:-placeholder">
                Begin typing to add a tag...
              </div>
              <div className="css-1kc4aue" data-value="">
                <input
                  className=""
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  id=":r19:"
                  spellCheck="false"
                  tabIndex={-1}
                  type="text"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  role="combobox"
                  aria-describedby="react-select-:r19:-placeholder"
                  aria-owns=":r1a:"
                  aria-controls=":r1a:"
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
            {/* <input type="checkbox" role="switch" checked={false} tabIndex={-1} /> */}
            <input type="checkbox" role="switch" tabIndex={-1} />
            Display your product's 1-5 star rating to prospective customers
          </label>
          <label>
            <input type="checkbox" role="switch" tabIndex={-1} />
            This product contains content meant only for adults, including the preview
          </label>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" tabIndex={-1} />
                Boost your product's visibility in Gumroad recommendations
              </label>
            </summary>
            <div className="dropdown paragraphs">
              Increase your product visibility by setting a higher fee. The higher the fee the better the boost.
              <fieldset className="danger">
                <legend>
                  <label htmlFor=":r16:">Gumroad Fee</label>
                </legend>
                <div className="input">
                  <div className="pill">%</div>
                  <input type="number" id=":r16:" min="30" max="100" defaultValue="10" tabIndex={-1} />
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
