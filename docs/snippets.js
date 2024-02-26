/*
 * in order to reproduce a particular request
 * open Developer Tools in browser
 * go to Network tab
 * right-click the request
 * do a "Copy as fetch"
 * replace the "fetch" call in the "dofetch function below"
 */

async function dofetch() {
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('http://example.com/movies.json');
  const data = await response.json();
  console.log(data);
}

/**
 * Example using "fetch" to do a POST
 */
fetch("https://app.gumroad.com/links", {
  "headers": {
    "accept": "application/json, text/html",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Brave\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-csrf-token": "KzxOkpPi7X3hjoL_pdZHbP5liFJXCd9f2URBfO5c5mKvR3SqoQDxiUhXawBbfaZfrkNmZ6HrjqhlTj8o1s_dgQ"
  },
  "referrer": "https://app.gumroad.com/products/new",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"link\":{\"is_physical\":false,\"is_recurring_billing\":false,\"name\":\"Hey\",\"native_type\":\"digital\",\"price_currency_type\":\"cad\",\"price_range\":\"123\",\"release_at_date\":\"March 26, 2024\",\"release_at_time\":\"12PM\",\"subscription_duration\":null}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
