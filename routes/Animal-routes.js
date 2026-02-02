const express = require('express');
const router = express.Router();

const AnimalController = require('../controllers/Animalcontroller');

// Listar todos los animales
router.get('/animales', AnimalController.listarAnimales);

// Obtener un animal por nombre
router.get('/animales/:nombre', AnimalController.getAnimal);

module.exports = router;
