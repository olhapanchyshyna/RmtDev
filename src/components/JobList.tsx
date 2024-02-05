
import { useActiveIdContext } from '../lib/hooks'
import { JobItems } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type JobListProps = {
	jobItemsSliced: JobItems[]
	isLoading: boolean
}
export function JobList({jobItemsSliced, isLoading }: JobListProps) {
	const { activeId } = useActiveIdContext();

	return (
		<ul className='job-list'>
			{isLoading ? (
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
