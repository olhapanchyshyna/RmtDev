type resultsCountProps = {
	countItem: number
}
export default function ResultsCount({ countItem }: resultsCountProps) {
	return (
		<p className='count'>
			<span className='u-bold'>{countItem}</span> results
		</p>
	)
}
