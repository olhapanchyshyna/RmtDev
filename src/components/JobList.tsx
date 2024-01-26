import JobListItem from './JobListItem'


export function JobList({ jobItems }) {
	return (
		<ul className='job-list'>
			{jobItems.map((item) => {
				return <JobListItem key={item.id} jobItems={item}/>
			})}
      
		</ul>
	)
}

export default JobList
