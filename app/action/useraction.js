"use server"

import Razorpay from "razorpay"
import Payment from "@/models/payments"
import connectDb from "@/db/connectDB"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    let user = await User.findOne({username: to_username})
    
    if (!user) {
        return { error: "User not found" }
    }
    
    const secret = user.razorpaysecret
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Payment.create({ 
        oid: x.id, 
        amount: amount/100, 
        to_user: to_username, 
        name: paymentform.name, 
        message: paymentform.message 
    })

    return x
}

export const fetchuser = async (identifier) => {
    try {
        console.log("fetchuser called with:", identifier)
        await connectDb()
        console.log("DB connected")
        
        // Try to find user by username first, then by email
        let u = await User.findOne({ 
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        })
        
        console.log("User found:", u)
        
        if (!u) {
            console.log("No user found, returning empty object")
            return {
                name: "",
                email: "",
                username: "",
                profilepic: "",
                coverpic: "",
                razorpayid: "",
                razorpaysecret: ""
            }
        }
        
        let user = u.toObject({ flattenObjectIds: true })
        console.log("Returning user:", user)
        return user
    } catch (error) {
        console.error("ERROR in fetchuser:", error)
        throw error
    }
}

export const fetchpayments = async (username) => {
    await connectDb()
    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    try {
        console.log("updateProfile called")
        console.log("oldusername:", oldusername)
        console.log("data:", data)
        
        await connectDb()
        console.log("DB connected")
        
        let ndata = Object.fromEntries(data)
        console.log("ndata:", ndata)

        // Check if username is being changed
        if (oldusername !== ndata.username) {
            let u = await User.findOne({ username: ndata.username })
            if (u) {
                return { error: "Username already exists" }
            }
            
            // Update user by email (more reliable than username since it can change)
            await User.updateOne({email: ndata.email}, ndata, {upsert: true})
            
            // Update all payments to reflect new username
            await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        }
        else {
            await User.updateOne({email: ndata.email}, ndata, {upsert: true})
        }
        
        console.log("Profile updated successfully")
        return { success: true }
    } catch (error) {
        console.error("ERROR in updateProfile:", error)
        return { success: false, error: error.message }
    }
}