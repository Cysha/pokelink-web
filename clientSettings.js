let params = new URLSearchParams(document.location.search.substring(1));
var clientSettings = {
  currentUser: params.get('user'),
  server: params.get('server') || 'http://localhost',
  port: params.get('port') || 3000,
};
