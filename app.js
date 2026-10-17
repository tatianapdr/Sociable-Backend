// Imports --------------------------------------------
import express from 'express';
import cors from 'cors';
import database from './database.js';
import Controller from './controllers/Controller.js';

import universitiesModel from './models/universities-model.js';

// Configure express app ------------------------------
const app = new express();

// Configure middleware -------------------------------
app.use(cors());
app.use(express.json());

// Controllers ----------------------------------------
const universitiesController = new Controller(universitiesModel, database);

// Endpoints ------------------------------------------
const addCrudRoutes = (path, controller) => {
  app.get(`/api/${path}`, (req, res) => controller.get(req, res, null));
  app.get(`/api/${path}/:id`, (req, res) => controller.get(req, res, 'primary'));
  app.post(`/api/${path}`, controller.post);
  app.put(`/api/${path}/:id`, controller.put);
  app.delete(`/api/${path}/:id`, controller.delete);
};

addCrudRoutes('universities', universitiesController);

// Start server ---------------------------------------
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
