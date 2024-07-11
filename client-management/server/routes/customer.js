const express = require('express');
const db = require('../models');
const auth = require('../middlewares/Auth');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
    const { name, email, mobile, country, state, city } = req.body;

    const customer = await db.Customer.create({ name, email, mobile, country, state, city });
    res.json(customer);
});

router.get('/', async (req, res) => {
    const customers = await db.Customer.findAll();
    res.json(customers);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, country, state, city } = req.body;

    const customer = await db.Customer.update(
        { name, email, mobile, country, state, city },
        { where: { id } }
    );
    res.json(customer);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.Customer.destroy({ where: { id } });
    res.json({ message: 'Customer removed' });
});

module.exports = router;
