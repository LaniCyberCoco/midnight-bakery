const addButtons = document.querySelectorAll(".add-to-order");

let orderCount = 0;

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    orderCount++;
    document.getElementById("orderCount").textContent = orderCount;
  });
});