const Animal = require('../models/Animal');
const Animaljson = require('../data/Zoo.json');

// Listar todos los animales (con filtro opcional por tipo)
exports.listarAnimales = async (req, res) => {
    const animales = [];
    const filtroTipo = req.query.tipo;

    for (let i = 0; i < Animaljson.length; i++) {
        const animalInstance = new Animal(
            Animaljson[i].nombre,
            Animaljson[i].edad,
            Animaljson[i].tipo,
            Animaljson[i].peso,
            Animaljson[i].altura,
            Animaljson[i].jaula
        );

        if (!filtroTipo || animalInstance.tipo === filtroTipo) {
            animales.push(animalInstance);
        }
    }

    res.json(animales);
};

// Obtener un animal por nombre
exports.getAnimal = async (req, res) => {
    const nombre = req.params.nombre;

    const animalData = Animaljson.find(
        a => a.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (!animalData) {
        return res.status(404).json({ error: 'Animal no encontrado' });
    }

    const animal = new Animal(
        animalData.nombre,
        animalData.edad,
        animalData.tipo,
        animalData.peso,
        animalData.altura,
        animalData.jaula
    );

    res.json(animal);
};
