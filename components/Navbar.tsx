import { auth, signOut, signIn } from '@/auth'
import { Button } from './ui/button'
import Image from 'next/image'

const Navbar = async () => {
	const session = await auth()

	return (
		<div className='flex justify-between items-center my-4'>
			<h1 className='text-3xl'>Navbar</h1>
			<div>
				{session && session?.user ? (
					<div className='flex items-center gap-4'>
						<p>{session?.user?.name}</p>
						{session?.user?.image && <Image className='rounded-full' src={session?.user?.image} width={50} height={50} alt='Profile picture' />}
						<form
							action={async () => {
								'use server'
								await signOut({ redirectTo: '/' })
							}}
						>
							<button>Logout</button>
						</form>
					</div>
				) : (
					<form
						action={async () => {
							'use server'
							await signIn('google')
						}}
					>
						<Button>Login</Button>
					</form>
				)}
			</div>
		</div>
	)
}

export default Navbar
