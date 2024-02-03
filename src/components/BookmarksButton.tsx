import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'
import BookmarksPopover from './BookmarksPopover'
import { useOnClickOutside } from '../lib/hooks'

export default function BookmarksButton() {
	const [isPopover, setIsPopover] = useState(false)
	const buttonRef =  useRef<HTMLButtonElement>(null)
	const popoverRef =  useRef<HTMLDivElement>(null)

	useOnClickOutside([buttonRef,popoverRef], () => setIsPopover(false))

	return (
		<section>
			<button
			ref={buttonRef}
				className='bookmarks-btn'
				onClick={() => {

					setIsPopover(prev => !prev)
				}}
			>
				Bookmarks <TriangleDownIcon />
			</button>
			{isPopover ? <BookmarksPopover ref={popoverRef} /> : null}
		</section>
	)
}
