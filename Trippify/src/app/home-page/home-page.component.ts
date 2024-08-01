import { Component, OnInit } from '@angular/core';
import { LocationService } from '../Services/location.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ImageSearchWithSerpService } from '../Services/image-search-with-serp.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  allLocationList: any = [];
  searchedLocation: any = [];
  //searchedWithTerm: any = [];
  searchedResponse: any = [];

  locationObj: any = {
    "StateName": 0,
    "LocationName": '',
    "Address": '',
    "ContactNumber": '',
    "ContactPerson": '',
    "Description": '',
    "Category": 0,
    Picture: File
  }
  imageList: any = File;
  constructor(private locationSrv: LocationService, private router: Router, private imageSearchApi : ImageSearchWithSerpService) {
  }
  ngOnInit(): void {
    this.GetAllLocation()
  }
  url = "./assets/Screenshot 2024-05-23 003204.png";

  async GetAllLocation() {
    try {
      // Await the response from the service
      const res: any = await firstValueFrom(this.locationSrv.getAllLocationApi());
      // Assign the response to the respective properties
      this.allLocationList = res;
      this.locationObj = res[0];
      console.log('Location list', this.allLocationList);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  async Search(val: any): Promise<void> {
    try {
      const res: any = await firstValueFrom(this.imageSearchApi.search(val.value));
      console.log('API Response:', res); // Log the response to check its structure
      if (Array.isArray(res)) {
        this.searchedResponse = res.slice(0, 10);
      } else {
        //console.error('API response is not an array:', res);
        // Handle the case where res is not an array, e.g., set an empty array or show an error
        this.searchedResponse = [];
      }
      this.navigateWithResponse(this.searchedResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  // async GetLocationByName(val: string) {
  //   try {
  //     debugger;
  //     let place = val.trim(); // Trim the input value to remove leading and trailing spaces
  //     if (place) {
  //       // Make sure place is not empty
  //       // Await the response from the service
  //       const res: any = await this.locationSrv.SearchLocationByName(place).toPromise();
  //       // Assign the response to the respective properties
  //       this.searchedLocation = res;
  //       console.log('Location list', this.searchedLocation);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching locations:', error);
  //   }

  async onInputChange(event: any) {
    const val = event.target.value;
    await this.GetLocationByName(val);
  }

  async GetLocationByName(val: string) {
    try {
      debugger
      let place = val.trim(); // Trim the input value to remove leading and trailing spaces
      if (place) {
        // Make sure place is not empty
        // Await the response from the service
        const res: any = await this.locationSrv.SearchLocationByName(place).toPromise();
        // Assign the response to the respective properties
        this.searchedLocation = res;
        this.navigateWithList(this.searchedLocation)
        console.log('Location list', this.searchedLocation);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
  navigateWithList(list: string[]) {
    const encodedList = encodeURIComponent(JSON.stringify(list));
    this.router.navigate(['/DestinationList', encodedList]);
  }
  navigateWithResponse(searchedResponse: string[]) {
    const encodedList = encodeURIComponent(JSON.stringify(searchedResponse));
    this.router.navigate(['/DestinationDetail', encodedList]);
  }

}


