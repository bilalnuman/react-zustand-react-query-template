"use client"
import Header from '@/components/header'
import Sidebar from '@/components/ui/sidebar'
import React from 'react'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <aside className="lg:flex hidden sticky top-0 h-screen w-64 bg-gray-100 px-2 pt-5 flex-col items-baseline justify-between">
                <Sidebar />
            </aside>
            <div className='flex-1 flex flex-col'>
                <Header/>
                <main className="flex-1 px-5 pt-8 container mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
