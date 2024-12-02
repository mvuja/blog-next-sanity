'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { capitalize } from '@/lib/utils'

const DropdownFilter = () => {
	const router = useRouter()

	const searchParams = useSearchParams()

	const sort = searchParams.get('filter')

	const handleFilterChange = (value: string) => {
		// Update the URL query parameter
		router.push(`?filter=${value}`)
	}

	return (
		<Select onValueChange={handleFilterChange}>
			<SelectTrigger className='w-[180px] mb-5 mt-7'>
				{sort ? <SelectValue placeholder={capitalize(sort)} /> : <SelectValue placeholder='Sort by' />}
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='date'>Date</SelectItem>
				<SelectItem value='name'>Name</SelectItem>
				<SelectItem value='views'>Views</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default DropdownFilter
