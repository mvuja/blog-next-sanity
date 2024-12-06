import { client } from '@/sanity/lib/client'
import { BLOGS_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { EyeIcon } from 'lucide-react'

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(BLOGS_VIEWS_QUERY, { id })

	await writeClient
		.patch(id)
		.set({ views: totalViews + 1 })
		.commit()

	return (
		<div className='flex gap-1.5 items-center'>
			<EyeIcon className='size-6' />
			<span className='text-base leading-none'>{totalViews}</span>
		</div>
	)
}

export default View
