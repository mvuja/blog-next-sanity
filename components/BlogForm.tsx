'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Paperclip } from 'lucide-react'
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload'
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multi-select'

const formSchema = z.object({
	name_4142275795: z.string(),
	name_6750076721: z.string(),
	name_6045401183: z.string().optional(),
	name_4809290122: z.string().optional(),
	name_4096826354: z.array(z.string()).nonempty('Please at least one item').optional(),
})

export default function MyForm() {
	const [files, setFiles] = useState<File[] | null>(null)

	const dropZoneConfig = {
		maxFiles: 5,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	}
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name_4096826354: ['React'],
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
								<FileUploader
									value={files}
									onValueChange={setFiles}
									dropzoneOptions={dropZoneConfig}
									className='relative bg-background rounded-lg p-2'
								>
									<FileInput id='fileInput' className='outline-dashed outline-1 outline-slate-500'>
										<div className='flex items-center justify-center flex-col p-8 w-full '>
											<CloudUpload className='text-gray-500 w-10 h-10' />
											<p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
												<span className='font-semibold'>Click to upload</span>
												&nbsp; or drag and drop
											</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF</p>
										</div>
									</FileInput>
									<FileUploaderContent>
										{files &&
											files.length > 0 &&
											files.map((file, i) => (
												<FileUploaderItem key={i} index={i}>
													<Paperclip className='h-4 w-4 stroke-current' />
													<span>{file.name}</span>
												</FileUploaderItem>
											))}
									</FileUploaderContent>
								</FileUploader>
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
								<MultiSelector values={field.value} onValuesChange={field.onChange} loop className='max-w-xs'>
									<MultiSelectorTrigger>
										<MultiSelectorInput placeholder='Select languages' />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											<MultiSelectorItem value={'React'}>React</MultiSelectorItem>
											<MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
											<MultiSelectorItem value={'Svelte'}>Svelte</MultiSelectorItem>
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
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
