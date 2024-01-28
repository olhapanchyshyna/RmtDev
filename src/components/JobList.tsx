import { useActiveId } from '../lib/hooks'
import { JobItems } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type JobListProps = {
	jobItemsSliced: JobItems[]
	isLoadding: boolean
}
export function JobList({ jobItemsSliced, isLoadding }: JobListProps) {
	const activeId = useActiveId()

	return (
		<ul className='job-list'>
			{isLoadding ? (
				<Spinner />
			) : (
				jobItemsSliced.map(item => {
					return <JobListItem key={item.id} jobItems={item} isActive={item.id === activeId} />
				})
			)}
		</ul>
	)
}

export default JobList
