import * as React from 'react';

function ProfileSettings() {
  return (
    <>
      <header>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Profile</h2>
          <a href="https://help.gumroad.jacquesdesmarais.dev/article/124-your-gumroad-profile-page" target="_blank" rel="noreferrer">
            Learn more
          </a>
        </div>
        Choose the sections where you want this product to be displayed on your profile.
      </header>
      <div className="paragraphs">
        <label>
          {/* <input type="checkbox" role="switch" checked={false} tabIndex={-1} /> */}
          <input type="checkbox" role="switch" tabIndex={-1} />
          <div>
            Unnamed section (Default)
            <br />
            <small className="text-muted">Graphic Novel, Another, and 19 others</small>
          </div>
        </label>
        <label>
          {/* <input type="checkbox" role="switch" checked={false} tabIndex={-1} /> */}
          <input type="checkbox" role="switch" tabIndex={-1} />
          <div>
            Unnamed section (Default)
            <br />
            <small className="text-muted">Hey, Hey, and 17 others</small>
          </div>
        </label>
      </div>
    </>
  );
}

export default ProfileSettings;
