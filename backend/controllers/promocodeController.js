import Promocode from "../models/promoCodeSchema.js";

export const createPromocode = async (req, res) => {
    try {
        const { promocode } = req.body;

        const existingPromocode = await Promocode.findOne({});
        if (existingPromocode) {
            return res.status(400).json({ error: 'A promocode already exists. Delete the existing promocode before adding a new one.' });
        }
        const newPromocode = new Promocode({ promocode });
        await newPromocode.save();

        res.status(201).json(newPromocode);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create promocode' });
    }
};

export const getAllPromocodes = async (req, res) => {
    try {
        const promocodes = await Promocode.find();
        res.json(promocodes);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch promocodes' });
    }
};

export const deletePromocode = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPromocode = await Promocode.findByIdAndDelete(id);
        if (!deletedPromocode) {
            return res.status(404).json({ error: 'Promocode not found' });
        }
        res.json({ message: 'Promocode deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete promocode' });
    }
};