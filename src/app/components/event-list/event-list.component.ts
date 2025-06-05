import { Component, OnInit, signal } from '@angular/core';
import { IEvent } from '../../shared/models/IEvent';
import { ButtonModule } from 'primeng/button';
import { BtnDirective } from '../../shared/ui-kit/button.directive';
import { DialogModule } from 'primeng/dialog';
import { BaseEventFormComponent } from '../event-form/base-event-form/base-event-form.component';
import { SportEventFormComponent } from '../event-form/sport-event-form/sport-event-form.component';
import { MusicEventFormComponent } from '../event-form/music-event-form/music-event-form.component';

export const mockEvents: IEvent[] = [
  {
    id: 1,
    title: 'Городской марафон 2024',
    description:
      'Ежегодный марафон по центральным улицам города. Дистанции: 5км, 10км, 21км и 42км. Регистрация обязательна.',
    location: 'Центральный парк',
    type: 'sport',
  },
  {
    id: 2,
    title: 'Концерт джазового квартета',
    description:
      'Выступление известного джазового коллектива с программой из классических и современных композиций.',
    location: 'Филармония им. Чайковского',
    type: 'music',
  },
  {
    id: 3,
    title: 'Семинар по веб-разработке',
    description:
      'Изучаем современные подходы к фронтенд разработке. Angular, React, Vue.js. Практические примеры и live coding.',
    location: 'IT-Hub, конференц-зал А',
    type: 'base',
  },
  {
    id: 4,
    title: 'Meetup разработчиков Angular',
    description:
      'Неформальная встреча Angular-разработчиков. Обмен опытом, нетворкинг, обсуждение новых фич фреймворка.',
    location: 'Коворкинг "Точка", 5 этаж',
    type: 'base',
  },
];

type TTypeDialog = 'base' | 'sport' | 'music';
type TTypeTitle = '' | 'спортивное' | 'музыкальное';

@Component({
  selector: 'app-event-list',
  imports: [
    ButtonModule,
    BtnDirective,
    DialogModule,
    BaseEventFormComponent,
    SportEventFormComponent,
    MusicEventFormComponent,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  protected events = signal<IEvent[]>([]); // <= состояние приложение в сигнале, спецом пишу вдруг, вопросы будут
  protected visible: boolean = false;
  protected typeDialog = signal<TTypeDialog>('base');
  protected typeTitle: TTypeTitle = '';
  protected eventForEdit = signal<IEvent | null>(null);

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const loaded = localStorage.getItem('eventList');

    if (loaded) {
      this.events.set(JSON.parse(loaded));
    } else {
      this.events.set(mockEvents);
    }
  }

  private saveData() {
    localStorage.setItem('eventList', JSON.stringify(this.events()));
  }

  protected showDialog(type: TTypeDialog) {
    this.typeDialog.set(type);
    switch (type) {
      case 'base':
        this.typeTitle = '';
        break;
      case 'sport':
        this.typeTitle = 'спортивное';
        break;
      case 'music':
        this.typeTitle = 'музыкальное';
        break;
    }

    this.visible = true;
  }

  protected formResult(event: IEvent | null) {
    if (event && !this.eventForEdit()) {
      this.addEvent(event);
    }

    if (event && this.eventForEdit()) {
      event.id = (this.eventForEdit() as IEvent).id;
      this.eventForEdit.set(null);
      this.saveEditEvent(event);
    }

    this.visible = false;
  }

  private addEvent(event: IEvent) {
    if (event.participants) {
      event.type = 'sport';
    }

    if (event.genreMusic) {
      event.type = 'music';
    }

    if (!event.genreMusic && !event.participants) {
      event.type = 'base';
    }

    event.id = new Date().getTime();

    const saveEvents = this.events();
    saveEvents.push(event);
    this.events.set(saveEvents);

    this.saveData();
  }

  protected deleteEvent(id: number) {
    let newArray = this.events();
    newArray = newArray.filter((event) => event.id !== id);
    this.events.set(newArray);
    this.saveData();
  }

  protected openEdit(editEvent: IEvent) {
    this.eventForEdit.set(editEvent);
    this.showDialog(editEvent.type);
  }

  private saveEditEvent(editEvent: IEvent) {
    const updatedArray = this.events().map((event) => {
      if (event.id === editEvent.id) {
        return {
          ...event,
          ...editEvent,
        };
      }
      return event;
    });

    this.events.set(updatedArray);
    this.saveData();
  }
}
