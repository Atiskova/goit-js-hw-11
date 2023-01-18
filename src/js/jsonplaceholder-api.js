'use strict';
import axios from 'axios';

export class UnsplashAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32871572-a4574b266bb5c21ae4a6b0f80';

  constructor() {
    this.page = 1;
    this.q = null;
  }

  fetchPhotosByQuerty() {
    const searchParams = {
      params: {
        key: UnsplashAPI.API_KEY,
        q: this.q,
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    return axios.get(`${UnsplashAPI.BASE_URL}`, searchParams);
    // return fetch(
    //     `${UnsplashAPI.BASE_URL}?${searchParams}`
    //   )
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error(response.status);
    //       }
    //       return response.json();
    //     })
  }
}
