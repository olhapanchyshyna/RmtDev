import { JobItems } from '../lib/types'
import JobListItem from './JobListItem'
import Spinner from './Spinner'

type JobListProps = {
	jobItems: JobItems[]
	isLoadding: boolean
}
export function JobList({ jobItems, isLoadding }: JobListProps) {
	return (
		<ul className='job-list'>
			{isLoadding ? (
				<Spinner />
			) : (
				jobItems.map(item => {
					return <JobListItem key={item.id} jobItems={item} />
				})
			)}
		</ul>
	)
}

export default JobList
