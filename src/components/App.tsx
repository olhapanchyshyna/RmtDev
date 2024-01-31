import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { RESULTS_PER_PAGE } from '../lib/constants'
import { useDebounce, useJobItems } from '../lib/hooks'
import { SortBy } from '../lib/types'
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
	const debouncedValue = useDebounce(searchText, 300)
	const { jobItems, isLoading } = useJobItems(debouncedValue)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState<SortBy>('relevant')

	const countItem = jobItems?.length || 0
	const totalNumberOfPage = countItem / 7

	const jobItemsSorted =
		jobItems?.sort((a, b) => {
			if (sortBy === 'relevant') {
				return b.relevanceScore - a.relevanceScore
			} else {
				return a.daysAgo - b.daysAgo
			}
		}) || []

	const jobItemsSortedAndSliced =
		jobItemsSorted.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
		) || []

	const handleChangePage = (direction: 'next' | 'prev') => {
		if (direction === 'next') {
			setCurrentPage(prev => prev + 1)
		} else if (direction === 'prev') {
			setCurrentPage(prev => prev - 1)
		}
	}

	const handleChangeSortBy = (newSort: SortBy) => {
		setCurrentPage(1)
		setSortBy(newSort)
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
						<SortingControls
							handleChangeSortBy={handleChangeSortBy}
							sortBy={sortBy}
						/>
					</SidebarTop>
					<JobList jobItemsSliced={jobItemsSortedAndSliced} isLoading={isLoading} />
					<PaginationControls
						onChangePage={handleChangePage}
						currentPage={currentPage}
						totalNumberOfPage={totalNumberOfPage}
					/>
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />

			<Toaster position='top-right' />
		</>
	)
}

export default App
