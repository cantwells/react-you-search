import axios from "axios";
const API_KEY = 'AIzaSyAQdRphaSUuFoKjC7O_UF4IK5d1pcEw5QU';
const URI = 'https://www.googleapis.com/youtube/v3/';

const API = {
    fetchVideos: ({ request, amount, sort }) => {
        return axios.get(`${URI}search?part=snippet&q=${request}&type=video&maxResults=${amount || 12}&order=${sort || 'relevance'}&key=${API_KEY}`);
    },
    getViewCount: (videoId) => {
        return axios.get(`${URI}videos?part=statistics&id=${videoId}&key=${API_KEY}`);
    },
}

export default API;