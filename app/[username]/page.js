"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/app/action/useraction'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Username = ({ params }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [payments, setPayments] = useState([])
    const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' })
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getUsername = async () => {
            const resolvedParams = await params
            console.log("Resolved params:", resolvedParams)
            setUsername(resolvedParams.username)
        }
        getUsername()
    }, [params])

    useEffect(() => {
        if (username) {
            console.log("Fetching data for username:", username)
            getData()
        }
    }, [username])

    const getData = async () => {
        try {
            setLoading(true)
            setError(null)
            
            console.log("Calling fetchuser with:", username)
            let u = await fetchuser(username)
            console.log("User data received:", u)
            
            // Check if user exists
            if (!u || (!u.username && !u.email)) {
                setError("User not found")
                setLoading(false)
                return
            }
            
            setUserData(u)
            
            console.log("Calling fetchpayments")
            let p = await fetchpayments(username)
            console.log("Payments received:", p)
            setPayments(p)
            
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setError("Failed to load user data")
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }

    const handlePay = async (amount) => {
        if (!paymentForm.name || !paymentForm.message) {
            toast.error('Please enter your name and message', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
            return
        }

        const finalAmount = amount || paymentForm.amount

        if (!finalAmount || finalAmount <= 0) {
            toast.error('Please enter a valid amount', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
            return
        }

        try {
            const amountInPaise = Number(finalAmount) * 100
            
            const order = await initiate(amountInPaise, username, paymentForm)
            
            if (order.error) {
                toast.error(order.error, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                })
                return
            }

            const options = {
                key: userData.razorpayid,
                amount: order.amount,
                currency: "INR",
                name: "Get Me a Chai",
                description: "Support your favorite creator",
                order_id: order.id,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: {
                    name: paymentForm.name,
                },
                theme: {
                    color: "#7c3aed"
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            console.error("Payment error:", error)
            toast.error('Payment failed. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <p className="text-xl text-white">Loading...</p>
            </div>
        )
    }

    if (error || !userData) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
                <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
                <p className="text-gray-400 mb-4">The user @{username} doesn't exist.</p>
                <button 
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                    Go Home
                </button>
            </div>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
            
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            <div className="bg-black min-h-screen">
                <div className='cover w-full bg-gradient-to-r from-black to-blue-950 relative'>
                    <img 
                        className='object-cover w-full h-[350px]' 
                        src={userData.coverpic || "https://easydrawingguides.com/wp-content/uploads/2023/08/Low-Res-Goku_goku-drawing-tutorial.png"} 
                        alt="Cover" 
                        onError={(e) => { e.target.src = "https://easydrawingguides.com/wp-content/uploads/2023/08/Low-Res-Goku_goku-drawing-tutorial.png" }}
                    />
                    <div className="pp absolute -bottom-20 right-[46%]">
                        <img 
                            className='rounded-full border-white border-2 bg-gray-800' 
                            width={150} 
                            height={150} 
                            src={userData.profilepic || "https://easydrawingguides.com/wp-content/uploads/2023/08/Low-Res-Goku_goku-drawing-tutorial.png"} 
                            alt="Profile" 
                            onError={(e) => { e.target.src = "https://easydrawingguides.com/wp-content/uploads/2023/08/Low-Res-Goku_goku-drawing-tutorial.png" }}
                        />
                    </div>
                </div>

                <div className="info flex flex-col justify-center gap-1 my-24 items-center text-white">
                    <div className='font-bold text-3xl'>
                        {userData.name || `@${username}`}
                    </div>
                    <div className='text-slate-400'>
                        @{userData.username || username}
                    </div>
                    <div className='text-slate-400'>
                        Creating Amazing Content
                    </div>
                    <div className='text-slate-400'>
                        {payments.length} Supporters
                    </div>
                </div>

                <div className="payment mt-11 w-[80%] mx-auto flex justify-center text-center gap-3">
                    <div className="supporters w-1/2 rounded-lg bg-purple-950 p-10 border-purple-500 border-2">
                        <h2 className='font-bold text-2xl my-3 text-center text-white'>Supporters</h2>
                        <ul className='text-left mx-5'>
                            {payments.length === 0 ? (
                                <li className='my-2 text-center text-slate-400'>No supporters yet. Be the first one!</li>
                            ) : (
                                payments.map((payment, index) => (
                                    <li key={index} className='my-4 flex gap-2 items-center text-white'>
                                        <img src="/avatar.gif" alt="user avatar" width={33} />
                                        <span>
                                            <strong>{payment.name}</strong> donated <strong>${payment.amount}</strong> with message: <em>"{payment.message}"</em>
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="makePayment w-1/2 rounded-lg bg-purple-950 border-purple-500 border-2 p-10">
                        <h2 className='font-bold my-3 text-2xl text-center text-white'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            <input 
                                type="text" 
                                name="name"
                                value={paymentForm.name}
                                onChange={handleChange}
                                className='w-full p-3 rounded-lg bg-slate-800 text-white' 
                                placeholder='Your Name' 
                            />

                            <input 
                                type="text" 
                                name="message"
                                value={paymentForm.message}
                                onChange={handleChange}
                                className='w-full p-3 rounded-lg bg-slate-800 text-white' 
                                placeholder='Message' 
                            />
                            
                            <input
                                type="number"
                                name="amount"
                                value={paymentForm.amount}
                                onChange={handleChange}
                                placeholder='Enter Amount'
                                className='w-full p-3 rounded-lg bg-slate-800 text-white'
                            />
                            
                            <button 
                                onClick={() => handlePay()}
                                className='bg-gradient-to-r from-purple-700 to-purple-600 p-3 rounded-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-lg transition-all duration-300 font-semibold text-white'
                            >
                                Pay
                            </button>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400 my-3'>Or choose from these amounts</p>
                            <div className='flex gap-3 justify-center flex-wrap'>
                                <button 
                                    onClick={() => handlePay(5)}
                                    className='bg-gradient-to-r from-purple-700 to-purple-600 px-5 py-3 rounded-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-lg transition-all duration-300 text-white'
                                >
                                    $5💵
                                </button>
                                <button 
                                    onClick={() => handlePay(10)}
                                    className='bg-gradient-to-r from-purple-700 to-purple-600 px-5 py-3 rounded-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-lg transition-all duration-300 text-white'
                                >
                                    $10💵
                                </button>
                                <button 
                                    onClick={() => handlePay(20)}
                                    className='bg-gradient-to-r from-purple-700 to-purple-600 px-5 py-3 rounded-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-lg transition-all duration-300 text-white'
                                >
                                    $20💵
                                </button>
                                <button 
                                    onClick={() => handlePay(50)}
                                    className='bg-gradient-to-r from-purple-700 to-purple-600 px-5 py-3 rounded-lg hover:from-purple-600 hover:to-purple-500 hover:shadow-lg transition-all duration-300 text-white'
                                >
                                    $50💵
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Username