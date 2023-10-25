const postData = require("./posts.json");
const votesData = require("./votes.json");
const userArray = require("./users.json");
const { type } = require("os");

/* Find the top 5 most active users. A user gets 5 points each time they create a post. 
And then they get 1 point per each upvote / downvote */

let userData = {};

for (let post of postData) {
  const userId = post.userId;
  if (!userData[userId]) {
    userData[userId] = 5;
  } else {
    userData[userId] += 5;
  }
}

for (let vote of votesData) {
  const userId = vote.userId;
  if (!userData[userId]) {
    userData[userId] = 1;
  } else {
    userData[userId] += 1;
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
  const user = userArray.find((eachUser) => userId == eachUser.id);
  if (user) {
    result[user["name"]] = userObject[userId];
  }
}

console.log(result);
