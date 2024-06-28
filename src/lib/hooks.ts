import { useQueries, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { BookmarksContext } from '../contexts/BookmarksContextProvider'
import { BASE_API_URL } from './constants'
import { JobItems, TJobItemContent } from './types'
import { handleError } from './utils'
import { ActiveIdContext } from '../contexts/ActiveIdContextProvider'
import { SearchTextContext } from '../contexts/SearchTextContextProvider'
import { JobItemsContext } from '../contexts/JobItemsContextProvider'

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
			onError: handleError,
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

export function useJobItems(ids: number[]) {
	const results = useQueries({
		queries: ids.map(id => ({
			queryKey: ['job-item', id],
			queryFn: () => fetchJobItemContent(id),
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: handleError,
		})),
	})

	const jobItems = results
		.map(item => item.data?.jobItem)
		// .filter((item) => item !== undefined)
		.filter(item => Boolean(item)) as TJobItemContent[]

	const isLoading = results.some(results => results.isLoading)

	return {
		jobItems,
		isLoading,
	}
}

export function useSearchQuery(searchText: string) {
	const { data, isInitialLoading } = useQuery(
		['job-items', searchText],
		() => fetchJobItems(searchText),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: handleError,
		}
	)

	return {
		jobItems: data?.jobItems,
		isLoading: isInitialLoading,
	} as const
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

export function useLocalStorage<T>(
	key: string,
	initianValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem(key) || JSON.stringify(initianValue))
	)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, key])

	return [value, setValue] 
}

export function useOnClickOutside(
	refs: React.RefObject<HTMLElement>[],
	handle: () => void
) {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (refs.every(ref => !ref.current?.contains(e.target as Node))) {
				handle()
			}
		}
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [refs, handle])
}


// --------------------------------------------------------------------------

export function useBookmarksContext() {
	const context = useContext(BookmarksContext)

	if (!context) {
		throw new Error(
			' useContext(BookmarksContext) must be used within a BookmarksContextProvider'
		)
	}

	return context
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
}