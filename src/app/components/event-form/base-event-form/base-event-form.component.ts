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
  formResult = output<IEvent | null>();
  extraFields = input<TemplateRef<any> | null>(null);
  extraControls = input<Record<string, any> | undefined>();
  eventForEdit = input<IEvent | null | undefined>();

  protected eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.eventForm = this.fb.group({
      title: [
        this.eventForEdit()?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        this.eventForEdit()?.description || '',
        [Validators.required, Validators.minLength(3)],
      ],
      location: [
        this.eventForEdit()?.location || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });

    const extra = this.extraControls();
    if (extra) {
      for (const [key, value] of Object.entries(extra)) {
        this.eventForm.addControl(key, this.fb.control(value));
      }
    }
  }

  protected onSubmit() {
    const formData: IEvent = this.eventForm.value;
    this.resetForm();
    this.formResult.emit(formData);
  }

  resetForm() {
    const defaultValues: Record<string, any> = {
      title: '',
      description: '',
      location: '',
    };

    const extra = this.extraControls();

    if (extra) {
      for (const [key, value] of Object.entries(extra)) {
        defaultValues[key] = Array.isArray(value) ? value[0] : value;
      }
    }

    this.eventForm.reset(defaultValues);
  }

  protected onCancel() {
    this.resetForm();
    this.formResult.emit(null);
  }
}
