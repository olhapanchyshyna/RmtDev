import {useState } from 'react'
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
import { useJobItems } from '../lib/hooks'

function App() {
	const [searchText, setSearchText] = useState('')
	const{jobItemsSliced, isLoadding} = useJobItems(searchText)

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
					<JobList jobItems={jobItemsSliced} isLoadding={isLoadding}/>
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />
		</>
	)
}

export default App
