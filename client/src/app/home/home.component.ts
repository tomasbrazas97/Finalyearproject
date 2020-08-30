import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { AgmCoreModule, AgmDataLayer } from '@agm/core';
import { environment } from '../../environments/environment';
import { LocationApiService } from '../home/locationApiService.service';
import { MarkerService } from '../home/marker.service';
declare var $: any;

// Marker Type
interface marker{
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}

@Component({
  templateUrl: './home.component.html',
  providers: [MarkerService]
})
export class HomeComponent implements OnInit{
 // map: mapboxgl.Map;
  //style = 'mapbox://styles/mapbox/streets-v11';
  //lat = 37.75;
  //lng = -122.41;

  title: string = 'AGM';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  an = 'BOUNCE';
  origin: any;
  destination: any;
  dir = undefined;


  lat1: number = 53.51413;
  lng1: number = -8.8550;
  lat2: number = 53.5148;
  lng2: number = -8.8519;
  //mapa: mapboxgl.Map;
  positions: any = [];
  //values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  
  markers: marker[];

  /*locations = [
    { lat: 53.61413, lng: -8.8550},
    { lat: 53.7148, lng: -8.8519}
  ]*/
  
  
  mapDoubleClick(event) {
    console.log(event);
    const obj = {
      lat: event.coords.lat,
      lng: event.coords.lng,

    };
    //this.locations.push(obj);
    //console.log(this.locations);
  }
  
  public renderOptions = {
    suppressMarkers: true,
  }

  toRefresh(): void{
    window.location.reload();
  }

  public mapStyles = [
    {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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

  @ViewChild('search')
  public searchElementRef: ElementRef;
 

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private _locationApiService: LocationApiService,
    private _markerService: MarkerService
  ) { 
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker: marker, index:number){
    console.log('clicked marker:' +marker.name+'at index ' +index)
  }

  mapClicked($event:any){
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  markerDragEnd1(marker:any, $event:any){
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      dragagble: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker(){
    console.log('adding marker');

    if(this.markerDraggable == 'yes'){
      var isDraggable = true;

    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker){
    for(var i = 0; i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);
      }
    }

    this._markerService.removeMarker(marker);
  }

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
   /* Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
  });
  // Add map controls
  this.map.addControl(new mapboxgl.NavigationControl());*/
  this._locationApiService.getLocations()
  .subscribe
  (
    data => {
      this.positions = data.coordinates;
      console.log(data);
      })
  }
  
  
  markerClick() {
    $("#myModal").modal('show');
  }
  
  markerClick1() {
    $("#myModal1").modal('show');
  }

  getDirectionsModal1(){
    this.destination = { 
      lat: 53.51413, 
      lng: -8.8550
     };
     $('#myModal').modal('toggle');
  }

  getDirectionsModal2(){
    this.destination = { 
      lat: 53.5148, 
      lng: -8.8519
     };
     $('#myModal1').modal('toggle');
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
        this.dir = {
          origin: { lat: this.latitude, lng: this.longitude}
        }
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

          this.dir = {
            origin: { lat: latitude, lng: longitude}
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });    
  } //end of ONIT


  //add marker manually
  /*createMarker(lng: number, lat: number){
    const marker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([lng, lat])
    .addTo(this.mapa);

    marker.on('drag', ()=>{
      console.log( marker.getLngLat );
    })
  }*/
 
}

 