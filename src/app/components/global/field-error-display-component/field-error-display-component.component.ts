import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error-display-component.component.html',
  styleUrls: ['./field-error-display-component.component.sass']
})
export class FieldErrorDisplayComponentComponent implements OnInit {


  @Input() errorMsg: string = null;
  // @Input() errors: any = null;

  // @Input() displayError: boolean = false;


  forma: any = null;

  constructor() { }

  ngOnInit(): void {





  }

}
