import { ReactNode, createContext } from 'react'
import { useLocalStorage } from '../lib/hooks'


type TBookmarksContext = {
		bookmarkId: number[]
		handleToogleBookmarkId: (id: number) => void
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

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkId,
				handleToogleBookmarkId,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	)
}

