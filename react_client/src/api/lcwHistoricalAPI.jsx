// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

/**
 * POST request to retrieve the LiveCoinWatch 'resource: /coin/single'
 */
const lcwSingleHistory = async (
  code = 'BTC',
  start = 1698884890423,
  end = 1698971290423
) => {
  try {
    const response = await fetch(
      new Request('https://api.livecoinwatch.com/coins/single/history'),
      {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'x-api-key': import.meta.env.VITE_COINWATCH_API_KEY,
        }),
        body: JSON.stringify({
          currency: 'USD',
          code: code,
          start: start,
          end: end,
          meta: true,
        }),
      }
    );

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const data = isJson && (await response.json());

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      throw error;
    }

    return data;
  } catch (err) {
    console.error('LiveCoinWatch Post Error:', err);
    throw err;
  }
};

export default lcwSingleHistory;
