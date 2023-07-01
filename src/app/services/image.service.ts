import {Injectable} from '@angular/core';
import axios from "axios";
import {environment} from '../environments';
import {LogicalFileSystem} from "@angular/compiler-cli";

const FLICKR_KEY = environment.flickrKey;

@Injectable({
  providedIn: "root"
})

export class ImageService {

  async handleSearch(searchTerm: string, imageService: ImageService, formData: any): Promise<any> {
    if (searchTerm === "") {
      return;
    }
    if (formData === undefined) {
      try {
        const response = await imageService.getPhotosByKeyword(searchTerm, 15);
        const images: any[] = imageService.parseResponse(response);
        const promises = images.map(async (image: any) => {
          const infos = await imageService.getPhotoInfo(image.id);
          return {...image, ...infos};
        });
        return await Promise.all(promises);
      } catch (error) {
      }
    } else {
      return await this.handleSearchForm(formData, imageService, searchTerm);
    }
  }

  // @ts-ignore
  private async handleSearchForm(formData: any, imageService: ImageService, searchTerm: string) {
    try {
      const formMinDate = new Date(formData.minUploadDate);
      const formMaxDate = new Date(formData.maxUploadDate);
      const specifiedDate = this.checkForSpecifiedDate(formMinDate) || this.checkForSpecifiedDate(formMaxDate);
      let response: any;
      console.log(formData.per_page);
      if (specifiedDate)
        response = await imageService.getPhotosByKeyword(searchTerm, formData.per_page, formMinDate, formMaxDate);
      else
        response = await imageService.getPhotosByKeyword(searchTerm, formData.per_page);
      const images: any[] = imageService.parseResponse(response, formData.imageSize);
      const promises = images.map(async (image: any) => {
        //console.log(image);
        const infos = await imageService.getPhotoInfo(image.id, image.size);
        return {...image, ...infos};
      });
      return await Promise.all(promises);
    } catch (error) {
    }
  }

  checkForSpecifiedDate(formDate: Date): boolean {
    const currentDate = new Date(Date.now());
    return !(formDate.getDay() === currentDate.getDay() && formDate.getMonth() === currentDate.getMonth()
      && formDate.getFullYear() === currentDate.getFullYear());
  }


  parseResponse = (responseData: any, imageSize?: number) => { // -> get all the urls associated with the photos.
    let Urls: Object[] = [];
    let suffix: string = "";
    if (imageSize === undefined || imageSize === 0) {
      suffix = "z";
    } else {
      suffix = this.getSizeSuffix(imageSize);
    }
    responseData.photos.photo.forEach((photo: any) => {
      const photoObj = {
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${suffix}.jpg`,
        title: photo.title,
        id: photo.id,
        owner: photo.owner,
        size: suffix
      }
      Urls.push(photoObj);
    })
    return Urls;
  }

  getSizeSuffix(imageSize: number): string {
    let suffix = "w";
    if (imageSize >= 400 && imageSize <= 800)
      suffix = "z";
    else if (imageSize > 800 && imageSize <= 1200)
      suffix = "c";
    else if (imageSize > 1200)
      suffix = "b"
    return suffix;
  }

  getPhotosByKeyword = async (keyword: string, perPage: number, minUploadDate?: Date, maxUploadDate?: Date) => {
    try {
      console.log(perPage);
      const params: any = {
        method: 'flickr.photos.search',
        api_key: FLICKR_KEY,
        format: 'json',
        nojsoncallback: '1',
        text: keyword,
        per_page: perPage,
      };

      // Add date range parameters if provided
      if (minUploadDate) {
        params.min_taken_date = Math.floor(minUploadDate.getTime() / 1000); // Convert to UNIX timestamp
      }
      if (maxUploadDate) {
        params.max_taken_date = Math.floor(maxUploadDate.getTime() / 1000); // Convert to UNIX timestamp
      }
      console.log(params);

      const response = await axios.get('https://api.flickr.com/services/rest/', {params});
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  getPhotoInfo = async (id: string, imageSize?: string) => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&photo_id=${id}`
      );
      const data = response.data;

      const result = {
        title: data.photo.title._content,
        description: data.photo.description._content,
        owner: data.photo.owner.username,
        date: data.photo.dates.taken,
        location: data.photo.location,
        comments: data.photo.comments._content,
        tags: data.photo.tags.tag,
        size: this.suffixSizeToString(imageSize)
      };
      //console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  suffixSizeToString = (suffix?: string): string => {
    let size = "";
    if(suffix === undefined)
      return "normal";
    if (suffix === "w")
      size = "small"
    else if (suffix === "z")
      size = "normal"
    else if (suffix === "c")
      size = "big";
    else if (suffix === "b")
      size = "gigantic";
    return size;
  }
}

