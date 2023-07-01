import {Injectable} from '@angular/core';
import axios from "axios";
import {environment} from '../environments';

const FLICKR_KEY = environment.flickrKey;

@Injectable({
  providedIn: "root"
})

export class ImageService {

  async handleSearch(searchTerm: string, imageService: ImageService, formData: any): Promise<any> {
    if (searchTerm === "") {
      return;
    }
    if(formData === undefined) {
      try {
        const response = await imageService.getPhotosByKeyword(searchTerm, 30);
        const images: any[] = imageService.parseResponse(response);
        const promises = images.map(async (image: any) => {
          const infos = await imageService.getPhotoInfo(image.id);
          return {...image, ...infos};
        });
        return await Promise.all(promises);
      } catch (error) {
      }
    }
    else {
      console.log(formData);
      try {
        const  formMinDate = new Date(formData.minUploadDate);
        const  formMaxDate = new Date(formData.maxUploadDate);
        console.log(formMinDate);
        console.log(formMaxDate);
        const specifiedDate = this.checkForSpecifiedDate(formMinDate) || this.checkForSpecifiedDate(formMaxDate);
        console.log(specifiedDate);
        let response: any;
        if(specifiedDate)
          response = await imageService.getPhotosByKeyword(searchTerm, 15, formMinDate, formMaxDate);
        else
          response = await imageService.getPhotosByKeyword(searchTerm, 15);
        const images: any[] = imageService.parseResponse(response);
        const promises = images.map(async (image: any) => {
          const infos = await imageService.getPhotoInfo(image.id);
          return {...image, ...infos};
        });
        return await Promise.all(promises);
      } catch (error) {
      }
    }
  }

  checkForSpecifiedDate(formDate: Date): boolean{
    const currentDate = new Date(Date.now());
    return!(formDate.getDay() === currentDate.getDay() && formDate.getMonth() === currentDate.getMonth()
    && formDate.getFullYear() === currentDate.getFullYear());
  }


  parseResponse = function (responseData: any) { // -> get all the urls associated with the photos.
    let Urls: Object[] = [];
    responseData.photos.photo.forEach((photo: any) => {
      const photoObj = {
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
        title: photo.title,
        id: photo.id,
        owner: photo.owner,
      }
      Urls.push(photoObj);
    })
    return Urls;
  }
  getPhotosByKeyword = async (keyword: string, perPage: number, minUploadDate?: Date, maxUploadDate?: Date) => {
    try {
      const params: any = {
        method: 'flickr.photos.search',
        api_key: FLICKR_KEY,
        format: 'json',
        nojsoncallback: '1',
        text: keyword,
        per_page: perPage
      };

      // Add date range parameters if provided
      if (minUploadDate) {
        params.min_taken_date = Math.floor(minUploadDate.getTime() / 1000); // Convert to UNIX timestamp
      }
      if (maxUploadDate) {
        params.max_taken_date = Math.floor(maxUploadDate.getTime() / 1000); // Convert to UNIX timestamp
      }
      console.log(params);

      const response = await axios.get('https://api.flickr.com/services/rest/', { params });
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getRecents = async () => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1 `
      );
      console.log(response);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  getPhotosBySearch = async (input: string) => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&text=${input}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getPhotoSizesAndLinks = async (id: string) => {
    try {
      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&photo_id=${id}`;
      console.log(url);
      const response = await axios.get(
        url
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getPhotoInfo = async (id: string) => {
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
      };
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // @ts-ignore
  getPhotosByOwner = async (owner) => {
    try {
      const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1&user_id=${owner}`;
      const response = await axios.get(
        url
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}


const imageService = new ImageService();

// imageService.getPhotosByKeyword("bus").then((data) => {
//   console.log(data);
// }).catch((error) => {
//   console.log(error);
// })
// Example: Get popular photos
// imageService.getRecents()
//   .then((data) => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Example: Search photos by input
// const searchInput = 'cat';
// imageService.getPhotosBySearch(searchInput)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Example: Get photo sizes and links by ID
// const photoId = '52994475453';
// imageService.getPhotoSizesAndLinks(photoId)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Example: Get photo info by ID
// const photoId = '52959848298';
// imageService.getPhotoInfo(photoId)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // Example: Get photos by owner
// const owner = '8740272@N04';
// imageService.getPhotosByOwner(owner)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

