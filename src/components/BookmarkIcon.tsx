import { BookmarkFilledIcon } from "@radix-ui/react-icons"
import { BookmarksContext } from '../contexts/BookmarksContextProvider'
import { useContext } from 'react'

type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({id}: BookmarkIconProps) {
  const { bookmarkId, handleToogleBookmarkId}  = useContext(BookmarksContext)

  return (
    <button onClick={() => handleToogleBookmarkId(id)} className="bookmark-btn">
      <BookmarkFilledIcon className={`${bookmarkId.includes(id) ? 'filled' : null}`} />
    </button>
  );
}
