'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SearchFormReset = () => {
	const reset = () => {
		const form = document.querySelector('.search-form') as HTMLFormElement

		if (form) form.reset()
	}

	return (
		<Button type='reset' onClick={reset}>
			<Link href='/blogs'>X</Link>
		</Button>
	)
}

export default SearchFormReset
