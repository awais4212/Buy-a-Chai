"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import {fetchuser, updateProfile} from '@/app/action/useraction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'

const Settings = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        profilepic: '',
        coverpic: '',
        razorpayid: '',
        razorpaysecret: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'loading') return
        
        if (status === 'unauthenticated' || !session) {
            router.push('/login')
            return
        }
        
        if (status === 'authenticated' && session) {
            getData()
        }
    }, [session, status, router])

    const getData = async () => {
        try {
            setLoading(true)
            
            if (!session?.user?.email) {
                console.error("No email in session")
                return
            }

            let u = await fetchuser(session.user.email)
            console.log("Fetched user data:", u)
            
            setForm({
                name: u.name || session.user.name || '',
                email: u.email || session.user.email || '',
                username: u.username || '',
                profilepic: u.profilepic || '',
                coverpic: u.coverpic || '',
                razorpayid: u.razorpayid || '',
                razorpaysecret: u.razorpaysecret || ''
            })
            
            setLoading(false)
        } catch (error) {
            console.error("Error in getData:", error)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const formData = new FormData(e.target)
            const oldUsername = form.username || form.email
            
            const result = await updateProfile(formData, oldUsername)
            
            if (result?.error) {
                toast.error(result.error, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                })
            } else {
                toast.success('Profile Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                    transition: Bounce,
                })
                await getData()
            }
        } catch (error) {
            console.error("Update error:", error)
            toast.error('Failed to update profile', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            })
        }
    }

    if (status === 'loading' || loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className="text-xl">Loading...</p>
            </div>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="dark"
            />
            
            <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
                {/* Header with preview */}
                <div className='cover w-full bg-gradient-to-r from-black to-blue-950 relative h-64'>
                    <img 
                        className='object-cover w-full h-64 opacity-50' 
                        src={form.coverpic || "/cover2.jpg"} 
                        alt="Cover Preview" 
                    />
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <img 
                            className='rounded-full border-white border-4 bg-gray-800' 
                            width={120} 
                            height={120} 
                            src={form.profilepic || "/pp.png"} 
                            alt="Profile Preview" 
                        />
                    </div>
                </div>

                <div className='container mx-auto py-20 px-6'>
                    <h1 className='text-center my-5 text-3xl font-bold'>Settings</h1>
                    <p className='text-center text-gray-400 mb-8'>Update your profile information</p>

                    <form className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 shadow-xl" onSubmit={handleSubmit}>

                        <div className='my-4'>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
                            <input 
                                value={form.name} 
                                onChange={handleChange} 
                                type="text" 
                                name='name' 
                                id="name" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="my-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                            <input 
                                value={form.email} 
                                onChange={handleChange} 
                                type="email" 
                                name='email' 
                                id="email" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className='my-4'>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                            <input 
                                value={form.username} 
                                onChange={handleChange} 
                                type="text" 
                                name='username' 
                                id="username" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="username"
                            />
                            <p className="text-xs text-gray-400 mt-1">Your profile will be at: localhost:3000/{form.username || 'username'}</p>
                        </div>

                        <div className="my-4">
                            <label htmlFor="profilepic" className="block mb-2 text-sm font-medium">Profile Picture URL</label>
                            <input 
                                value={form.profilepic} 
                                onChange={handleChange} 
                                type="text" 
                                name='profilepic' 
                                id="profilepic" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="https://example.com/profile.jpg"
                            />
                        </div>

                        <div className="my-4">
                            <label htmlFor="coverpic" className="block mb-2 text-sm font-medium">Cover Picture URL</label>
                            <input 
                                value={form.coverpic} 
                                onChange={handleChange} 
                                type="text" 
                                name='coverpic' 
                                id="coverpic" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="https://example.com/cover.jpg"
                            />
                        </div>

                        <div className="my-4">
                            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium">Razorpay Key ID</label>
                            <input 
                                value={form.razorpayid} 
                                onChange={handleChange} 
                                type="text" 
                                name='razorpayid' 
                                id="razorpayid" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="rzp_test_..."
                            />
                        </div>

                        <div className="my-4">
                            <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium">Razorpay Secret</label>
                            <input 
                                value={form.razorpaysecret} 
                                onChange={handleChange} 
                                type="password"
                                name='razorpaysecret' 
                                id="razorpaysecret" 
                                className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-purple-500 focus:border-purple-500" 
                                placeholder="Your Razorpay secret"
                            />
                        </div>

                        <div className="my-6">
                            <button 
                                type="submit" 
                                className="block w-full p-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold text-sm transition-all shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Settings