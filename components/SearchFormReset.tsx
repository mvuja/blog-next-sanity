'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SearchFormReset = () => {
	const searchParams = useSearchParams()

	const params = new URLSearchParams(searchParams.toString())
	params.delete('query')

	const reset = () => {
		const form = document.querySelector('.search-form') as HTMLFormElement
		if (form) form.reset()
	}

	return (
		<Button type='reset' onClick={reset}>
			<Link href={`/blogs?${params.toString()}`}>X</Link>
		</Button>
	)
}

export default SearchFormReset
