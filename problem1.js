const votes = require("./votes.json");

/* Find the top 3 posts with the highest score. A post's score 
is calculated by calculating the total number of upvotes and subtracting the total number of downvotes */


let voteCounts = {};

for (let vote of votes) {
  if (!voteCounts[vote["postId"]]) {
    voteCounts[vote["postId"]] = 1;
  } else {
    if (vote["type"] == "up") {
      voteCounts[vote["postId"]] += 1;
    } else {
      voteCounts[vote["postId"]] -= 1;
    }
  }
}

let topPosts = Object.fromEntries(
  Object.entries(voteCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
);

console.log(topPosts);

