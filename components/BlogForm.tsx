'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FormFileUploader from './FormFileUploader'
import FormMultiSelect from './FormMultiSelect'

const formSchema = z.object({
	name_4142275795: z.string(),
	name_6750076721: z.string(),
	name_6045401183: z.string().optional(),
	name_4809290122: z.string().optional(),
	name_4096826354: z.array(z.string()).nonempty('Pick at least one item').optional(),
})

export default function MyForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name_4142275795: '', // Default empty string
			name_6750076721: '', // Default empty string
			name_6045401183: '', // Default empty string for optional field
			name_4809290122: '', // Default empty string for optional field
			name_4096826354: [],
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values)
			toast(
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(values, null, 2)}</code>
				</pre>
			)
		} catch (error) {
			console.error('Form submission error', error)
			toast.error('Failed to submit the form. Please try again.')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 max-w-3xl mx-auto py-10'>
				<FormField
					control={form.control}
					name='name_4142275795'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name_6750076721'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Slug</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name_6045401183'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder='' className='resize-none' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name_4809290122'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Main Image</FormLabel>
							<FormControl>
								<FormFileUploader />
							</FormControl>
							<FormDescription>Select a file to upload.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name_4096826354'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categories</FormLabel>
							<FormControl>
								<FormMultiSelect field={field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	)
}
