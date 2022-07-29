let userToken = sessionStorage.getItem('userToken');

if (!userToken) {
  window.location.replace('../..');
}
