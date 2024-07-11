const express = require('express');
const db = require('../models');
const auth = require('../middlewares/Auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
    const { name, email, mobile, address, subscriptionStartDate, subscriptionEndDate, password } = req.body;

    if (new Date(subscriptionStartDate) >= new Date(subscriptionEndDate)) {
        return res.status(400).json({ message: 'Start date should be smaller than end date' });
    }

    const client = await db.Client.create({ name, email, mobile, address, subscriptionStartDate, subscriptionEndDate, password });
    res.json(client);
});

router.get('/', async (req, res) => {
    const clients = await db.Client.findAll();
    res.json(clients);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, address, subscriptionStartDate, subscriptionEndDate, password } = req.body;

    if (new Date(subscriptionStartDate) >= new Date(subscriptionEndDate)) {
        return res.status(400).json({ message: 'Start date should be smaller than end date' });
    }

    const client = await db.Client.update(
        { name, email, mobile, address, subscriptionStartDate, subscriptionEndDate, password },
        { where: { id } }
    );
    res.json(client);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.Client.destroy({ where: { id } });
    res.json({ message: 'Client removed' });
});

module.exports = router;
