const axios = require('axios');
const { config } = require('dotenv');
config();

const FLICKR_KEY = process.env.FLICKR_KEY;

class ImageService {
  getRecents = async () => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${FLICKR_KEY}&format=json&nojsoncallback=1 `
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getPhotosBySearch = async (input) => {
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

  getPhotoSizesAndLinks = async (id) => {
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

  getPhotoInfo = async (id) => {
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
    }
  };

  getPhotosByOwner = async (owner) => {
    try {c
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
const photoId = '52994475453';
imageService.getPhotoSizesAndLinks(photoId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

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