const express = require('express');

const Countries = require('../countries/CountriesModel');

const server = express();

server.use(express.json());

server.post('/countries', (req, res) => {
  Countries.insert(req.body)
    .then(country => {
      res.status(201).json(country);
    })
    .catch(error => {
      const err = {
        message: error.message,
        stack: error.stack,
      };
      res.status(500).json(err);
    });
});

server.delete('/countries/:id', (req, res) => {
  Countries.delete(req.params.id)
    .then(count => {
      res.status(200).json({ message: `${count} country deleted`});
    })
    .catch(error => {
      const err = {
        message: error.message,
        stack: error.stack,
      };
      res.status(500).json(err);
    });
});

module.exports = server;
