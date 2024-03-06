import md5 from 'md5';

const API_URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';

const getPasswordHash = () => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return md5(`${PASSWORD}_${timestamp}`);
};

export const makeRequest = async (action, params) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getPasswordHash(),
    },
    body: JSON.stringify({ action, params }),
  });

  if (!response.ok) {
    console.error(`Запрос завершился неудачей со статусом ${response.status}`);
  }

  const result = await response.json();
  return result.result || [];
};

export const getProductList = async (offset, limit, filters) =>
  makeRequest('get_ids', { offset, limit, ...filters });

export const getProductDetails = async (ids) => makeRequest('get_items', { ids });
