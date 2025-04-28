export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

export type SortOptions =
  | "creation-date-asc"
  | "creation-date-desc"
  | "title-asc"
  | "title-desc";
