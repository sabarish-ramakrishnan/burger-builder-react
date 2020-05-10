import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-541a9.firebaseio.com'
});

export default instance;