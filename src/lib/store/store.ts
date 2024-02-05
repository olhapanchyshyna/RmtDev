import { create } from 'zustand'
import { RESULTS_PER_PAGE } from '../constants'
import { JobItems, PageDirection, SortBy } from '../types'

type Store = {
	searchText: string
	currentPage: number
	sortBy: string
	debouncedValue: string
	countItem: number
	totalNumberOfPage: number
	jobItemsSorted: JobItems[]
	jobItemsSortedAndSliced: JobItems[]
	setSearchText: (value: string) => void
	setChangePage: (direction: PageDirection) => void
	setChangeSortBy: (newSort: SortBy) => void
	setCountItem: (jobItems: JobItems[] | undefined) => void
	setTotalNumberOfPage: () => void
	setJobItemsSorted: (jobItems: JobItems[] | undefined) => void
	setJobItemsSortedAndSliced: () => void
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
	searchText: '',
	currentPage: 1,
	sortBy: 'relevant',
	debouncedValue: '',
	countItem: 0,
	totalNumberOfPage: 0,
	jobItemsSorted: [],
	jobItemsSortedAndSliced: [],

	setSearchText: value => {
		set({
			searchText: value,
		})
	},
	setChangePage: direction => {
		if (direction === 'next') {
			set(prev => ({
				currentPage: prev.currentPage + 1,
			}))
		} else if (direction === 'prev') {
			set(prev => ({
				currentPage: prev.currentPage - 1,
			}))
		}
	},

	setChangeSortBy: newSort => {
		set({
			currentPage: 1,
			sortBy: newSort,
		})
	},

	setCountItem: jobItems => {
		set({
			countItem: jobItems?.length || 0,
		})
	},

	setTotalNumberOfPage: () => {
		const state = get()
		set({
			totalNumberOfPage: state.countItem / 7,
		})
	},

	setJobItemsSorted: jobItems => {
		const state = get()
		set({
			jobItemsSorted:
				[...(jobItems || [])].sort((a, b) => {
					if (state.sortBy === 'relevant') {
						return b.relevanceScore - a.relevanceScore
					} else {
						return a.daysAgo - b.daysAgo
					}
				}) || [],
		})
	},

	setJobItemsSortedAndSliced: () => {
		const state = get()
		set({
			jobItemsSortedAndSliced: state.jobItemsSorted.slice(
				state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
				state.currentPage * RESULTS_PER_PAGE
			),
		})
	},
}))
