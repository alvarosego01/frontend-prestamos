import { Component, Input, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.sass']
})
export class ClientDetailComponent implements OnInit {
  @Input() cliente: any;
  payments:any;
  constructor(private clientService: ClientesService) { }

  ngOnInit(): void {
    this.clientService.getClientPayments(this.cliente._id).subscribe(response => {
      console.log('cliente', this.cliente);

      this.payments = response.data;
      console.log('Payments', this.payments);
    });
  }

}
