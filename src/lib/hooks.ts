import { useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
import { JobItems, TJobItemContent } from './types'

export function useActiveId(){
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

	return activeId
}

export function useJobItemContent(){
	const activeId = useActiveId()
	const [jobItemContent, setJobItemContent] = useState<TJobItemContent | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!activeId) return

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(`${BASE_API_URL}/${activeId}`)
				const data = await response.json()
        setJobItemContent(data.jobItem)
				setIsLoading(false)
			} catch (error) {
        console.log(error)
				setIsLoading(false)
      }
		}
		fetchData()
	}, [activeId])

	return {
		jobItemContent,
		isLoading
	}
}


export function useJobItems(searchText: string) {
	const [jobItems, setjobItems] = useState<JobItems[]>([])
  const [isLoadding, setIsLoadding] = useState(false)

	const jobItemsSliced = jobItems.slice(0,7)

	useEffect(() => {
		if (!searchText) return

		const fetchData = async () => {
      setIsLoadding(true)
			try {
				const response = await fetch(
					`${BASE_API_URL}?search=${searchText}`
				)
				const data = await response.json()
				setjobItems(data.jobItems)
			} catch (error) {
				console.log(error)
			}
      setIsLoadding(false)
		}
		fetchData()
    
	}, [searchText])

	return{
		jobItems: jobItemsSliced,
		isLoadding
	}
}