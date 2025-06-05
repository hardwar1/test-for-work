export type EventType =
  | 'sport'
  | 'music'
  | 'seminar'
  | 'meetup';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  type: EventType;
}
