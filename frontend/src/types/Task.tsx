export default interface Task {
  uuid: string;
  list_id: string;
  name: string;
  description_short: string;
  description_long?: string;
  deadline: Date;
  created_at: Date;
  finished: boolean;
}
