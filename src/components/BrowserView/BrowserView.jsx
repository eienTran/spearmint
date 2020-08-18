import React, { useContext } from 'react';
import styles from './BrowserView.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setProjectUrl } from '../../context/actions/globalActions';

const BrowserView = () => {
  const [{ url }, dispatchToGlobal] = useContext(GlobalContext);

  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    }
    if (url.startsWith('localhost')) {
      url = 'http://' + url;
      return url;
    }
    url = 'https://' + url;
    return url;
  };

  const handleChangeUrl = (e) => {
    const testSiteURL = addHttps(e.target.value);
    dispatchToGlobal(setProjectUrl(testSiteURL));
  };

  return (
    <>
      <input
        id={styles.browserAddress}
        placeholder='  Enter a new URL'
        type='text'
        onChange={handleChangeUrl}
      />
      <webview id={styles.browserView} src={url} />
    </>
  );
};

export default BrowserView;
