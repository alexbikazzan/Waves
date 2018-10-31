import axios from 'axios';

const http = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export default {
  async colors(page = 1) {
    const queryStr = page > 1 ? `&page=${page}` : '';
    return (await http.get(`example?per_page=8${queryStr}`)).data;
  },
};
