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
        <header className="text-gray-600 body-font p-2">
                <div className="container mx-auto flex flex-wrap justify-between px-5 flex-col md:flex-row items-center">
                    <a className="flex flex-col title-font font-medium  text-gray-900 mb-4 md:mb-0">
                        <span className="font-semibold text-xl">Hello, {session?.user?.name} 👋</span>
                        <p className='font-light text-gray-600'>Here's your carbon footprint overview.</p>
                    </a>

                    <div className="p-3 flex gap-2 items-center justify-center">
                        {session?.user?.image && (
                            <img src={session?.user?.image} alt="" className="h-8 rounded-full" />
                        )}
                        {
                            !session?.user?.image && (
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 font-semibold text-lg">
                                        {session?.user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )
                        }


                        <p className="text-lg font-light">
                            {session?.user?.name}
                        </p>
                    </div>
                </div>
            </header>
            <hr />
    </div>
  )
}

export default Dashboard