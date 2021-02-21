import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import IMask from "imask";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SessionService } from "./session.service";




@Injectable({
  providedIn: "root",
})
export class FormsResourcesService {

  // https://restcountries.eu/rest/v2/regionalbloc/usan
  apiPaises: string = environment._API_COUNTRIES;
  _BATTUTA_API_KEY: string = environment._BATTUTA_KEY;

  _API_LOCATION: string = environment._API_LOCATION;
  _KEY_LOCATION: string = environment._KEY_LOCATION;


  constructor(
    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,
  ) { }

  instagramMask() {
    let patternMask = {
      mask: "{https://www.inst\\agr\\am.com/}string",
      blocks: {
        string: {
          // nested masks are available!
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;
  }

  facebookMask() {
    let patternMask = {
      mask: "{https://www.f\\acebook.com/}string",
      blocks: {
        string: {
          // nested masks are available!
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;
  }

  phoneMask() {
    let maskModel = {
      mask: "000000000000",
      lazy: true,
    };
    return maskModel;
  }

  moneyMask() {
    let maskModel = {
      mask: "num",
      blocks: {
        num: {
          // nested masks are available!
          mask: Number,
          thousandsSeparator: ".",
          scale: 0,
          // signed: false,
          // thousandsSeparator: ",",
          // padFractionalZeros: false,
          // normalizeZeros: true,
        },
        lazy: false,
      },
      lazy: false,
    };
    return maskModel;
  }

  webPage() {
    let maskModel = {
      // mask: 'urle',:{
      mask: "{www.}urle{.}com{/}",
      lazy: false,
      blocks: {
        urle: {
          mask: /^\w+$/,
        },
        com: {
          mask: /^\w+$/,
        },
        lazy: false,
      },
    };

    return maskModel;
  }


  userRedes() {

    let patternMask = {
      mask: "{@}string",
      blocks: {
        string: {
          // nested masks are available!
          // mask: /^\w+$/,
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;

  }



  validUrl(url: string) {


    let l = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return l.test(url);

  }




  checkUrl(s) {
    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    return regexp.test(s);
  }



  minSelectCheckBox(min: number, modelo: any, max: number = null) {

    let n = 0;

    modelo.forEach(async (ele, idx) => {

      if (ele.checked == true) {
        n++;
      }

    });

    if (
      ((min != null) && (n < min)) ||
      ((max != null) && (n > max)) ||
      (n == 0)
    ) {

      return true;

    } else {
      return false;
    }

  }


  emptyField(id) {

    // document.getElementById('fechaPautas')
    // ////// //console.log('emptyfield', id);
    // let l: any = document.getElementById(id).value;
    let l: any = (document.getElementById(id) as HTMLInputElement).value;

    if (l == '' || l == null) {
      return true;
    } else {
      return false;
    }


  }


  // isFieldValid(field: string, form) {
  //   return !form.get(field).valid && form.get(field).touched;
  // }

  // displayFieldCss(field: string, form) {
  //   return {
  //     'has-error': this.isFieldValid(field, form),
  //     'has-feedback': this.isFieldValid(field, form)
  //   };
  // }



  isFieldValid(field: string, form: FormGroup) {

    // return !this.form.get(field).status  && this.form.get(field).touched;

    if( (form.get(field)) && (form.get(field).status != 'VALID') && (form.get(field).touched)){
      return true;
    }else{
      return false
    }
    // status
    // return true;

  }

  displayFieldCss(field: string, form: FormGroup) {

    return {
      'has-error': this.isFieldValid(field, form),
      'has-feedback': this.isFieldValid(field, form)
    };

  }




  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }




  displayPassHide(fieldTextType: boolean){

    return { 'fa-eye-slash': !fieldTextType, 'fa-eye': fieldTextType };



  }



  getLatamCountries(){

    // let url = this.apiPaises;

    // return this.http.get(url).pipe(
    //     map((resp: any) => {
    //     return resp;
    // }),
    // catchError((err) => {
    //     return throwError(err);
    // })
    // );


    return [
      {
          "name": "Argentina",
          "topLevelDomain": [
              ".ar"
          ],
          "alpha2Code": "AR",
          "alpha3Code": "ARG",
          "callingCodes": [
              "54"
          ],
          "capital": "Buenos Aires",
          "altSpellings": [
              "AR",
              "Argentine Republic",
              "República Argentina"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 43590400,
          "latlng": [
              -34.0,
              -64.0
          ],
          "demonym": "Argentinean",
          "area": 2780400.0,
          "gini": 44.5,
          "timezones": [
              "UTC-03:00"
          ],
          "borders": [
              "BOL",
              "BRA",
              "CHL",
              "PRY",
              "URY"
          ],
          "nativeName": "Argentina",
          "numericCode": "032",
          "currencies": [
              {
                  "code": "ARS",
                  "name": "Argentine peso",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              },
              {
                  "iso639_1": "gn",
                  "iso639_2": "grn",
                  "name": "Guaraní",
                  "nativeName": "Avañe'ẽ"
              }
          ],
          "translations": {
              "de": "Argentinien",
              "es": "Argentina",
              "fr": "Argentine",
              "ja": "アルゼンチン",
              "it": "Argentina",
              "br": "Argentina",
              "pt": "Argentina",
              "nl": "Argentinië",
              "hr": "Argentina",
              "fa": "آرژانتین"
          },
          "flag": "https://restcountries.eu/data/arg.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "ARG"
      },
      {
          "name": "Bolivia (Plurinational State of)",
          "topLevelDomain": [
              ".bo"
          ],
          "alpha2Code": "BO",
          "alpha3Code": "BOL",
          "callingCodes": [
              "591"
          ],
          "capital": "Sucre",
          "altSpellings": [
              "BO",
              "Buliwya",
              "Wuliwya",
              "Plurinational State of Bolivia",
              "Estado Plurinacional de Bolivia",
              "Buliwya Mamallaqta",
              "Wuliwya Suyu",
              "Tetã Volívia"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 10985059,
          "latlng": [
              -17.0,
              -65.0
          ],
          "demonym": "Bolivian",
          "area": 1098581.0,
          "gini": 56.3,
          "timezones": [
              "UTC-04:00"
          ],
          "borders": [
              "ARG",
              "BRA",
              "CHL",
              "PRY",
              "PER"
          ],
          "nativeName": "Bolivia",
          "numericCode": "068",
          "currencies": [
              {
                  "code": "BOB",
                  "name": "Bolivian boliviano",
                  "symbol": "Bs."
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              },
              {
                  "iso639_1": "ay",
                  "iso639_2": "aym",
                  "name": "Aymara",
                  "nativeName": "aymar aru"
              },
              {
                  "iso639_1": "qu",
                  "iso639_2": "que",
                  "name": "Quechua",
                  "nativeName": "Runa Simi"
              }
          ],
          "translations": {
              "de": "Bolivien",
              "es": "Bolivia",
              "fr": "Bolivie",
              "ja": "ボリビア多民族国",
              "it": "Bolivia",
              "br": "Bolívia",
              "pt": "Bolívia",
              "nl": "Bolivia",
              "hr": "Bolivija",
              "fa": "بولیوی"
          },
          "flag": "https://restcountries.eu/data/bol.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "BOL"
      },
      {
          "name": "Brazil",
          "topLevelDomain": [
              ".br"
          ],
          "alpha2Code": "BR",
          "alpha3Code": "BRA",
          "callingCodes": [
              "55"
          ],
          "capital": "Brasília",
          "altSpellings": [
              "BR",
              "Brasil",
              "Federative Republic of Brazil",
              "República Federativa do Brasil"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 206135893,
          "latlng": [
              -10.0,
              -55.0
          ],
          "demonym": "Brazilian",
          "area": 8515767.0,
          "gini": 54.7,
          "timezones": [
              "UTC-05:00",
              "UTC-04:00",
              "UTC-03:00",
              "UTC-02:00"
          ],
          "borders": [
              "ARG",
              "BOL",
              "COL",
              "GUF",
              "GUY",
              "PRY",
              "PER",
              "SUR",
              "URY",
              "VEN"
          ],
          "nativeName": "Brasil",
          "numericCode": "076",
          "currencies": [
              {
                  "code": "BRL",
                  "name": "Brazilian real",
                  "symbol": "R$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "pt",
                  "iso639_2": "por",
                  "name": "Portuguese",
                  "nativeName": "Português"
              }
          ],
          "translations": {
              "de": "Brasilien",
              "es": "Brasil",
              "fr": "Brésil",
              "ja": "ブラジル",
              "it": "Brasile",
              "br": "Brasil",
              "pt": "Brasil",
              "nl": "Brazilië",
              "hr": "Brazil",
              "fa": "برزیل"
          },
          "flag": "https://restcountries.eu/data/bra.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "BRA"
      },
      {
          "name": "Chile",
          "topLevelDomain": [
              ".cl"
          ],
          "alpha2Code": "CL",
          "alpha3Code": "CHL",
          "callingCodes": [
              "56"
          ],
          "capital": "Santiago",
          "altSpellings": [
              "CL",
              "Republic of Chile",
              "República de Chile"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 18191900,
          "latlng": [
              -30.0,
              -71.0
          ],
          "demonym": "Chilean",
          "area": 756102.0,
          "gini": 52.1,
          "timezones": [
              "UTC-06:00",
              "UTC-04:00"
          ],
          "borders": [
              "ARG",
              "BOL",
              "PER"
          ],
          "nativeName": "Chile",
          "numericCode": "152",
          "currencies": [
              {
                  "code": "CLP",
                  "name": "Chilean peso",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Chile",
              "es": "Chile",
              "fr": "Chili",
              "ja": "チリ",
              "it": "Cile",
              "br": "Chile",
              "pt": "Chile",
              "nl": "Chili",
              "hr": "Čile",
              "fa": "شیلی"
          },
          "flag": "https://restcountries.eu/data/chl.svg",
          "regionalBlocs": [
              {
                  "acronym": "PA",
                  "name": "Pacific Alliance",
                  "otherAcronyms": [],
                  "otherNames": [
                      "Alianza del Pacífico"
                  ]
              },
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "CHI"
      },
      {
          "name": "Colombia",
          "topLevelDomain": [
              ".co"
          ],
          "alpha2Code": "CO",
          "alpha3Code": "COL",
          "callingCodes": [
              "57"
          ],
          "capital": "Bogotá",
          "altSpellings": [
              "CO",
              "Republic of Colombia",
              "República de Colombia"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 48759958,
          "latlng": [
              4.0,
              -72.0
          ],
          "demonym": "Colombian",
          "area": 1141748.0,
          "gini": 55.9,
          "timezones": [
              "UTC-05:00"
          ],
          "borders": [
              "BRA",
              "ECU",
              "PAN",
              "PER",
              "VEN"
          ],
          "nativeName": "Colombia",
          "numericCode": "170",
          "currencies": [
              {
                  "code": "COP",
                  "name": "Colombian peso",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Kolumbien",
              "es": "Colombia",
              "fr": "Colombie",
              "ja": "コロンビア",
              "it": "Colombia",
              "br": "Colômbia",
              "pt": "Colômbia",
              "nl": "Colombia",
              "hr": "Kolumbija",
              "fa": "کلمبیا"
          },
          "flag": "https://restcountries.eu/data/col.svg",
          "regionalBlocs": [
              {
                  "acronym": "PA",
                  "name": "Pacific Alliance",
                  "otherAcronyms": [],
                  "otherNames": [
                      "Alianza del Pacífico"
                  ]
              },
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "COL"
      },
      {
          "name": "Ecuador",
          "topLevelDomain": [
              ".ec"
          ],
          "alpha2Code": "EC",
          "alpha3Code": "ECU",
          "callingCodes": [
              "593"
          ],
          "capital": "Quito",
          "altSpellings": [
              "EC",
              "Republic of Ecuador",
              "República del Ecuador"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 16545799,
          "latlng": [
              -2.0,
              -77.5
          ],
          "demonym": "Ecuadorean",
          "area": 276841.0,
          "gini": 49.3,
          "timezones": [
              "UTC-06:00",
              "UTC-05:00"
          ],
          "borders": [
              "COL",
              "PER"
          ],
          "nativeName": "Ecuador",
          "numericCode": "218",
          "currencies": [
              {
                  "code": "USD",
                  "name": "United States dollar",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Ecuador",
              "es": "Ecuador",
              "fr": "Équateur",
              "ja": "エクアドル",
              "it": "Ecuador",
              "br": "Equador",
              "pt": "Equador",
              "nl": "Ecuador",
              "hr": "Ekvador",
              "fa": "اکوادور"
          },
          "flag": "https://restcountries.eu/data/ecu.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "ECU"
      },

      {
          "name": "Paraguay",
          "topLevelDomain": [
              ".py"
          ],
          "alpha2Code": "PY",
          "alpha3Code": "PRY",
          "callingCodes": [
              "595"
          ],
          "capital": "Asunción",
          "altSpellings": [
              "PY",
              "Republic of Paraguay",
              "República del Paraguay",
              "Tetã Paraguái"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 6854536,
          "latlng": [
              -23.0,
              -58.0
          ],
          "demonym": "Paraguayan",
          "area": 406752.0,
          "gini": 52.4,
          "timezones": [
              "UTC-04:00"
          ],
          "borders": [
              "ARG",
              "BOL",
              "BRA"
          ],
          "nativeName": "Paraguay",
          "numericCode": "600",
          "currencies": [
              {
                  "code": "PYG",
                  "name": "Paraguayan guaraní",
                  "symbol": "₲"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              },
              {
                  "iso639_1": "gn",
                  "iso639_2": "grn",
                  "name": "Guaraní",
                  "nativeName": "Avañe'ẽ"
              }
          ],
          "translations": {
              "de": "Paraguay",
              "es": "Paraguay",
              "fr": "Paraguay",
              "ja": "パラグアイ",
              "it": "Paraguay",
              "br": "Paraguai",
              "pt": "Paraguai",
              "nl": "Paraguay",
              "hr": "Paragvaj",
              "fa": "پاراگوئه"
          },
          "flag": "https://restcountries.eu/data/pry.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "PAR"
      },
      {
          "name": "Peru",
          "topLevelDomain": [
              ".pe"
          ],
          "alpha2Code": "PE",
          "alpha3Code": "PER",
          "callingCodes": [
              "51"
          ],
          "capital": "Lima",
          "altSpellings": [
              "PE",
              "Republic of Peru",
              " República del Perú"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 31488700,
          "latlng": [
              -10.0,
              -76.0
          ],
          "demonym": "Peruvian",
          "area": 1285216.0,
          "gini": 48.1,
          "timezones": [
              "UTC-05:00"
          ],
          "borders": [
              "BOL",
              "BRA",
              "CHL",
              "COL",
              "ECU"
          ],
          "nativeName": "Perú",
          "numericCode": "604",
          "currencies": [
              {
                  "code": "PEN",
                  "name": "Peruvian sol",
                  "symbol": "S/."
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Peru",
              "es": "Perú",
              "fr": "Pérou",
              "ja": "ペルー",
              "it": "Perù",
              "br": "Peru",
              "pt": "Peru",
              "nl": "Peru",
              "hr": "Peru",
              "fa": "پرو"
          },
          "flag": "https://restcountries.eu/data/per.svg",
          "regionalBlocs": [
              {
                  "acronym": "PA",
                  "name": "Pacific Alliance",
                  "otherAcronyms": [],
                  "otherNames": [
                      "Alianza del Pacífico"
                  ]
              },
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "PER"
      },

      {
          "name": "Suriname",
          "topLevelDomain": [
              ".sr"
          ],
          "alpha2Code": "SR",
          "alpha3Code": "SUR",
          "callingCodes": [
              "597"
          ],
          "capital": "Paramaribo",
          "altSpellings": [
              "SR",
              "Sarnam",
              "Sranangron",
              "Republic of Suriname",
              "Republiek Suriname"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 541638,
          "latlng": [
              4.0,
              -56.0
          ],
          "demonym": "Surinamer",
          "area": 163820.0,
          "gini": 52.9,
          "timezones": [
              "UTC-03:00"
          ],
          "borders": [
              "BRA",
              "GUF",
              "FRA",
              "GUY"
          ],
          "nativeName": "Suriname",
          "numericCode": "740",
          "currencies": [
              {
                  "code": "SRD",
                  "name": "Surinamese dollar",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "nl",
                  "iso639_2": "nld",
                  "name": "Dutch",
                  "nativeName": "Nederlands"
              }
          ],
          "translations": {
              "de": "Suriname",
              "es": "Surinam",
              "fr": "Surinam",
              "ja": "スリナム",
              "it": "Suriname",
              "br": "Suriname",
              "pt": "Suriname",
              "nl": "Suriname",
              "hr": "Surinam",
              "fa": "سورینام"
          },
          "flag": "https://restcountries.eu/data/sur.svg",
          "regionalBlocs": [
              {
                  "acronym": "CARICOM",
                  "name": "Caribbean Community",
                  "otherAcronyms": [],
                  "otherNames": [
                      "Comunidad del Caribe",
                      "Communauté Caribéenne",
                      "Caribische Gemeenschap"
                  ]
              },
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "SUR"
      },
      {
          "name": "Uruguay",
          "topLevelDomain": [
              ".uy"
          ],
          "alpha2Code": "UY",
          "alpha3Code": "URY",
          "callingCodes": [
              "598"
          ],
          "capital": "Montevideo",
          "altSpellings": [
              "UY",
              "Oriental Republic of Uruguay",
              "República Oriental del Uruguay"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 3480222,
          "latlng": [
              -33.0,
              -56.0
          ],
          "demonym": "Uruguayan",
          "area": 181034.0,
          "gini": 39.7,
          "timezones": [
              "UTC-03:00"
          ],
          "borders": [
              "ARG",
              "BRA"
          ],
          "nativeName": "Uruguay",
          "numericCode": "858",
          "currencies": [
              {
                  "code": "UYU",
                  "name": "Uruguayan peso",
                  "symbol": "$"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Uruguay",
              "es": "Uruguay",
              "fr": "Uruguay",
              "ja": "ウルグアイ",
              "it": "Uruguay",
              "br": "Uruguai",
              "pt": "Uruguai",
              "nl": "Uruguay",
              "hr": "Urugvaj",
              "fa": "اروگوئه"
          },
          "flag": "https://restcountries.eu/data/ury.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "URU"
      },
      {
          "name": "Venezuela (Bolivarian Republic of)",
          "topLevelDomain": [
              ".ve"
          ],
          "alpha2Code": "VE",
          "alpha3Code": "VEN",
          "callingCodes": [
              "58"
          ],
          "capital": "Caracas",
          "altSpellings": [
              "VE",
              "Bolivarian Republic of Venezuela",
              "República Bolivariana de Venezuela"
          ],
          "region": "Americas",
          "subregion": "South America",
          "population": 31028700,
          "latlng": [
              8.0,
              -66.0
          ],
          "demonym": "Venezuelan",
          "area": 916445.0,
          "gini": 44.8,
          "timezones": [
              "UTC-04:00"
          ],
          "borders": [
              "BRA",
              "COL",
              "GUY"
          ],
          "nativeName": "Venezuela",
          "numericCode": "862",
          "currencies": [
              {
                  "code": "VEF",
                  "name": "Venezuelan bolívar",
                  "symbol": "Bs F"
              }
          ],
          "languages": [
              {
                  "iso639_1": "es",
                  "iso639_2": "spa",
                  "name": "Spanish",
                  "nativeName": "Español"
              }
          ],
          "translations": {
              "de": "Venezuela",
              "es": "Venezuela",
              "fr": "Venezuela",
              "ja": "ベネズエラ・ボリバル共和国",
              "it": "Venezuela",
              "br": "Venezuela",
              "pt": "Venezuela",
              "nl": "Venezuela",
              "hr": "Venezuela",
              "fa": "ونزوئلا"
          },
          "flag": "https://restcountries.eu/data/ven.svg",
          "regionalBlocs": [
              {
                  "acronym": "USAN",
                  "name": "Union of South American Nations",
                  "otherAcronyms": [
                      "UNASUR",
                      "UNASUL",
                      "UZAN"
                  ],
                  "otherNames": [
                      "Unión de Naciones Suramericanas",
                      "União de Nações Sul-Americanas",
                      "Unie van Zuid-Amerikaanse Naties",
                      "South American Union"
                  ]
              }
          ],
          "cioc": "VEN"
      }
  ]


  }

  getLocationAuth(){

//     _API_LOCATION
// _KEY_LOCATION

    const headers = new HttpHeaders({
      // 'Content-Type':'application/json; charset=utf-8'
      "Accept": "application/json",
      "api-token": this._KEY_LOCATION,
      "user-email": "alvarosego01@gmail.com"

    });

    let url = `${this._API_LOCATION}/getaccesstoken`;

    return this.http.get(url, { headers: headers }).pipe(
        map((resp: any) => {
          return resp;
        }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  getEstadosCountries(pais: string){


    let url = `${this._API_LOCATION}/?type=getStates&countryId=${pais}`;

    const headers = new HttpHeaders({

      "Accept": "application/json",
    //   "Authorization": ""

    });


    return this.http.get(url, {headers: headers}).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );


  }

  getEstadosCiudad(estado: string, pais: string){

    let url = `${this._API_LOCATION}/?type=getCities&countryId=${pais}&stateId=${estado}`;

    // var url = rootUrl+'?type=confCity&countryId='+ jQuery('#countryId option:selected').attr('countryid') +'&stateId=' + jQuery('#stateId option:selected').attr('stateid') + '&cityId=' + id;

    const headers = new HttpHeaders({
      // 'Content-Type':'application/json; charset=utf-8'
      // "Authorization": `Bearer ${token}`,
      "Accept": "application/json"

    });

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );


  }






}
