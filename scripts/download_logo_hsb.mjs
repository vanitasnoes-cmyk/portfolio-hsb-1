import fs from 'fs';
import path from 'path';
import https from 'https';

const url = 'https://firebasestorage.googleapis.com/v0/b/hsb-library.firebasestorage.app/o/design%2FHSB-logo-white-singular-no-slogan.png?alt=media';
const dest = 'c:/Users/USER/Downloads/Portfolio hsb 1/public/images/hsb-logo.png';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
  }
};

const file = fs.createWriteStream(dest);

https.get(url, options, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download HSB logo: Status Code ${response.statusCode}`);
    response.resume();
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded HSB logo successfully!');
  });
}).on('error', (err) => {
  console.error(`Error downloading: ${err.message}`);
});
