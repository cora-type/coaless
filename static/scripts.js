let data;

$("#submit").click(function () {
  // make ajax request on btn click
  $.ajax({
    type: "POST",
    url: "/search", // url to the function
    data: {
      name: $("#search-query").val(), // value of the form
    },
    success: function (response) {
      data = JSON.parse(response);
      update();
    },
  });
});

const container = document.querySelector(".results-container");
let update = () => {
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = element.Comment;
    container.appendChild(card);
  });
};
