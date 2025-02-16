import Footer from '@/components/landing/footer'
import RootNav from '@/components/landing/nav'
import React from 'react'

const Layout = ({children} : { children: React.ReactNode}) => {
  return (
    <main>
        <RootNav />
        {children}
        <Footer/>
    </main>
  )
}

export default Layout