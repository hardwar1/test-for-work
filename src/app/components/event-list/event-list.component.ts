import { Component, signal } from '@angular/core';
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
    type: 'seminar',
  },
  {
    id: 4,
    title: 'Meetup разработчиков Angular',
    description:
      'Неформальная встреча Angular-разработчиков. Обмен опытом, нетворкинг, обсуждение новых фич фреймворка.',
    location: 'Коворкинг "Точка", 5 этаж',
    type: 'meetup',
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
export class EventListComponent {
  events = mockEvents;
  visible: boolean = false;
  typeDialog = signal<TTypeDialog>('base');
  typeTitle: TTypeTitle = '';

  deleteEvent(id: number) {
    console.log('Удаляем событие с ID:', id);
  }

  showDialog(type: TTypeDialog) {
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

  formResult(data: any) {
    console.log('Данные сохранены', data);
    if (data) {
      this.addEvent(data);
    }

    this.visible = false;
  }

  addEvent(data: any) {

  }
}
