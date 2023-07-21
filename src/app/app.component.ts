import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formulario!: FormGroup;

  paises = [
    { label: 'Estados Unidos', value: 'US', mascara: '(+01) (999) 999-9999' },
    { label: 'Costa Rica', value: 'CR', mascara: '(+506) 9999-9999' },
    { label: 'Alemania', value: 'DE', mascara: '(+49) (999) 999-9999' },
    // Agrega más países aquí con sus códigos de país y máscaras
  ];

  mascaraTelefono: string;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      pais: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  actualizarMascaraTelefono() {
    const paisSeleccionado = this.formulario.get('pais').value;
    const paisSeleccionadoInfo = this.paises.find(
      (pais) => pais.value === paisSeleccionado
    );
    if (paisSeleccionadoInfo) {
      this.formulario.get('telefono').setValue(''); // Reiniciar el valor del teléfono
      this.formulario.get('telefono').setValidators([Validators.required]); // Agregar validador de requerido
      this.formulario.get('telefono').updateValueAndValidity(); // Actualizar validación
      this.formulario.get('telefono').markAsUntouched(); // Marcar el campo como no tocado
      this.formulario.get('telefono').markAsPristine(); // Marcar el campo como no modificado
      this.formulario.get('telefono').markAsPending(); // Marcar el campo como pendiente
      this.formulario.get('telefono').markAsPristine();
      this.formulario.get('telefono').updateValueAndValidity();
      this.formulario.get('telefono').setValue(''); // Reiniciar el valor del teléfono
      this.mascaraTelefono = paisSeleccionadoInfo.mascara;
    } else {
      this.formulario.get('telefono').clearValidators(); // Limpiar validadores
      this.formulario.get('telefono').updateValueAndValidity(); // Actualizar validación
      this.mascaraTelefono = ''; // Si no se encuentra el país seleccionado, se borra la máscara
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      // Aquí puedes realizar las acciones necesarias cuando el formulario es válido
      console.log(this.formulario.value);
    } else {
      // Aquí puedes manejar los errores o mostrar mensajes al usuario
      console.log('El formulario no es válido');
    }
  }
}
