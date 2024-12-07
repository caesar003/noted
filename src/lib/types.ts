export interface NoteInterface {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  tag_ids: number[];
};

export interface TagInterface {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};
