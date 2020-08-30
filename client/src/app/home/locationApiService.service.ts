import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Point } from 'mapbox-gl';

export interface LocationsCord {

  coordinates: Geometry;

}

export interface Geometry {

  type: Point;
  coordinates: number;

}

export class Location {

  coordinates: LocationsCord;
  locationName: string;
  formattedAddress: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class LocationApiService{

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<any> {
    return this.httpClient.get("http://localhost:3000/api/v1/locations")
  };
}
