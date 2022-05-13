let data;
let searchBar = document.getElementById("search-query");
const container = document.querySelector(".results-container");
const header = document.querySelector(".header");

let sendData = () => {
  animateCSS(".card", "fadeOut");
  $.ajax({
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

//removes results if they already exist
let removeCards = () => {
  const cards = document.querySelectorAll(".card");
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

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

window.addEventListener("load", function () {
  animateCSS(".card", "fadeIn");
});
