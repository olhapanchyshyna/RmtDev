import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useJobItemsContext } from '../lib/hooks'
import { PageDirection } from '../lib/types'

type PaginationButtonProps = {
	handleChangePage: (direction: PageDirection) => void
	currentPage: number
	direction: PageDirection
}

export default function PaginationControls() {
	const { currentPage, handleChangePage, totalNumberOfPages } =
		useJobItemsContext()
	return (
		<section className='pagination'>
			{currentPage > 1 ? (
				<PaginationButton
					handleChangePage={handleChangePage}
					currentPage={currentPage}
					direction='prev'
				/>
			) : (
				<button />
			)}

			{currentPage <= totalNumberOfPages ? (
				<PaginationButton
					handleChangePage={handleChangePage}
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
	handleChangePage,
	currentPage,
	direction,
}: PaginationButtonProps) {
	return (
		<button
			className='pagination__button'
			onClick={e => {
				handleChangePage(direction)
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
