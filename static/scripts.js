let data;
let searchBar = document.getElementById("search-query");
const container = document.querySelector(".results-container");
const header = document.querySelector(".header");

let sendData = () => {
  $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      var progressBar = $("#progress");
      //Upload progress
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            percentComplete = Math.floor(percentComplete);
            console.log(percentComplete);
            progressBar.css("width", percentComplete + "%");
            progressBar.html(percentComplete + "%");
          }
        },
        false
      );
      return xhr;
    },
    type: "POST",
    url: "/search", // url to the function
    data: {
      name: $("#search-query").val(), // value of the input text
    },
    success: function (response) {
      // do something with the PRAW response
      data = JSON.parse(response);
      header.innerText = searchBar.value;
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
      <div class="permalink"> <a href="reddit.com${element.Permalink}" target="_blank" rel="noopener noreferrer">source</a></div>
      <div class="score">${element.Score}</div>
      <div class="author">by u/${element.Author}</div>
    </div               
  </div>
  `;

    container.innerHTML += content;
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
