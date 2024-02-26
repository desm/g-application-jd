// ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function dofetch() {
  const response = await fetch('http://example.com/movies.json');
  const data = await response.json();
  console.log(data);
}
