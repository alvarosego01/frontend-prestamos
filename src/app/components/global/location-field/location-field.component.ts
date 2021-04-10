import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-location-field',
  templateUrl: './location-field.component.html',
  styleUrls: ['./location-field.component.sass']
})
export class LocationFieldComponent implements OnInit {

  selectedCountry:any;
  forma: FormGroup;
  @Input('test') test:any;
  location: any = {
    paises: [],
    estados: null,
    ciudades: null
  }


  errorFields: any = {
    pais: {
      required: "Por favor, selecciona un país "
    },
    estado: {
      required: "Por favor, escribe un estado o departamento "
    },
    ciudad: {
      required: "Por favor, escribe tu ciudad"


    }

  }

  countriesAuth: string = null;

  // @Input("type") type: string = null;
  @Output() data = new EventEmitter<any>();

  constructor(
    public _formResources: FormsResourcesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {


    this.forma = this.formBuilder.group({

      pais: [ null, [Validators.required] ],
      estado: [ null, [Validators.required] ],
      ciudad: [ null, [Validators.required] ],

    });



    this.setPaises();



  }


  returnData(){

    let pais =(this.forma.value.pais != null)? this.forma.value.pais: null;
    //pais = pais.nativeName;
    let estado  =(this.forma.value.estado != null)? this.forma.value.estado: null;
    //estado = estado.value || null;
    let ciudad  =(this.forma.value.ciudad != null)? this.forma.value.ciudad: null;
    //ciudad = ciudad.value || null;


    let l = {
      pais: pais,
      estado: estado,
      ciudad: ciudad
    }

    this.data.emit(l);

  }



  async setPaises(){


    // await this._formResources.getLatamCountries().subscribe((resp) => {

    //   this.location.paises = resp;

    // }, (err) => {
    //     console.error(err);
    // });

    this.location.paises = this._formResources.getLatamCountries();

    if(this.test.pais !== null){
      this.selectedCountry = this.location.paises.filter(item => {
        return item.nativeName === this.test.pais;
      })[0];
      this.forma.controls.pais.patchValue(this.selectedCountry.nativeName);

      this._formResources.getEstadosCountries(this.selectedCountry.alpha2Code).subscribe((resp) => {

        this.location.estados = resp.result;
        this.forma.controls.estado.patchValue(this.test.department);

        let selectedState = this.getKeyByValue(this.location.estados,this.test.department);
        this._formResources.getEstadosCiudad( selectedState, this.selectedCountry.alpha2Code ).subscribe((resp) => {

          this.location.ciudades = resp.result;
          this.forma.controls.ciudad.patchValue(this.test.city);

        }, (err) => {
           console.error(err);
        });

      }, (err) => {
          console.error(err);
      });

    }
    // await this.setAuthCountrys();


  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

  async selectEstado(estado: string){
    if(estado != null){

      let p = this.getKeyByValue(this.location.estados,estado);
      let pais = this.location.paises.filter(item =>{
        return item.nativeName === this.forma.value.pais;
      })[0];

      await this._formResources.getEstadosCiudad( p, pais.alpha2Code ).subscribe((resp) => {

          this.location.ciudades = resp.result;
          console.log('consulta ciudad', resp);

      }, (err) => {
           console.error(err);
      });

    }

  }


  async selectPais(pais: any){


    if(pais !== null){

      let p = this.location.paises.filter(item =>{
        return item.nativeName === pais;
      })[0];

      await this._formResources.getEstadosCountries(p.alpha2Code).subscribe((resp) => {


        this.location.estados = resp.result;

        this.location.ciudades = null;

      }, (err) => {
          console.error(err);
      });

    }

  }

}
