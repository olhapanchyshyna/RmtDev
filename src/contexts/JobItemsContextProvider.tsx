import { ReactNode, createContext, useCallback, useMemo, useState } from 'react'
import { JobItems, PageDirection, SortBy } from '../lib/types'
import { useSearchQuery, useSearchTextContext } from '../lib/hooks'
import { RESULTS_PER_PAGE } from '../lib/constants'

type TJobItemsContext = {
	jobItems: JobItems[] | undefined;
  jobItemsSortedAndSliced: JobItems[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
}

export const JobItemsContext = createContext<TJobItemsContext | null>(null)

export default function JobItemsContextProvider({
	children,
}: {children: ReactNode}) {

	const{debouncedValue} = useSearchTextContext()
	const { jobItems, isLoading } = useSearchQuery(debouncedValue)

	const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

	const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  // event handlers / actions
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

	const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

	return (
		<JobItemsContext.Provider
			value={contextValue}
		>
			{children}
		</JobItemsContext.Provider>
	)
}

