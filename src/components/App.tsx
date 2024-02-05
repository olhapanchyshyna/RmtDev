import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDebounce, useSearchQuery } from '../lib/hooks'
import { useFeedbackItemsStore } from '../lib/store/store'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import JobItemContent from './JobItemContent'
import JobList from './JobList'
import PaginationControls from './PaginationControls'
import Sidebar, { SidebarTop } from './Sidebar'

function App() {
	const {
		searchText,
		jobItemsSortedAndSliced,
		sortBy,
		currentPage,
		setCountItem,
		setJobItemsSorted,
		setJobItemsSortedAndSliced,
		setTotalNumberOfPage,
	} = useFeedbackItemsStore()
	const debouncedValue = useDebounce(searchText, 300)
	const { jobItems, isLoading } = useSearchQuery(debouncedValue)

	useEffect(() => {
		setJobItemsSorted(jobItems)
		setJobItemsSortedAndSliced()
		setCountItem(jobItems)
		setTotalNumberOfPage()
	}, [jobItems, sortBy, currentPage])

	return (
		<>
			<Background />

			<Header />

			<Container>

				<Sidebar>
					<SidebarTop />
					<JobList
						jobItemsSliced={jobItemsSortedAndSliced}
						isLoading={isLoading}
					/>
					<PaginationControls />
				</Sidebar>

				<JobItemContent />

			</Container>

			<Footer />

			<Toaster position='top-right' />
		</>
	)
}

export default App
