import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-location-field',
  templateUrl: './location-field.component.html',
  styleUrls: ['./location-field.component.sass']
})
export class LocationFieldComponent implements OnInit {


  forma: FormGroup;

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

    let pais =(this.forma.value.pais != null)? JSON.parse(this.forma.value.pais): null;
    pais = pais.nativeName;
    let estado  =(this.forma.value.estado != null)? JSON.parse(this.forma.value.estado): null;
    estado = estado.value || null;
    let ciudad  =(this.forma.value.ciudad != null)? JSON.parse(this.forma.value.ciudad): null;
    ciudad = ciudad.value || null;


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
    console.log('paises', this.location.paises);
    // await this.setAuthCountrys();

  }

  async selectEstado(estado: string){

    if(estado != null){

      let p = JSON.parse(estado);
      p = p.key;
      let pais = JSON.parse(this.forma.value.pais);
      pais = pais.alpha2Code;

      await this._formResources.getEstadosCiudad( p, pais ).subscribe((resp) => {

          this.location.ciudades = resp.result;
          console.log('consulta ciudad', resp);

      }, (err) => {
           console.error(err);
      });

    }

  }


  async selectPais(pais: any){



    if(pais != null){

      let p = JSON.parse(pais);

      await this._formResources.getEstadosCountries(p.alpha2Code).subscribe((resp) => {


        console.log('consulta estados', resp.result);

        this.location.estados = resp.result;

        this.location.ciudades = null;

      }, (err) => {
          console.error(err);
      });

    }

  }

}
