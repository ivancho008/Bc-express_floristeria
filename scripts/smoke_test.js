const http = require('http');

const urls = [
  'http://localhost:3000/api/flowers',
  'http://localhost:3000/api/bouquets',
  'http://localhost:3000/api/orders'
];

function fetch(url){
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, statusCode: res.statusCode, body: data });
      });
    }).on('error', err => reject(err));
  });
}

(async () => {
  for (const url of urls){
    try{
      const res = await fetch(url);
      console.log('---');
      console.log('URL:', res.url);
      console.log('Status:', res.statusCode);
      try{
        const parsed = JSON.parse(res.body);
        console.log('Body sample:', Array.isArray(parsed) ? parsed.slice(0,2) : parsed);
      }catch(e){
        console.log('Body (raw):', res.body.slice(0,300));
      }
    }catch(err){
      console.error('Error fetching', url, err.message);
    }
  }
})();
