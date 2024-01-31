import { ReactNode } from 'react'
import { SortBy } from '../lib/types'

type SortingControlsProps = {
	handleChangeSortBy: (newSort: SortBy) => void
	sortBy: SortBy
}

type SortingButtonProps = {
	handleChangeSortBy: () => void
	children: ReactNode
	isActive: boolean
}

export default function SortingControls({
	handleChangeSortBy,
	sortBy,
}: SortingControlsProps) {
	return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        handleChangeSortBy={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        handleChangeSortBy={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}


function SortingButton({ children, handleChangeSortBy, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={handleChangeSortBy}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}