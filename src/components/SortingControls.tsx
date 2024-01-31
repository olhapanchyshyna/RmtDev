import { SortBy } from '../lib/types'

type SortingControlsProps = {
	handleChangeSortBy: (newSort: 'relevant' | 'resent') => void
  sortBy: SortBy
}

export default function SortingControls({
	handleChangeSortBy,sortBy
}: SortingControlsProps) {
	return (
		<section className='sorting'>
			<i className='fa-solid fa-arrow-down-short-wide'></i>

			<button
				className={`sorting__button sorting__button--relevant ${sortBy === 'relevant' ? 'sorting__button--active' : ''}`}
				onClick={() => {
					handleChangeSortBy('relevant')
				}}
			>
				Relevant
			</button>

			<button
				className={`sorting__button sorting__button--recent ${sortBy === 'resent' ? 'sorting__button--active' : ''}`}
				onClick={() => {
					handleChangeSortBy('resent')
				}}
			>
				Recent
			</button>
		</section>
	)
}
