import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import BookmarksPopover from './BookmarksPopover'

export default function BookmarksButton() {
	const [isPopover, setIsPopover] = useState(false)

	return (
		<section>
			<button
				className='bookmarks-btn'
				onClick={() => {
					setIsPopover((prev) => !prev)
          console.log(isPopover)
				}}
			>
				Bookmarks <TriangleDownIcon />
			</button>
      {isPopover ? <BookmarksPopover /> : null}
			
		</section>
	)
}
