export type JobItems = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
}

export type TJobItemContent = JobItems & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
}

export type PageDirection = 'next' | 'prev'
export type SortBy = 'relevant' | 'recent'  