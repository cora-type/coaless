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
      url: "/search", // url to the function
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

let update = (title, pAuthor, pDate, cBody, cScore, cDate) => {
  let article = document.createElement("article");
  article.classList.add("post-container");
  container.appendChild(article);

  let post = document.createElement("div");
  post.classList.add("post");
  article.appendChild(post);

  let postTitle = document.createElement("div");
  postTitle.classList.add("post-title");
  let postInfo = document.createElement("div");
  postInfo.classList.add("post-info");
  post.append(postTitle, postInfo);

  let postContent = document.createElement("div");
  postContent.classList.add("post__content");
  article.append(postContent);

  let comments = document.createElement("div");
  comments.classList.add("comments");
  postContent.appendChild(comments);

  let comment = document.createElement("div");
  comment.classList.add("comment");
  comments.appendChild(comment);

  let commentBody = document.createElement("div");
  commentBody.classList.add("comment-body");
  let commentInfo = document.createElement("div");
  commentInfo.classList.add("comment-info");
  comment.append(commentBody, commentInfo);

  postTitle.innerText = title;
  postInfo.innerText = "by " + pAuthor + " , " + pDate;
};

let postCreator = () => {
  console.log(Object.keys(data));
};

//removes results if they already exist
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
