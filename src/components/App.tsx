import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDebounce, useJobItems } from '../lib/hooks'
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
import { RESULTS_PER_PAGE } from '../lib/constants'

function App() {
	const [searchText, setSearchText] = useState('')
	const debouncedValue = useDebounce(searchText, 300)
	const { jobItems, isLoading } = useJobItems(debouncedValue)
	const [currentPage, setCurrentPage] = useState(1)

	const countItem = jobItems?.length || 0
	const totalNumberOfPage = countItem / 7
	const jobItemsSliced = jobItems?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE) || []

	const handleChangePage = (direction: 'next' | 'prev') => {
		if(direction === 'next'){
			setCurrentPage((prev) => prev + 1)
		}else if(direction === 'prev'){
			setCurrentPage((prev) => prev -1)
		}
	}

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
					<PaginationControls onChangePage={handleChangePage} currentPage={currentPage} totalNumberOfPage={totalNumberOfPage}/>
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position='top-right' />
		</>
	)
}

export default App
