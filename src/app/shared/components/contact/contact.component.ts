import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { MessagesModule } from 'primeng/messages';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TextareaModule,
    MessagesModule,
    TranslateModule,
  ],
})
export class ContactComponent {
  from = '';
  subject = '';
  message = '';
  name = '';
  success = false;
  error = '';
  msgs: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.success = false;
    this.error = '';
    this.msgs = [];

    this.http
      .post('/api/sendEmail', {
        from: this.from,
        subject: this.subject,
        message: `${this.name}\n\n${this.message}`,
      })
      .subscribe({
        next: () => {
          this.success = true;
          this.msgs = [
            {
              severity: 'success',
              detail: '¡Mensaje enviado correctamente!',
            },
          ];
        },
        error: (err) => {
          console.error('Falló el envío:', err);
          this.error =
            'No se pudo enviar el mensaje. Podés escribirme directamente a woodfederico@gmail.com.';
          this.msgs = [
            {
              severity: 'error',
              detail: this.error,
            },
          ];
        },
      });
  }
}
