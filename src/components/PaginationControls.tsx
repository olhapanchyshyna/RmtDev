import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

type PaginationControlsProps = {
	onChangePage: (direction: 'next' | 'prev') => void
	currentPage: number
}

export default function PaginationControls({
	onChangePage,
	currentPage,
}: PaginationControlsProps) {
	return (
		<section className='pagination'>
			<button
				className='pagination__button'
				onClick={() => {
					onChangePage('prev')
				}}
			>
				<ArrowLeftIcon />
				Page {currentPage - 1 }
			</button>
			<button
				className='pagination__button'
				onClick={() => {
					onChangePage('next')
				}}
			>
				Page {currentPage + 1}
				<ArrowRightIcon />
			</button>
		</section>
	)
}
