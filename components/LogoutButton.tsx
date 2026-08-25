"use client"
import React from 'react'
import { Button } from './ui/button'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'


const LogoutButton = () => {
    const handleLogout = async ()=>{
        await authClient.signOut();
        redirect('/login')
        
    }
    
  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default LogoutButton