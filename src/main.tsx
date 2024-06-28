import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import ActiveIdContextProvider from './contexts/ActiveIdContextProvider.tsx'
import BookmarksContextProvider from './contexts/BookmarksContextProvider.tsx'
import JobItemsContextProvider from './contexts/JobItemsContextProvider.tsx'
import './index.css'
import SearchTextContextProvider from './contexts/SearchTextContextProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
		<BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
