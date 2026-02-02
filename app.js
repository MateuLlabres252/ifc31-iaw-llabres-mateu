const express = require('express');
const app = express();

const AnimalRouter = require('./routes/Animal-routes');

app.use(express.json());
app.use('/api', AnimalRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
