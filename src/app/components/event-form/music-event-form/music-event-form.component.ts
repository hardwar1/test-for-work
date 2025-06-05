import { Component, input, output } from '@angular/core';
import { BaseEventFormComponent } from '../base-event-form/base-event-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { Validators } from '@angular/forms';
import { IEvent } from '../../../shared/models/IEvent';

@Component({
  selector: 'app-music-event-form',
  imports: [BaseEventFormComponent, InputTextModule],
  templateUrl: './music-event-form.component.html',
  styleUrl: './music-event-form.component.scss'
})
export class MusicEventFormComponent {
  formResult = output<IEvent | null>();
  eventForEdit = input<IEvent | null | undefined>();
  protected Validators = Validators;
}
