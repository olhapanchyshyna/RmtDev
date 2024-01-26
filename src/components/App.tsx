import { useEffect, useState } from 'react'
import { useJobItems } from '../lib/hooks'
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
	const { jobItems, isLoadding } = useJobItems(searchText)
  const [activeId, setActiveId] = useState<number | null>(null)

	useEffect(() => {
		const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id)
    };
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
	}, [])

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
					<JobList jobItems={jobItems} isLoadding={isLoadding} />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>

			<Footer />
		</>
	)
}

export default App
