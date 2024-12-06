import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { isUniqueAcrossAllDocuments } from '@/lib/isUniqueAcrossAllDocuments'

export const postType = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 100,
				isUnique: isUniqueAcrossAllDocuments,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
		}),
		defineField({
			name: 'author',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'views',
			type: 'number',
		}),
		defineField({
			name: 'mainImage',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
				},
			],
		}),
		defineField({
			name: 'categories',
			type: 'array',
			of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
			validation: (rule) =>
				rule.custom((categories) => {
					if (!categories) return true // No categories, no problem
					const uniqueIds = new Set(categories.map((cat: any) => cat._ref))
					if (uniqueIds.size !== categories.length) {
						return 'Categories must be unique.'
					}
					return true
				}),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			initialValue: new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'body',
			type: 'blockContent',
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
		},
		prepare(selection) {
			const { author } = selection
			return { ...selection, subtitle: author && `by ${author}` }
		},
	},
})
