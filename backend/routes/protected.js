const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/home', auth, (req, res) => {
    res.json({ message: `Bienvenue, utilisateur ${req.user.id}` });
});

module.exports = router;
