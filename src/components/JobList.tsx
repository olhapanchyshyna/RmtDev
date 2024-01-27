import { useActiveId } from '../lib/hooks'
import { JobItems } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type JobListProps = {
	jobItems: JobItems[]
	isLoadding: boolean
}
export function JobList({ jobItems, isLoadding }: JobListProps) {
	const activeId = useActiveId()

	return (
		<ul className='job-list'>
			{isLoadding ? (
				<Spinner />
			) : (
				jobItems.map(item => {
					return <JobListItem key={item.id} jobItems={item} isActive={item.id === activeId} />
				})
			)}
		</ul>
	)
}

export default JobList
