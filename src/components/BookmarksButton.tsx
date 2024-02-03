import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import BookmarksPopover from './BookmarksPopover'

export default function BookmarksButton() {
	const [isPopover, setIsPopover] = useState(false)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				e.target instanceof HTMLElement &&
				!e.target.closest('.bookmarks-btn') &&
				!e.target.closest('.bookmarks-popover')
			) {
				setIsPopover(false)
			}
		}
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<section>
			<button
				className='bookmarks-btn'
				onClick={() => {
					setIsPopover(prev => !prev)
				}}
			>
				Bookmarks <TriangleDownIcon />
			</button>
			{isPopover ? <BookmarksPopover /> : null}
		</section>
	)
}
