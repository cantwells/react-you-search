import axios from "axios";
const API_KEY = 'AIzaSyAQdRphaSUuFoKjC7O_UF4IK5d1pcEw5QU';
const URI = 'https://www.googleapis.com/youtube/v3/';

const API = {
    fetchVideos: ( query ) => {
        return axios.get(`${URI}search?part=snippet&q=${query}&type=video&maxResults=12&key=${API_KEY}`);
    },
    getViewCount: ( videoId ) => {
        return axios.get(`${URI}videos?part=statistics&id=${videoId}&key=${API_KEY}`);
    }
}

export default API;