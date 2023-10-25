const postData = require("./posts.json");
const userData = require("./users.json");

/* Find the top 5 users who have created the most number of posts */

const users = {};
for (let post of postData) {
  if (!users[post["userId"]]) {
    users[post["userId"]] = 1;
  } else {
    users[post["userId"]] += 1;
  }
}

const result = Object.fromEntries(
  Object.entries(users)
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .slice(0, 5)
);

let topFiveUsers = {};

for (let userId in result) {
  const user = userData.find((eachUser) => eachUser.id == userId);
  if (user) {
    topFiveUsers[user["name"]] = result[userId];
  }
}

console.log(topFiveUsers);
