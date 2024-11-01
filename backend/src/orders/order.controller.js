const Order = require("./order.model")
const createOrder = async(req,res) =>{
    try {
        const newOrder = await Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.log("Error creating order",error)
        res.status(500).json({message:"Error creating order"})
    }
}

const getOrderByEmail = async(req,res)=> {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createAt: -1});
        if(!orders){
            return res.status(404).json({message:"No orders found"})

        }
        res.status(200).json(orders)
    } catch (error) {
        console.log("Error getting order",error)
        res.status(500).json({message:"Error getting order"})
        
    }
}


module.exports ={
    createOrder,
    getOrderByEmail,
}
