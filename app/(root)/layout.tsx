import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<main className='container max-w-5xl mx-auto px-5'>
			<Navbar />
			{children}
		</main>
	)
}

export default Layout
