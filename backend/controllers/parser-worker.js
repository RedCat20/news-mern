import xml2js from "xml2js";
import https from "https";

import { parentPort} from 'worker_threads';

const parseXmlToJson = async (data) => {
  const parser = new xml2js.Parser('');

  await parser.parseStringPromise(data)
    .then( async (result) => {
      const articles = result?.rss?.channel[0]?.item;
      let posts = JSON.stringify(articles);
      let parsedPosts = JSON.parse(posts);

      console.log('There are ' + parsedPosts?.length || 0 + ' posts');

      parentPort.postMessage(parsedPosts)
    })
    .catch((err) => {
      console.log("Error in parsing data: " + err.message);
    });
}

const getXmlDataFromUrlApi = async () => {
  await https.get('https://lifehacker.com/rss', (resp) => {

    let data = '';

    resp.setEncoding('utf8');

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', async () => {
      await parseXmlToJson(data);
    });

  }).on("error", (err) => {
    console.log("Can not get all posts: " + err.message);
  });
}

getXmlDataFromUrlApi().then(() => console.log('Data was created'));