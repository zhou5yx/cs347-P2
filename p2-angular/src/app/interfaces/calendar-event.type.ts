export interface ICalendarEvent {
  id: number;
  start_date: Date;
  course_id: number;
  type: string;
  end_date: Date;
  location: number;
  user_id: number;
  requestee?: number;
}
