import { useState } from 'react'
import {useDebounce, useJobItems } from '../lib/hooks'
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
import { Toaster } from 'react-hot-toast'

function App() {
	const [searchText, setSearchText] = useState('')
 const debouncedValue = useDebounce(searchText, 300)
 const { jobItems, isLoading } = useJobItems(debouncedValue)  
	
 const countItem = jobItems?.length || 0
 const jobItemsSliced = jobItems?.slice(0, 7) || []

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
						<ResultsCount countItem={countItem} />
						<SortingControls />
					</SidebarTop>
					<JobList jobItemsSliced={jobItemsSliced} isLoading={isLoading} />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position="top-right" />
		</>
	)
}

export default App
