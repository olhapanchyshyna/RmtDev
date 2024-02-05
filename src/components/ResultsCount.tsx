import { useFeedbackItemsStore } from '../lib/store/store'

export default function ResultsCount() {
	const {countItem} = useFeedbackItemsStore()
	return (
		<p className='count'>
			<span className='u-bold'>{countItem}</span> results
		</p>
	)
}
