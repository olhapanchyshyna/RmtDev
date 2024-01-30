import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

type PaginationControlsProps = {
	onChangePage: (direction: 'next' | 'prev') => void
	currentPage: number
  totalNumberOfPage: number
}
type PaginationButtonProps = {
	onChangePage: (direction: 'next' | 'prev') => void
	currentPage: number
	direction: 'next' | 'prev'
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
			onClick={() => {
				onChangePage(direction)
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
