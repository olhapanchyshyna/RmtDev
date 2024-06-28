import { Toaster } from 'react-hot-toast'
import Background from './Background'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import JobItemContent from './JobItemContent'
import PaginationControls from './PaginationControls'
import Sidebar, { SidebarTop } from './Sidebar'
import JobListSearch from './JobListSearch'

function App() {
	

	return (
		<>
			<Background />

			<Header />

			<Container>

				<Sidebar>
					<SidebarTop />
					<JobListSearch/>
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
