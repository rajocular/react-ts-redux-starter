const path = require('path');
const express = require('express');
const fs = require('fs');

const BUILD_PATH = path.join(__dirname, 'build');

const app = express();
const port = 4000;

const fetchCompressed = (contentType) => (req, res, next) => {
  const acceptedEncodings = req.acceptsEncodings();
  const requestedFile = req.url;

  if (!acceptedEncodings.includes('gzip') || !fs.existsSync(`./build/${requestedFile}.gz`)) {
    next();
    return;
  }

  // update content headers
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);

  req.url = `${requestedFile}.gz`;

  next();
};

app.get('*.js', fetchCompressed('text/javascript'));

app.get('*.css', fetchCompressed('text/css'));

//Serving files from the dist folder
app.use(express.static(BUILD_PATH));

//Send index.html when the user access the web
app.get('*', function (req, res) {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
