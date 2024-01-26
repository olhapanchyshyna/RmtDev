import BookmarkIcon from "./BookmarkIcon";

type JobItems = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
}

type JobListItemProps = {
  jobItems : JobItems
}

export default function JobListItem({jobItems}:JobListItemProps) {
  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge">{jobItems.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItems.title}</h3>
          <p className="job-item__company">{jobItems.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItems.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
