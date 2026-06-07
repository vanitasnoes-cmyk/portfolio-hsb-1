import fs from 'fs';
import path from 'path';
import https from 'https';

const url = 'https://upload.wikimedia.org/wikipedia/vi/1/1b/Logo_DHQGHN.png';
const dest = 'c:/Users/USER/Downloads/Portfolio hsb 1/public/images/vnu-logo.png';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
  }
};

const file = fs.createWriteStream(dest);

https.get(url, options, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download VNU logo: Status Code ${response.statusCode}`);
    response.resume();
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded VNU logo successfully!');
  });
}).on('error', (err) => {
  console.error(`Error downloading: ${err.message}`);
});
