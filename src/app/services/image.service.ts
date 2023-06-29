import {Injectable} from '@angular/core';
import axios from "axios";
import {environment} from '../environments';
import {error} from "@angular/compiler-cli/src/transformers/util";

const FLICKR_KEY = environment.flickrKey;

@Injectable({
  providedIn: "root"
})

export class ImageService {

  parseResponse = function (responseData: any) { // -> get all the urls associated with the photos.
    let Urls: Object[] = [];
    responseData.photos.photo.forEach((photo: any) => {
      const photoObj = {
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
        title: photo.title,
        date: photo.date
      }
      Urls.push(photoObj);
    })
    return Urls;
  }
  getPhotosByKeyword = async (keyword: string) => {
    try {
      const response = await axios.get('https://api.flickr.com/services/rest/', {
        params: {
          method: 'flickr.photos.search',
          api_key: FLICKR_KEY,
          format: 'json',
          nojsoncallback: '1',
          text: keyword,
          per_page: 15
        },
      });
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
        url: `https://live.staticflickr.com/${data.photo.server}/${data.photo.id}_${data.photo.secret}.${data.photo.originalformat}`,
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

