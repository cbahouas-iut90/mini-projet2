require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/protected'));

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
});
