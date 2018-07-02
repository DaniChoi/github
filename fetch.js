const fetch = require('node-fetch');

fetch('http://a90ffd46.ngrok.io/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
