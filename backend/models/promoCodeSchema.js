import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
    promocode: {
        type: String,
        unique: true
    },
}, { timestamps: true })

promocodeSchema.pre('save', function (next) {
    this.promocode = this.promocode.toLowerCase().trim();
    next();
});

const Promocode = mongoose.model('Promocode', promocodeSchema);

export default Promocode;