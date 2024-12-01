import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_GOOGLE_ID_QUERY } from './sanity/lib/queries'
import { writeClient } from './sanity/lib/write-client'

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Google({
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user: { name, email, image }, profile }) {
			const id = profile?.sub // Google's unique ID for the user
			console.log(profile)
			console.log(name, email, image)

			if (!id) {
				console.error('Google profile missing "sub"')
				// return false
			}

			const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id })

			if (!existingUser) {
				await writeClient.create({
					_type: 'author',
					id,
					name,
					email,
					image,
				})
			}

			return true
		},

		async jwt({ token, account, profile }) {
			if (account && profile) {
				const id = profile?.sub // Use `sub` from Google profile
				const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
					id: id,
				})

				token.id = user?._id
			}

			return token
		},

		async session({ session, token }) {
			Object.assign(session, { id: token.id })
			return session
		},
	},
})
