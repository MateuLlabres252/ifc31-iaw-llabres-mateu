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
    const nombreBuscado = req.params.nombre;

    for (let i = 0; i < Animaljson.length; i++) {
        // 3. Comparamos el nombre en minúsculas para que no importe si escriben "Panda" o "panda"
        if (Animaljson[i].nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            
            let animalInstance = new Animal(
                Animaljson[i].nombre,
                Animaljson[i].edad,
                Animaljson[i].tipo,
                Animaljson[i].peso,
                Animaljson[i].altura,
                Animaljson[i].jaula
            );

            return res.json(animalInstance);
        }
    }

    // 6. Si el bucle termina y no se encontró el nombre, enviamos el error 404
    return res.status(404).json({ error: 'Animal no encontrado' });
};

// Obtener un animal por jaula 
exports.getJaula = async (req, res) => {
    const jaulaId = parseInt(req.params.jaula);

    for (let i = 0; i < Animaljson.length; i++) {
        if (Animaljson[i].jaula === jaulaId) {
            let animalInstance = new Animal(
                Animaljson[i].nombre,
                Animaljson[i].edad,
                Animaljson[i].tipo,
                Animaljson[i].peso,
                Animaljson[i].altura,
                Animaljson[i].jaula
            );
            return res.json(animalInstance);
        }
    }
    return res.status(404).json({ message: 'Animal no encontrado en la jaula especificada' });
};
