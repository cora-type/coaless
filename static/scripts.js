let data; //store returned data here
let searchBar = document.getElementById("search-query");
const container = document.querySelector(".results-container");
const header = document.querySelector(".header");
const ripple = document.querySelector(".lds-ripple");

let sendData = () => {
  if (searchBar.value == "") {
    alert(
      "please enter something stop trying to break my very well maintained and absolutely not volatile code D:"
    );
  } else {
    ripple.style.visibility = "visible";
    $.ajax({
      type: "POST",
      url: "/search", // URL to the function
      data: {
        name: $("#search-query").val(), // value of the input text
      },
      success: function (response) {
        // do something with the PRAW response
        ripple.style.visibility = "hidden";
        data = JSON.parse(response);
        // data.sort((a, b) => b.Score - a.Score);
        postCreator();
      },
    });
  }
};

// on click or enter, send post request to server
$(".cta").click(sendData);

searchBar.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    sendData();
  }
});

// Creates the actual post that is appended to the display
let update = (title, author, commentList, date, permalink) => {
  let article = document.createElement("article");
  article.classList.add("post-container");
  container.appendChild(article);

  let post = document.createElement("div");
  post.classList.add("post");
  article.appendChild(post);

  let postTitle = document.createElement("div");
  postTitle.classList.add("post-title");
  postTitle.innerText = title;

  let postInfo = document.createElement("div");
  postInfo.classList.add("post-info");
  let link = document.createElement("a");
  link.setAttribute("target", "_blank");
  link.href = permalink;
  link.innerHTML = "by " + author + ", " + date;
  postInfo.appendChild(link);

  post.append(postTitle, postInfo);

  let postContent = document.createElement("div");
  postContent.classList.add("post__content");
  article.append(postContent);

  let comments = document.createElement("div");
  comments.classList.add("comments");

  displayComments(comments, commentList);
  postContent.appendChild(comments);

  console.log(date);
};

// Go through a list of comments and create a comment element, append to post container
let displayComments = (contain, comments) => {
  comments.forEach((comment) => {
    let commentContainer = document.createElement("div");
    commentContainer.classList.add("comment");

    let commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");
    commentBody.innerHTML = comment.body;
    commentContainer.appendChild(commentBody);

    let commentInfo = document.createElement("div");
    commentInfo.classList.add("comment-info");
    // commentInfo.innerText = comment.score + " points, " + comment.author;
    let link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.href = "www.reddit.com/" + comment.permalink;
    link.innerHTML = comment.score + " points, " + comment.author;
    commentInfo.appendChild(link);
    commentContainer.appendChild(commentInfo);

    contain.appendChild(commentContainer);
  });
};

// Creates posts for each key sent from PRAW
let postCreator = () => {
  resetContent();
  Object.keys(data).forEach((key) => {
    let postObject = data[key]; // Access current post object
    let title = postObject.title;
    let author = postObject.author;
    let date = postObject.date;
    let permalink = postObject.permalink;
    let comments = postObject.comments;

    update(title, author, comments, date, permalink);
  });
};

// Reset the display
let resetContent = () => {
  const cards = document.querySelectorAll(".post-container");
  cards.forEach((card) => {
    card.remove();
  });
};

//animates the SVG logo
new Vivus("logo-svg", {
  type: "sync",
  duration: 500,
  animTimingFunction: Vivus.EASE,
});
