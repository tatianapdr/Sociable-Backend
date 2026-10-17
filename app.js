// Imports --------------------------------------------
import express from 'express';

// Configure express app ------------------------------
const app = new express();

// Configure middleware -------------------------------
// Controllers ----------------------------------------
// Endpoints ------------------------------------------
// Start server ---------------------------------------
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
