import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Photo} from  './Photo';

@Injectable()
export class RestflickrService {
 restEndPoint = 'https://api.flickr.com/services/rest/';
 searchMethod = 'flickr.photos.search';
 photoSizeMethod ='flickr.photos.getSizes';

 apiKey       = '36d65b5b6ae34dec2b8be9357d4aa421'
 secret       = ''; 
 photo:   Photo;
 photos:  Photo[];
 
 test: string; 
 constructor(private http: Http) {
 };


/**
 * 
 * @param query 
 */                
  getSearchImagesResults(query:string){
   console.log(query)
   let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&tags=${query}&per_page=12&format=json&nojsoncallback=1`;
   console.log("URL "+url);    
   return this.http.get(url)
      .map(res => res.json())
      .map(value => {
         if (value.stat === 'ok') {
          console.log("Status is ok");
          console.log (value);
          return  value.photos.photo.map((photo: Photo) =>{
                photo.url =  `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
               

                this.getPhotoHighResUrl(photo.id)
                .subscribe(
                data=>      
                    { 
                    
                      let largeImage =  data.find(value=> 
                      value.label == 'Large 1600');
                      if(largeImage)
                        photo.highresurl = largeImage.source;
                      // console.log('value.label');
                      // console.log("URL High resolution"+ photo.highresurl);
                });
                    
                return photo;
          }); 
         }
      })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

 /**
  * 
  * @param photo_id 
  */
  getPhotoHighResUrl(photo_id:number){

   //console.log(photo_id)
   let url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=36d65b5b6ae34dec2b8be9357d4aa421&photo_id=${photo_id}&format=json&nojsoncallback=1`;
  // console.log("URL "+url);    
   return this.http.get(url)
      .map(res => res.json())
      .map(value => {
         if (value.stat === 'ok') {
          // console.log("getPhotoHighResUrl is ok");
          // console.log (value.sizes.size);
          return  value.sizes.size;
          
         }
      })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  

}


