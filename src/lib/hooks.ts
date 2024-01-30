import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
import { JobItems, TJobItemContent } from './types'
import toast from 'react-hot-toast'

type JobItemContentApiResponse = {
	public: boolean
	jobItem: TJobItemContent
}

// ---------------------------

type JobItemApiResponse = {
	public: boolean
	sorted: boolean
	jobItems: JobItems[]
}
// ---------------------------

export function useActiveId() {
	const [activeId, setActiveId] = useState<number | null>(null)

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1)
			setActiveId(id)
		}
		handleHashChange()

		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [])

	return activeId
}

// ---------------------------

const fetchJobItemContent = async (
	id: number | null
): Promise<JobItemContentApiResponse> => {
	const response = await fetch(`${BASE_API_URL}/${id}`)
	if (!response.ok) {
		const errorDate = await response.json()
		throw new Error(errorDate.description)
	}
	const data = await response.json()
	return data
}


export function useJobItemContent(id: number | null) {
	const { data, isInitialLoading } = useQuery(
		['job-item', id],
		() => (id ? fetchJobItemContent(id) : null),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: error => {
				console.log(error)
			},
		}
	)
	return {
		jobItemContent: data?.jobItem,
		isLoading: isInitialLoading,
	} as const
}

// ---------------------------

export function useDebounce<T>(value: T, delay = 350): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => clearTimeout(timeoutId)
	}, [value, delay])

	return debouncedValue
}

// --------------
const fetchJobItems = async (
	searchText: string
): Promise<JobItemApiResponse> => {
	const response = await fetch(`${BASE_API_URL}?search=${searchText}`)
	if (!response.ok) {
		const errorDate = await response.json()
		throw new Error(errorDate.description)
	}
	const data = await response.json()
	return data
}

export function useJobItems(searchText: string) {
	const { data, isInitialLoading } = useQuery(
		['job-items', searchText],
		() => fetchJobItems(searchText),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: (error) => {
				toast.error(error.message)
			},
		}
	)

	return {
		jobItems: data?.jobItems,
		isLoading: isInitialLoading,
	} as const
}
