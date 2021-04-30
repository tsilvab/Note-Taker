// DEPENDENCIES
const express = require('express');
const path = require ('path');
const fs = ('fs');

// CREATING "EXPRESS" SERVER
const app = express();
const PORT = process.env.PORT || 3000;

// PARSING DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (express.static(__dirname));
// ROUTER
require('./route/apiRoute')(app);

//LISTENER
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
