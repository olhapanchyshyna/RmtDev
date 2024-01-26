import { useEffect, useState } from 'react'

export function useJobItems(searchText: string) {
	const [jobItems, setjobItems] = useState([])
  const [isLoadding, setIsLoadding] = useState(false)

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
		jobItems,
		isLoadding
	}
}