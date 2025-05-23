const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: 'Inscription réussie' });
    } catch (err) {
        res.status(400).json({ error: 'Erreur d’inscription' });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

module.exports = router;
