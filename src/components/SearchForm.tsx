import { useFeedbackItemsStore } from '../lib/store/store'

export default function SearchForm() {
	const { searchText, setSearchText } = useFeedbackItemsStore()
	return (
		<form
			onSubmit={e => {
				e.preventDefault()
			}}
			action='#'
			className='search'
		>
			<button type='submit'>
				<i className='fa-solid fa-magnifying-glass'></i>
			</button>

			<input
				value={searchText}
				onChange={e => {
					setSearchText(e.target.value)
				}}
				spellCheck='false'
				type='text'
				required
				placeholder='Find remote developer jobs...'
			/>
		</form>
	)
}
