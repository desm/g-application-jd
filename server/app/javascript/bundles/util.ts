function getCSRFToken() {
  const csrfToken = document.querySelector("[name='csrf-token']");
  if (csrfToken) {
    return csrfToken.getAttribute('content');
  } else {
    return null;
  }
}

/**
 * https://bloggie.io/@kinopyo/sending-non-get-requests-with-fetch-javascript-api-in-rails
 *     See section "A note for test env"
 */
const addCSRFTokenIfAvailable = (headers: any) => ({
  ...headers,
  'x-csrf-token': getCSRFToken() !== null ? getCSRFToken() : undefined,
});

export const postJSONTo = async (json: string, path: string) => {
  try {
    const response = await fetch(path, {
      headers: addCSRFTokenIfAvailable({
        'content-type': 'application/json',
      }),
      body: json,
      method: 'POST',
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};