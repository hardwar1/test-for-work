import { Component, output, OnInit, input, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { IEvent } from '../../../shared/models/IEvent';

@Component({
  selector: 'app-base-event-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './base-event-form.component.html',
  styleUrl: './base-event-form.component.scss',
})
export class BaseEventFormComponent implements OnInit {
  formResult = output<any>();
  extraFields = input<TemplateRef<any> | null>(null);
  extraControls = input<Record<string, any> | undefined>();
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
    });

    const extra = this.extraControls();
    if (extra) {
      for (const [key, value] of Object.entries(extra)) {
        this.eventForm.addControl(
          key,
          this.fb.control(value)
        );
      }
    }
  }

  onSubmit() {
    const formData: IEvent = this.eventForm.value;
    this.formResult.emit(formData);
  }

  onCancel() {
    this.formResult.emit(null);
  }
}
