import { PortableText } from '@portabletext/react'

import imageUrlBuilder from '@sanity/image-url'
import { client } from '../sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
	return builder.image(source)
}

const portableTextComponents = {
	types: {
		image: ({ value }: any) => <img src={urlFor(value.asset).url()} alt={value.alt || 'Image'} className='max-w-full my-4' />,
	},
	block: {
		h1: ({ children }: any) => <h1 className='text-2xl font-bold mb-2'>{children}</h1>,
		h2: ({ children }: any) => <h2 className='text-xl font-semibold mb-2'>{children}</h2>,
		h3: ({ children }: any) => <h3 className='text-lg font-semibold mb-2'>{children}</h3>,
		h4: ({ children }: any) => <h4 className='text-lg font-semibold mb-2'>{children}</h4>,
		normal: ({ children }: any) => <p className='text-base mb-2'>{children}</p>,
	},
	marks: {
		link: ({ children, value }: any) => (
			<a href={value.href} className='text-blue-500 underline'>
				{children}
			</a>
		),
	},
	list: {
		// Render unordered list
		bullet: ({ children }: any) => <ul className='list-disc pl-5'>{children}</ul>,
		// Render ordered list
		number: ({ children }: any) => <ol className='list-decimal pl-5'>{children}</ol>,
	},
	listItem: {
		// Render list items
		bullet: ({ children }: any) => <li className='mb-1'>{children}</li>,
		number: ({ children }: any) => <li className='mb-1'>{children}</li>,
	},
}

const PostBody = ({ body }: { body: any[] }) => {
	return <PortableText value={body} components={portableTextComponents} />
}

export default PostBody
