export type Status = "Pending" | "In Progress" | "Completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
}
