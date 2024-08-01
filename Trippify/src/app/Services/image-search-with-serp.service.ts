import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from './Constant/Constant';
import { METHODS } from 'http';

@Injectable({
  providedIn: 'root'
})
// export class ImageSearchWithSerpService {

//   constructor(private httpCLient: HttpClient) { }

//   search(prompt:any):Observable<any>{
//     return this.httpCLient.get(Constant.API_END_POINT_FOR_SEARCH + Constant.METHODS.GET_SEARCHED_RESULT)
//   }
  
// }
export class ImageSearchWithSerpService {

  private apiKey = 'ca5a60053ccc1873452a0057a6370aa91907b5ab4febf06775f3c76f9bde1283'; // Replace with your API key
  private baseUrl = 'https://serpapi.com/search'; // Google Custom Search API endpoint

  constructor(private httpClient: HttpClient) { }

  search(query: string): Observable<any> {
    const params = new HttpParams()
      .set('engine', 'google_images') 
      .set('key', this.apiKey)
      .set('q', query)

    return this.httpClient.get(this.baseUrl, { params }).pipe(
      map(response => response) // You can process the response here if needed
    );
  }
}
