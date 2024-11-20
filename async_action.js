// This script simulates async activities before Strapi Starts.

const fs = require("node:fs");
const axios = require("axios");

async function fetchRemoteData() {
  console.info("Fetching super secret secrets 🤫");
  let req = await axios.get("https://jsonplaceholder.typicode.com/comments");
  if (req.status === 200) {
    fs.writeFile("./response.json", JSON.stringify(req.data), async (error) => {
      if (error) {
        console.error(error);
      } else {
        console.info("Successfully written to the filesystem");
        console.info("Now we'll wait for 5 seconds for no apparent reason");
        await setTimeout(() => {
          console.log("Done waiting now. Strapi won't start until I'm done");
        }, 5000);
      }
    });
  } else {
    console.error("Unable to fetch secrets: ", req.statusText);
  }
}

fetchRemoteData();
