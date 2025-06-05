import { Component, output } from '@angular/core';
import { BaseEventFormComponent } from '../base-event-form/base-event-form.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sport-event-form',
  imports: [BaseEventFormComponent, InputTextModule],
  templateUrl: './sport-event-form.component.html',
  styleUrl: './sport-event-form.component.scss',
})
export class SportEventFormComponent {
  formResult = output();
Validators: any;
}
