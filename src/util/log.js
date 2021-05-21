export function requestErrorLog(err) {
  if (err.response) {
    console.log('data:', err.response.data);
    console.log('status:', err.response.status);
    console.log('header:', err.response.header);
  } else if (err.request) {
    console.log('err.request:', err.request);
  } else {
    console.log('Error:', err.message);
  }
}
