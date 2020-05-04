import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  lat = 40.730610;
  lng = -73.935242;
  formattedAddress = '';
  
  options ={
    ComponentRestrictions : {
      country: ['AU']
    }
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
  }
}