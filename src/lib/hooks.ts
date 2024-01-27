import { useEffect, useState } from 'react'
import { JobItems } from './types'

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
					`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
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