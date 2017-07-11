import { Component,OnInit } from '@angular/core';
import {RestflickrService} from './restflickr.service';
import {Http,Response} from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Photo}  from './Photo'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestflickrService]
})
export class AppComponent {
  searchControl = new FormControl();
  title = 'app';
  result:Photo[];
  photosResults:Object;
  
      
constructor(private _formBuilder: FormBuilder,private restFlickrService:RestflickrService, private http:Http){

}


 ngOnInit() {
     this.searchControl.valueChanges
       .debounceTime(500)
       .distinctUntilChanged()
       .switchMap((query: string) => this.restFlickrService.getSearchImagesResults(query))
       .subscribe(
      data => { this.result = <Photo[]> data;
        console.log("Results are ");
        console.log(this.result);
      });

    }


}