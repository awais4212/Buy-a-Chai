"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import {fetchuser, updateProfile} from '@/app/action/useraction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'

const Dashboard = () => {
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
        console.log("Session status:", status)
        console.log("Session data:", session)
        
        if (status === 'loading') {
            return // Still loading
        }
        
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
            console.log("getData called with session:", session)
            setLoading(true)
            
            if (!session?.user?.email) {
                console.error("No email in session")
                return
            }

            console.log("Fetching user with email:", session.user.email)
            let u = await fetchuser(session.user.email)
            console.log("Fetched user data:", u)
            
            // Update form with fetched data
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
            
            // Use the current username or email as identifier
            const oldUsername = form.username || form.email
            
            console.log("Submitting form with data:", formData)
            console.log("Old username:", oldUsername)
            
            const result = await updateProfile(formData, oldUsername)
            
            if (result?.error) {
                toast.error(result.error, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                })
            } else {
                toast.success('Profile Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                })
                
                // Refresh the data
                await getData()
            }
        } catch (error) {
            console.error("Update error:", error)
            toast.error('Failed to update profile', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            })
        }
    }

    if (status === 'loading' || loading) {
        return (
            <div className='container mx-auto py-5 px-6 text-center'>
                <p className="text-xl">Loading...</p>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return null // Will redirect
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <div className='container mx-auto py-5 px-6'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input 
                            value={form.name} 
                            onChange={handleChange} 
                            type="text" 
                            name='name' 
                            id="name" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input 
                            value={form.email} 
                            onChange={handleChange} 
                            type="email" 
                            name='email' 
                            id="email" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                            value={form.username} 
                            onChange={handleChange} 
                            type="text" 
                            name='username' 
                            id="username" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture URL</label>
                        <input 
                            value={form.profilepic} 
                            onChange={handleChange} 
                            type="text" 
                            name='profilepic' 
                            id="profilepic" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture URL</label>
                        <input 
                            value={form.coverpic} 
                            onChange={handleChange} 
                            type="text" 
                            name='coverpic' 
                            id="coverpic" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input 
                            value={form.razorpayid} 
                            onChange={handleChange} 
                            type="text" 
                            name='razorpayid' 
                            id="razorpayid" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input 
                            value={form.razorpaysecret} 
                            onChange={handleChange} 
                            type="password"
                            name='razorpaysecret' 
                            id="razorpaysecret" 
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                    </div>

                    <div className="my-6">
                        <button 
                            type="submit" 
                            className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard