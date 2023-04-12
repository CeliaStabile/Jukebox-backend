var express = require('express');
var router = express.Router();

/* ANCIENNE route pour se logger 
var app = express();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: "f23691598dc1491190e048505e50122d",
  clientSecret: "c9f9ba3556ae4eac86f56fb1823a3631",
  redirectUri: "http://localhost:8888/callback",
});


// GET users listing. 
/* https://accounts.spotify.com/fr/authorize?client_id=f23691598dc1491190e048505e50122d&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-private%20user-read-email%20playlist-modify-public&state=null&show_dialog=true 
{"success":true,"message":"Welcome Tuki Chuquillanqui!","access_token":"BQBU66g_bqEKSTryI0MKv0DmpuJGcdXKj0AAW1MpXFPInJQ7pc0OPpC29kkvteBnDIic_Gk4tsAQaRLyvYxN4QEL3fb6Ocpqe_Q62y_M39akr4uJPUMMHjRFDZhpL9331fEqdmRfhan-86PBVQRi0i_qoUwRjIKvsNviu1BiH8X9A4Cdy0Ucs1Gqx8xyLyth_iM-7BxiajREPexchLtpEBgTQfc8mVs"}
*/

// This is the route that the DJ will use to log in
/*
router.get('/login', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, true);
  res.json({url: authorizeURL});
  console.log(authorizeURL);
});

// This is the route that Spotify will redirect the DJ to after they have logged in
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    const { body } = await spotifyApi.getMe();
    res.json({ success: true, message: `Welcome ${body.display_name}!`, access_token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Invalid authorization code" });
  }
});

*/

module.exports = router;
