// Imports --------------------------------------------
import express from 'express';
import cors from 'cors';
import database from './database.js';
import Controller from './controllers/Controller.js';

import universitiesModel from './models/universities-model.js';
import studentsModel from './models/students-model.js';
import societiesModel from './models/societies-model.js';
import eventsModel from './models/events-model.js';

// Configure express app ------------------------------
const app = new express();

// Configure middleware -------------------------------
app.use(cors());
app.use(express.json());

// Controllers ----------------------------------------
const universitiesController = new Controller(universitiesModel, database);
const studentsController = new Controller(studentsModel, database);
const societiesController = new Controller(societiesModel, database);
const eventsController = new Controller(eventsModel, database);

// Endpoints ------------------------------------------
const addCrudRoutes = (path, controller) => {
  app.get(`/api/${path}`, (req, res) => controller.get(req, res, null));
  app.get(`/api/${path}/:id`, (req, res) => controller.get(req, res, 'primary'));
  app.post(`/api/${path}`, controller.post);
  app.put(`/api/${path}/:id`, controller.put);
  app.delete(`/api/${path}/:id`, controller.delete);
};

addCrudRoutes('universities', universitiesController);
addCrudRoutes('students', studentsController);
addCrudRoutes('societies', societiesController);
addCrudRoutes('events', eventsController);

// Start server ---------------------------------------
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
