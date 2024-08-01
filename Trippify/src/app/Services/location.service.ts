import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from './Constant/Constant';
import { METHODS } from 'http';
import { query } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  parentUrl = ''
  constructor(private client: HttpClient) { }

  addLocationApi(obj: any, file: File): Observable<any> {
    debugger;
    const headers = new HttpHeaders({
      'Token': '123456'
    });
    const params = new HttpParams().set('User', 'Pratiksha');
    const formData: FormData = new FormData();

    // Append all the properties from obj to formData
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    // Append the file to formData
    formData.append("Picture", file, file.name);

    return this.client.post(Constant.API_END_POINT + Constant.METHODS.CREATE_LOCATION, formData, {
      headers: headers,
      params: params
    });
  }


   getAllLocationApi(): Observable<any>{
    debugger;
    return this.client.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_LOCATION);
   }

   addCategoryApi(obj:any):Observable<any>{
    debugger;
    return this.client.post(Constant.API_END_POINT + Constant.METHODS.CREATE_CATEGORY,obj)
   }

   addStateApi(obj:any):Observable<any>{
    debugger;
    return this.client.post(Constant.API_END_POINT + Constant.METHODS.CREATE_CATEGORY,obj)
   }
   deleteLocationApi(id:any):Observable<any>{
    debugger;
    return this.client.post(Constant.API_END_POINT + Constant.METHODS.DELETE_LOCATION,id)
   }

   deleteStateApi(id:any):Observable<any>{
    debugger;
    return this.client.post(Constant.API_END_POINT + Constant.METHODS.DELETE_STATE,id)
   }

   deleteCategoryApi(id:any):Observable<any>{
    debugger;
    return this.client.post(Constant.API_END_POINT + Constant.METHODS.DELETE_CATEGORY,id)
   }
   getStateApi():Observable<any>{
    debugger;
    return this.client.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_STATE);
   }

   getCategoryApi():Observable<any>{
    debugger;
    return this.client.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
   }

   getLocationById(id: any): Observable<any> {
    console.log("Id of location", id);
    const url = `${Constant.API_END_POINT}${Constant.METHODS.GET_LOCATION_BY_ID}?id=${id}`;
    return this.client.get(url);
  }

  SearchLocationByName(place: any): Observable<any> {
    debugger
    const encodedPlace = encodeURIComponent(place);
    console.log("Name of location", place);
    const url = `${Constant.API_END_POINT}${Constant.METHODS.GET_LOCATION_BY_NAME}?place=${encodedPlace}`;
    console.log(url);
    return this.client.get(url);

  }

}
