export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "In Progress" | "Done";
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: "Todo" | "In Progress" | "Done";
}

export interface DraftNote {
  title: string;
  content: string;
  tag: "Todo" | "In Progress" | "Done";
}

export type TagType = "Todo" | "In Progress" | "Done";
