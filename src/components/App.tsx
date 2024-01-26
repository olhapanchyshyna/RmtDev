import { useEffect, useState } from 'react'
import Background from './Background'
import BookmarksButton from './BookmarksButton'
import Container from './Container'
import Footer from './Footer'
import Header, { HeaderTop } from './Header'
import JobItemContent from './JobItemContent'
import JobList from './JobList'
import Logo from './Logo'
import PaginationControls from './PaginationControls'
import ResultsCount from './ResultsCount'
import SearchForm from './SearchForm'
import Sidebar, { SidebarTop } from './Sidebar'
import SortingControls from './SortingControls'

function App() {
	const [searchText, setSearchText] = useState('')
	const [jobItems, setjobItems] = useState([])

	useEffect(() => {
		if (!searchText) return

		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
				)
				const data = await response.json()
				setjobItems(data.jobItems)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [searchText])

	return (
		<>
			<Background />

			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>

				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount />
						<SortingControls />
					</SidebarTop>
					<JobList jobItems={jobItems} />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />
		</>
	)
}

export default App
