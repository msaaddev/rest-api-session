const axios = require("axios");
const io = require("console-read-write");

const getEmail = async () => {
  io.write("Enter any GitHub username: ");
  const username = await io.read();

  await axios
    .get(`https://api.github.com/users/${username}/events/public`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++)
        if (res.data[i].type === "PushEvent") {
          io.write("\nEmail: " + res.data[i].payload.commits[0].author.email);
          break;
        }
    })
    .catch((err) => console.log(err));
};

getEmail();
