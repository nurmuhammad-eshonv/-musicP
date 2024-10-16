import axios from 'axios';

// Spotify API-ga autentifikatsiya uchun ma'lumotlar
const CLIENT_ID = '817048509986412b9444e9ddfac1545a';
const CLIENT_SECRET = '4b25d21db7684f1e97259657ca027628';

// Token olish funktsiyasi
const getToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      },
      body: 'grant_type=client_credentials',
    });

    const auth = await response.json();
    const token = `${auth.token_type} ${auth.access_token}`;

    if (token) {
      localStorage.setItem('access_token', token); // Tokenni localStorage'ga saqlaymiz
    } else {
      console.log('Token topilmadi');
    }

    return token;
  } catch (err) {
    console.error('Token olishda xato:', err);
  }
};

// Axios instansiyasi yaratish
const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1', // Spotify API-ning bazaviy URL'i
});

// Har bir so'rovga token qo'shish
instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('access_token');

    if (!token) {
      token = await getToken(); // Tokenni olish
    }

    if (token) {
      config.headers['Authorization'] = token; // Tokenni headersga qo'shish
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
