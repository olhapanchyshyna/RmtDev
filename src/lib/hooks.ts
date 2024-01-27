import { useEffect, useState } from 'react'
import { JobItems, TJobItemContent } from './types'
import { BASE_API_URL } from './constants'

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

	useEffect(() => {
		if (!activeId) return

		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_API_URL}/${activeId}`)
				const data = await response.json()
        setJobItemContent(data.jobItem)
			} catch (error) {
        console.log(error)
      }
		}

		fetchData()
	}, [activeId])

	return jobItemContent
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