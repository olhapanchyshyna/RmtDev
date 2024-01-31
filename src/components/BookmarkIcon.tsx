import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { BookmarksContext } from '../contexts/BookmarksContextProvider'

type BookmarkIconProps = {
	id: number
}

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkId, handleToogleBookmarkId } = useContext(BookmarksContext)

	return (
		<button
			onClick={(e) => {
				handleToogleBookmarkId(id)
        e.preventDefault()
        e.stopPropagation()
			}}
			className='bookmark-btn'
		>
			<BookmarkFilledIcon
				className={`${bookmarkId.includes(id) ? 'filled' : null}`}
			/>
		</button>
	)
}
