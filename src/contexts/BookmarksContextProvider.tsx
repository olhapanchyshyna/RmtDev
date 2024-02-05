import { ReactNode, createContext } from 'react'
import {  useJobItems, useLocalStorage } from '../lib/hooks'
import {TJobItemContent } from '../lib/types'

type TBookmarksContext = {
		bookmarkId: number[]
		handleToogleBookmarkId: (id: number) => void
		bookmarkJobItem: TJobItemContent[]
		isLoading: boolean
}

export const BookmarksContext = createContext<TBookmarksContext | null>(null)

export default function BookmarksContextProvider({
	children,
}: {children: ReactNode}) {
	const[bookmarkId, setBookmarkId] = useLocalStorage<number[]>('bookmarkId', [])
	
	const handleToogleBookmarkId = (id: number) => {
		if (bookmarkId.includes(id)) {
			setBookmarkId(prev => prev.filter(item => item !== id))
		} else {
			setBookmarkId(prev => [...prev, id])
		}
	}

	const {jobItems, isLoading} = useJobItems(bookmarkId)

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkId,
				handleToogleBookmarkId,
				bookmarkJobItem: jobItems,
				isLoading
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}

