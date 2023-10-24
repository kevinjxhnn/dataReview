const postsData = require("./posts.json");
const topicData = require("./topics.json");

/* Find the top 5 topics with the most number of posts */

const topics = {};

for (let post of postsData) {
  if (!topics[post["topicId"]]) {
    topics[post["topicId"]] = 1;
  } else {
    topics[post["topicId"]] += 1;
  }
}

const topicsSorted = Object.fromEntries(
  Object.entries(topics)
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .slice(0, 5)
);

let result = {};
for (let key in topicsSorted) {
  for (let topic of topicData) {
    if (key == topic["id"]) {
      result[topic["name"]] = topicsSorted[key];
    }
  }
}

console.log(result);
