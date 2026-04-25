const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1000", name: "mountain-hiking.jpg" },
  { url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1000", name: "camping-stars.jpg" },
  { url: "https://images.unsplash.com/photo-1533873984035-25970ab07461?q=80&w=1000", name: "forest-exploration.jpg" },
  { url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1000", name: "lake-camping.jpg" },
  { url: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000", name: "forest-trail.jpg" },
  { url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=1000", name: "mountain-peak.jpg" },
  { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000", name: "alpine-landscape.jpg" },
  { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000", name: "snow-mountain.jpg" },
  { url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2000", name: "aerial-camping.jpg" }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        fs.unlink(dest, () => reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err.message));
    });
  });
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function run() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img.name}...`);
      await download(img.url, path.join(dir, img.name));
      console.log(`Downloaded ${img.name}`);
    } catch (e) {
      console.error(`Failed to download ${img.name}: ${e}`);
    }
  }
}

run();
