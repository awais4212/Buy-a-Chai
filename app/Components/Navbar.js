"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser } from '@/app/action/useraction'

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (session?.user?.email) {
            getUserData()
        }
    }, [session])

    const getUserData = async () => {
        try {
            const userData = await fetchuser(session.user.email)
            if (userData?.username) {
                setUsername(userData.username)
            }
        } catch (error) {
            console.error("Error fetching username:", error)
        }
    }

    return (
        <div className='sticky top-0 z-50'>
            <nav className='relative flex justify-around p-4 bg-gradient-to-r from-purple-900 to-black items-center h-15'>
                <Link href="/" className='logo font-bold justify-around items-center flex text-lg'>
                    <img src="/tea.gif" width={44} alt="" />
                    <span>Get me a Chai</span>
                </Link>

                <div className='flex gap-5 items-center'>
                    {session && (
                        <div className='relative'>
                            <button 
                                id="dropdownDefaultButton" 
                                onClick={() => setShowDropdown(!showDropdown)}  
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                className="inline-flex items-center justify-center text-white bg-purple-600 border border-transparent hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none" 
                                type="button"
                            >
                                Welcome {session.user.name || session.user.email}
                                <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div 
                                    className="absolute right-0 top-full mt-2 z-100 bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-48"
                                >
                                    <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <Link 
                                                href="/dashboard" 
                                                className="block px-4 py-2 hover:bg-purple-700 transition-colors"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href={username ? `/${username}` : '/dashboard'} 
                                                className="block px-4 py-2 hover:bg-purple-700 transition-colors"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Your Page
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <button 
                                                onClick={() => {
                                                    setShowDropdown(false)
                                                    signOut()
                                                }} 
                                                className="block w-full text-left px-4 py-2 hover:bg-purple-700 transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {!session && (
                        <Link href="/login">
                            <button className='relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 bg-purple-600 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95'>
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                {/* Gradient bottom border - Purple to Black */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-purple-700 to-purple-900"></div>
            </nav>
        </div>
    )
}

export default Navbar