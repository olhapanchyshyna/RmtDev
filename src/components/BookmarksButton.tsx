import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import BookmarksPopover from './BookmarksPopover'

export default function BookmarksButton() {
	const [isPopover, setIsPopover] = useState(false)
	const buttonRef =  useRef<HTMLButtonElement>(null)
	const popoverRef =  useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				e.target instanceof HTMLElement &&
				!buttonRef.current?.contains(e.target) &&
				!popoverRef.current?.contains(e.target)
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
