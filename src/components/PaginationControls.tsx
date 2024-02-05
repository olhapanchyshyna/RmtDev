import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useFeedbackItemsStore } from '../lib/store/store'
import { PageDirection } from '../lib/types'

type PaginationButtonProps = {
	setChangePage: (direction: PageDirection) => void
	currentPage: number
	direction: PageDirection
}

export default function PaginationControls() {
	const { currentPage, setChangePage, totalNumberOfPage } =
		useFeedbackItemsStore()
	return (
		<section className='pagination'>
			{currentPage > 1 ? (
				<PaginationButton
					setChangePage={setChangePage}
					currentPage={currentPage}
					direction='prev'
				/>
			) : (
				<button />
			)}

			{currentPage <= totalNumberOfPage ? (
				<PaginationButton
					setChangePage={setChangePage}
					currentPage={currentPage}
					direction='next'
				/>
			) : (
				<button />
			)}
		</section>
	)
}

function PaginationButton({
	setChangePage,
	currentPage,
	direction,
}: PaginationButtonProps) {
	return (
		<button
			className='pagination__button'
			onClick={e => {
				setChangePage(direction)
				e.currentTarget.blur()
			}}
		>
			{direction === 'prev' ? (
				<>
					<ArrowLeftIcon />
					Page {currentPage - 1}
				</>
			) : null}

			{direction === 'next' ? (
				<>
					Page {currentPage + 1}
					<ArrowRightIcon />
				</>
			) : null}
		</button>
	)
}
