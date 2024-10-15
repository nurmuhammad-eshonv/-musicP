// Define CLIENT_ID and CLIENT_SECRET
const CLIENT_ID = "7283734ed5d546859a182f94dfce18a8";
const CLIENT_SECRET = 'a3e9674182bd4c77843b524ad072f35a';

// Function to get token
const getToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
      },
      body: "grant_type=client_credentials",
    });

    const auth = await response.json();
    localStorage.setItem("access_token", `${auth.token_type} ${auth.access_token}`);
  } catch (err) {
    console.log(err);
  }
};

// Fetch interceptor to always include access token
const fetchWithAuth = async (url, options = {}) => {
  // Ensure token is available in localStorage
  let token = localStorage.getItem("access_token");

  if (!token) {
    await getToken(); // Refresh the token if not present
    token = localStorage.getItem("access_token");
  }

  // Set Authorization header if token exists
  const headers = {
    ...options.headers,
    "Authorization": token ? token : ""
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

// Example of useEffect to get data from a protected API
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetchWithAuth("https://api.spotify.com/v1/some-endpoint");
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);
