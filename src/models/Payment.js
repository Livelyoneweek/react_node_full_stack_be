const { default: mongoose } = require("mongoose");


const paymentSchema = new mongoose.Schema({

    user: {
        type:Object
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, {timestamps: true} )


const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;