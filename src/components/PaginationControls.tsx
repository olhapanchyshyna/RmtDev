import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { PageDirection } from '../lib/types'

type PaginationControlsProps = {
	onChangePage: (direction: PageDirection) => void
	currentPage: number
  totalNumberOfPage: number
}
type PaginationButtonProps = {
	onChangePage: (direction: PageDirection) => void
	currentPage: number
	direction: PageDirection
}

export default function PaginationControls({
	onChangePage,
	currentPage,
  totalNumberOfPage
}: PaginationControlsProps) {
	return (
		<section className='pagination'>
      {currentPage > 1 ? <PaginationButton
				onChangePage={onChangePage}
				currentPage={currentPage}
				direction='prev'
			/> : <button/>}
			
      {currentPage <= totalNumberOfPage ? <PaginationButton
				onChangePage={onChangePage}
				currentPage={currentPage}
				direction='next'
			/>: <button/>}

			
		</section>
	)
}

function PaginationButton({
	onChangePage,
	currentPage,
	direction,
}: PaginationButtonProps) {
	return (
		<button
			className='pagination__button'
			onClick={(e) => {
				onChangePage(direction)
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
