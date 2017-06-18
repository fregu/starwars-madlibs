import fetch from 'isomorphic-fetch';

// REST fetch helper, making a promised request to any specified URL, and buildning
// query parameters of options objects string values.
// Chainable or use a callback with your prepared json
export default function requestAPI (url, options = {}, callback) {
  let queryString = Object.keys(options).reduce((string, key) => {
    let value = options[key];

    if (typeof value === 'string') {
      return `${string}${string === '' ? '?' : '&'}${key}=${value}`;
    }
    return string;
  }, '');

  const xhr = fetch(url + queryString).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });

  if (typeof callback === 'function') {
    xhr.then(callback);
  }

  return xhr;
}
