import React, { CSSProperties } from 'react';
import Select, { ActionMeta, ClearIndicatorProps, DropdownIndicatorProps, OptionProps } from 'react-select';
import { applicationState, setDiscoverTaxonomyId } from './stateStores/application';

function DiscoverSettings() {
  const ClearIndicator = (props: ClearIndicatorProps<{ id: string; label: string }, true>) => {
    const {
      children = <span className="icon icon-solid-x" aria-label="Clear value" role="button"></span>,
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={{ ...(getStyles('clearIndicator', props) as CSSProperties), padding: '0px' }}
      >
        <div style={{ padding: '0px', marginRight: '0.5rem', color: '#000' }}>{children}</div>
      </div>
    );
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<{ id: string; label: string }, true>) => {
    const {
      children = <span className="icon icon-outline-cheveron-down"></span>,
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={{ ...(getStyles('clearIndicator', props) as CSSProperties), padding: '0px' }}
      >
        <div style={{ padding: '0px', color: '#000' }}>{children}</div>
      </div>
    );
  };

  type Option = { id: string; label: string };

  const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    setDiscoverTaxonomyId(option ? option.id : null);
  };

  const option = (baseStyles, props: OptionProps) => {
    if (props.isSelected) {
      return { ...baseStyles, color: 'white', backgroundColor: 'black' };
    } else if (props.isFocused) {
      return { ...baseStyles, color: 'white', backgroundColor: 'grey' };
    } else {
      return { ...baseStyles, color: 'black', backgroundColor: 'white' };
    }
  };

  const defaultValue = () => {
    if (applicationState.ready) {
      const id = applicationState.discoverTaxonomyId;
      return applicationState.discoverTaxonomyOptions.find((el) => el.id === id);
    } else {
      return null;
    }
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Gumroad Discover</h2>
        <a
          className="learn-more not-implemented"
          // href="https://help.gumroad.jacquesdesmarais.dev/article/79-gumroad-discover"
          // target="_blank"
          href="#share"
          rel="noreferrer"
        >
          Learn more
        </a>
      </header>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        Gumroad Discover recommends your products to prospective customers, helping you grow beyond your existing
        following and find even more people who care about your work.{'\n\n'}
        When enabled, the product will also become part of the Gumroad affiliate program.
      </p>
      <fieldset>
        <legend>
          <label htmlFor=":rt:">Category</label>
        </legend>
        <Select
          defaultValue={defaultValue}
          isMulti={false}
          unstyled={false}
          className="combobox"
          classNames={{ control: () => 'input' }}
          styles={{
            control: () => ({}),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              flex: '1 1 0%',
              padding: '0px',
              margin: '0px',
              color: '#000',
            }),
            placeholder: (baseStyles) => ({ ...baseStyles, margin: '0px' }),
            indicatorsContainer: (baseStyles) => ({ ...baseStyles }),
            indicatorSeparator: (baseStyles) => ({ ...baseStyles, width: '' }),
            dropdownIndicator: (baseStyles) => ({ ...baseStyles, padding: 0 }),
            option: option,
          }}
          onChange={onChange}
          options={applicationState.discoverTaxonomyOptions}
          getOptionValue={(option: Option) => option.id}
          getOptionLabel={(option: Option) => option.label}
          placeholder="Begin typing to select a category"
          isClearable={true}
          backspaceRemovesValue={true}
          captureMenuScroll={true}
          openMenuOnFocus={true}
          components={{
            ClearIndicator,
            DropdownIndicator,
          }}
        />
        <small>Select a category to show your product on Gumroad Discover.</small>
      </fieldset>
      <fieldset>
        <legend>
          <label htmlFor=":rv:">Tags</label>
        </legend>
        <Select
          isDisabled={true}
          isMulti={true}
          unstyled={false}
          className="combobox"
          classNames={{ control: () => 'input' }}
          styles={{
            control: () => ({ backgroundColor: 'transparent' }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              flex: '1 1 0%',
              padding: '0px',
              margin: '0px',
              color: '#000',
            }),
            placeholder: (baseStyles) => ({ ...baseStyles, margin: '0px' }),
            indicatorsContainer: (baseStyles) => ({ ...baseStyles, display: 'none' }),
          }}
          getOptionValue={(option: Option) => option.id}
          getOptionLabel={(option: Option) => option.label}
          placeholder="Begin typing to add a tag..."
          isClearable={false}
          backspaceRemovesValue={true}
          captureMenuScroll={true}
          openMenuOnFocus={false}
        />
      </fieldset>
      <div className="settings-group">
        <fieldset>
          <label>
            <input type="checkbox" role="switch" disabled={true} />
            Display your product's 1-5 star rating to prospective customers
          </label>
          <label>
            <input type="checkbox" role="switch" disabled={true} />
            This product contains content meant only for adults, including the preview
          </label>
          <details className="toggle">
            <summary>
              <label>
                <input type="checkbox" role="switch" disabled={true} />
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
