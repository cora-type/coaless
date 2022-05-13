let data;

$("#submit").click(function () {
  // make ajax request on btn click
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
});

const container = document.querySelector(".results-container");
let update = () => {
  if (container.hasChildNodes) {
    removeCards();
  }
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = element.Comment;
    container.appendChild(card);
  });
};

let removeCards = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
};

var $svg = $("yeet").drawsvg();

$svg.drawsvg("animate");
