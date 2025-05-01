export type Task = {
  id: string;
  title: string;
  description: string;
  status: 0 | 1 | 2 | 3;
  createdAt: Date;
};
