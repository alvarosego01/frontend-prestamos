import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  spinner: boolean = false;

  constructor() { }
}
