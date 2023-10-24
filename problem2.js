const postData = require("./posts.json");
const votesData = require("./votes.json");
const userArray = require("./users.json");
const { type } = require("os");

/* Find the top 5 most active users. A user gets 5 points each time they create a post. 
And then they get 1 point per each upvote / downvote */

let userData = {};
for (let post of postData) {
  if (!userData[post["userId"]]) {
    userData[post["userId"]] = 5;
  } else {
    userData[post["userId"]] += 5;
  }
}

for (let vote of votesData) {
  for (let key in userData) {
    if (vote["userId"] == key) {
      userData[key] += 1;
    }
  }
}

const userObject = Object.fromEntries(
  Object.entries(userData)
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .slice(0, 5)
);

let result = {};
for (let userId in userObject) {
  for (let user of userArray) {
    if (userId == user["id"]) {
      result[user["name"]] = userObject[userId];
    }
  }
}

console.log(result);
