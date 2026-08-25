
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({children}:any) => {
  return (
    <div className='flex'>
        
       <SidebarProvider>
          <AppSidebar />

          <main className="flex min-h-screen flex-1 flex-col">
            <SidebarTrigger />

            {children}
          </main>
        </SidebarProvider>
        
    </div>
  )
}

export default layout