import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

  title: string = 'AGM';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  public mapStyles = [
    {
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.government",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
          ]
      },
      {
        "featureType": "poi.school",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
          ]
      },
      {
        "featureType": "poi.place_of_worship",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
          ]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "on"
          }
          ]
      },
      {
        "elementType": "geometry",
        "stylers": [
          {
            "hue": "#ff4400"
          },
          {
            "saturation": -100
          },
          {
            "lightness": -4
          },
          {
            "gamma": 0.72
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon"
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
          {
            "hue": "#0077ff"
          },
          {
            "gamma": 3.1
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "hue": "#000000"
          },
          {
            "gamma": 0.44
          },
          {
            "saturation": -33
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [
          {
            "hue": "#44ff00"
          },
          {
            "saturation": -23
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "hue": "#007fff"
          },
          {
            "gamma": 0.77
          },
          {
            "saturation": 65
          },
          {
            "lightness": 99
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "gamma": 0.11
          },
          {
            "weight": 5.6
          },
          {
            "saturation": 99
          },
          {
            "hue": "#0091ff"
          },
          {
            "lightness": -86
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": -48
          },
          {
            "hue": "#ff5e00"
          },
          {
            "gamma": 1.2
          },
          {
            "saturation": -23
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "saturation": -64
          },
          {
            "hue": "#ff9100"
          },
          {
            "lightness": 16
          },
          {
            "gamma": 0.47
          },
          {
            "weight": 2.7
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
  ];

  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: "X"
}

 
  @ViewChild('search')
  public searchElementRef: ElementRef;
 
 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  /*lat = 40.730610;
  lng = -73.935242;
  formattedAddress = '';

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  options ={
    ComponentRestrictions : {
      country: ['IE']
    }
  }

  ngOnInit() {
    this.setCurrentLocation();
  }


  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;

    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
  }*/

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
}