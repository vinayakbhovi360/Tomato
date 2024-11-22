import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frountend



const placeOrder = async (req, res) => {
    // const frountend_url = "http://localhost:5173"
    const frountend_url = process.env.FRONTEND_URL;

    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Map items to Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Convert rupees to paise
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 200, // Example delivery charge in rupees converted to paise
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frountend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frountend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Send session URL to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


const verifyOrder = async (req,res) =>{
    const {orderId,success} =req.body;
    console.log(orderId,success)
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"}) 
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// User Order for frountend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
    
}

// Listing order for admin panel
const listOrders = async (req,res)=> {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
        
    }

}

// api for updating order status

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{statusbar:req.body.statusbar})
        res.json({success:true,message:"Status Updated"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
        
    }

}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}