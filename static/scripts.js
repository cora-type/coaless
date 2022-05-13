let data;
let searchBar = document.getElementById("search-query");
const container = document.querySelector(".results-container");

let sendData = () => {
  $.ajax({
    type: "POST",
    url: "/search", // url to the function
    data: {
      name: $("#search-query").val(), // value of the input text
    },
    success: function (response) {
      // do something with the PRAW response
      data = JSON.parse(response);
      update();
    },
  });
};

$(".cta").click(sendData);

searchBar.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    sendData();
  }
});

let update = () => {
  if (container.hasChildNodes) {
    removeCards();
  }
  data.forEach((element) => {
    let content = `
  <div class="card">
    <div class="comment">${element.Comment}</div>
    <div class="metadata">
      <div class="permalink"> <a href="reddit.com${element.Permalink}">link</a></div>
      <div class="score">${element.Score} points</div>
      <div class="author">by u/${element.Author}</div>
    </div               
  </div>
  `;

    container.innerText += content;
  });
};

let removeCards = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
};

new Vivus("logo-svg", {
  type: "sync",
  duration: 500,
  animTimingFunction: Vivus.EASE,
});
