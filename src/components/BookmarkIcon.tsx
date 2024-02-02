import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useBookmarksContext } from '../lib/hooks'


type BookmarkIconProps = {
	id: number
}

export default function BookmarkIcon({ id }: BookmarkIconProps) {

	const { bookmarkId, handleToogleBookmarkId } = useBookmarksContext()

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

