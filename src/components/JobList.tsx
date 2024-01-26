import JobListItem from './JobListItem'
import Spinner from './Spinner'

export function JobList({ jobItems, isLoadding }) {
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
