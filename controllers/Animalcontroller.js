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

// Obtener un animal por nombre (sin usar .find)
exports.getAnimal = async (req, res) => {
    // 1. Capturamos el nombre de los parámetros de la URL
    const nombreBuscado = req.params.nombre;

    // 2. Recorremos el JSON con un bucle for
    for (let i = 0; i < Animaljson.length; i++) {
        // 3. Comparamos el nombre en minúsculas para que no importe si escriben "Panda" o "panda"
        if (Animaljson[i].nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            
            // 4. Si hay coincidencia, creamos la instancia basada en el modelo Animal
            let animalInstance = new Animal(
                Animaljson[i].nombre,
                Animaljson[i].edad,
                Animaljson[i].tipo,
                Animaljson[i].peso,
                Animaljson[i].altura,
                Animaljson[i].jaula
            );

            // 5. Respondemos con el animal encontrado y cortamos la ejecución
            return res.json(animalInstance);
        }
    }

    // 6. Si el bucle termina y no se encontró el nombre, enviamos el error 404
    return res.status(404).json({ error: 'Animal no encontrado' });
};

// Obtener un animal por jaula (estilo bucle for)
exports.getJaula = async (req, res) => {
    // 1. Convertimos el parámetro de la URL a número entero
    const jaulaId = parseInt(req.params.jaula);

    // 2. Recorremos el JSON con un bucle for
    for (let i = 0; i < Animaljson.length; i++) {
        // 3. Si encontramos la jaula que coincide
        if (Animaljson[i].jaula === jaulaId) {
            // 4. Creamos la instancia usando el modelo Animal
            let animalInstance = new Animal(
                Animaljson[i].nombre,
                Animaljson[i].edad,
                Animaljson[i].tipo,
                Animaljson[i].peso,
                Animaljson[i].altura,
                Animaljson[i].jaula
            );
            
            // 5. Devolvemos el animal y cortamos la ejecución de la función
            return res.json(animalInstance);
        }
    }

    // 6. Si termina el bucle y no se encontró nada, enviamos el error 404
    return res.status(404).json({ message: 'Animal no encontrado en la jaula especificada' });
};
