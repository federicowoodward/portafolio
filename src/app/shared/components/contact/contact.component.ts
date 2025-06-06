import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { ToastService } from '../../../core/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TextareaModule,
    TranslateModule,
    ToastModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toast: ToastService,
  ) {}

  form!: FormGroup;
  loading = false;
  sendFailed = false;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      from: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(25)]],
    });

    this.form.statusChanges.subscribe(() => {
      if (this.form.valid) this.toast.clear();
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.error('Error', 'Revisá los campos del formulario');
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.sendFailed = false; // reset error al enviar

    const { name, from, subject, message } = this.form.value;

    this.http
      .post('/api/sendEmail', {
        from,
        subject,
        message: `${name}\n\n${message}`,
      })
      .subscribe({
        next: () => {
          this.toast.success('Éxito', '¡Mensaje enviado correctamente!');
          this.form.reset();
          this.sendFailed = false;
        },
        error: (err) => {
          console.error('Falló el envío:', err);
          this.sendFailed = true;
          this.loading = false;

          if (err.status === 429) {
            this.toast.error(
              'Demasiados intentos',
              'Esperá un momento antes de volver a enviar.',
            );

            this.form.disable();
            setTimeout(() => this.form.enable(), 60_000); // 60 segundos
          } else {
            this.toast.error('Error', 'No se pudo enviar el mensaje.');
          }
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
