
import { forwardRef } from 'react'
import { useBookmarksContext } from '../lib/hooks'
import JobList from './JobList'


const BookmarksPopover = forwardRef<HTMLDivElement>(function (props, ref) {
  const { bookmarkJobItem, isLoading} = useBookmarksContext()

  return <div ref={ref} className="bookmarks-popover">
    <JobList jobItemsSliced={bookmarkJobItem} isLoading={isLoading}/>
  </div>
});

export default BookmarksPopover;