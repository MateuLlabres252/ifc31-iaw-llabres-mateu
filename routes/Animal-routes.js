const express = require('express');
const router = express.Router();

const AnimalController = require('../controllers/Animalcontroller');

// Listar todos los animales, también se puede filtrar por tipo 
router.get('/animales', AnimalController.listarAnimales);

// Obtener un animal por nombre
router.get('/animales/:nombre', AnimalController.getAnimal);

router.get('/animales/:id', AnimalController.getJaula);

module.exports = router;
