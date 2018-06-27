import { Component } from '@angular/core';

/**
 * Generated class for the TesteComponenteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'teste-componente',
  templateUrl: 'teste-componente.html'
})
export class TesteComponenteComponent {

  text: string;

  constructor() {
    console.log('Hello TesteComponenteComponent Component');
    this.text = 'Hello World';
  }

}
