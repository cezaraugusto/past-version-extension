import('./banner.css')
import * as React from 'react';

export default function Banner() {
  const [close, setClose] = React.useState(false);

  const onClickCheckSavedVersion = () => {
    chrome.runtime.sendMessage({ authorizeRedirect: true });
  };

  const onClickClose = () => {
    setClose(true);
  };

  if (close) return null;

  return (
    <div className="wayback-machine-banner">
      <div>
        Past Version
      </div>
      <div>
        <strong>{chrome.i18n.getMessage('bannerText')}</strong>
        <span>{chrome.i18n.getMessage('bannerTextDescription')}</span>
      </div>
      <div>
        <button
          onClick={onClickCheckSavedVersion}
          className="button-action"
        >
          {chrome.i18n.getMessage('bannerButton')}
        </button>
        <button
          onClick={onClickClose}
          className="button-close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
