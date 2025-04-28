export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

export const sortOptions = [
  "creation-date-asc",
  "creation-date-desc",
  "title-asc",
  "title-desc",
] as const;

export type SortOption = (typeof sortOptions)[number];
