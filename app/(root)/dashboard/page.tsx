import LogoutButton from '@/components/LogoutButton'
import { auth } from '@/lib/auth'
import Head from 'next/head'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
     redirect('/login');
  }
  return (
    <div>
      
    </div>
  )
}

export default Dashboard