export type EventType =
  | 'sport'
  | 'music'
  | 'base';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  location: string;
  type: EventType;
  genreMusic?: string;
  participants?: number;
}
