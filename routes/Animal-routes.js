const express = require('express');
const router = express.Router();

const AnimalController = require('../controllers/Animalcontroller');

// Listar todos los animales, también se puede filtrar por tipo
router.get('/animales', AnimalController.listarAnimales);

// Obtener un animal por nombre
router.get('/animales/nombre/:nombre', AnimalController.getAnimal);
//por jaula
router.get('/animales/jaula/:jaula', AnimalController.getJaula);
module.exports = router;
