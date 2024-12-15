'use client'

import { useState } from 'react'
import { CloudUpload, Paperclip } from 'lucide-react'
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload'

const FormFileUploader = () => {
	const [files, setFiles] = useState<File[] | null>(null)

	const dropZoneConfig = {
		maxSize: 1024 * 1024 * 4,
		multiple: false,
		accept: {
			'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
		},
	}

	return (
		<FileUploader value={files} onValueChange={setFiles} dropzoneOptions={dropZoneConfig} className='relative bg-background rounded-lg p-2'>
			<FileInput id='fileInput' className='outline-dashed outline-1 outline-slate-500'>
				<div className='flex items-center justify-center flex-col p-8 w-full '>
					<CloudUpload className='text-gray-500 w-10 h-10' />
					<p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span>
						&nbsp; or drag and drop
					</p>
					<p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG or GIF</p>
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
	)
}

export default FormFileUploader
