import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

export function capitalize(word: string) {
	const firstLetter = word?.charAt(0)
	const remainingLetters = word?.substring(1)
	const firstLetterCap = firstLetter?.toUpperCase()
	let capitalizedWord
	if (firstLetterCap && remainingLetters) {
		capitalizedWord = firstLetterCap + remainingLetters
	}
	return capitalizedWord
}
