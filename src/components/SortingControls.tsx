import { ReactNode } from 'react'
import { useJobItemsContext } from '../lib/hooks'


type SortingButtonProps = {
	setChangeSortBy: () => void
	children: ReactNode
	isActive: boolean
}

export default function SortingControls() {

  const { sortBy, handleChangeSortBy } = useJobItemsContext()

	return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        setChangeSortBy={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      
      <SortingButton
        setChangeSortBy={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}


function SortingButton({ children, setChangeSortBy, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={setChangeSortBy}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}