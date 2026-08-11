const addButtons = document.querySelectorAll(".add-to-order");

let orderCount = 0;
let orderTotal = 0;


addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    orderCount++;
    const price = Number(button.dataset.price);
    const productName = button.dataset.name;
const cartItems = document.getElementById("cartItems");

cartItems.innerHTML += `<p>${productName} — $${price.toFixed(2)}</p>`;
orderTotal += price;
document.getElementById("orderCount").textContent = orderCount;
document.getElementById("orderTotal").textContent = orderTotal.toFixed(2);  });
});

const bakeryInfo = {
  mochi: "Our featured mochi donut is Churro for $3.75. We also offer rotating specialty flavors.",
  boba: "Our Ube Milk Tea is $6.75, and we also offer other milk teas, fruit teas, smoothies, and toppings.",
  cake: "Whole cakes require at least 72 hours notice and a 50% non-refundable deposit.",
  cornDog: "Korean corn dogs can be customized with your choice of coating, filling, and sauce.",
  wholeCake: "Whole cakes are $65 to $70 depending on the flavor. Orders must be placed at least 72 hours in advance with a 50% non-refundable deposit.",
  toppings: "You can add boba, popping pearls, or jelly for $0.65. Popping pearl flavors include strawberry, kiwi, lychee, passion fruit, and mango.",
  matcha: "If you love matcha, try a Matcha Mochi Donut, Matcha Latte, or Matcha Crepe Cake.",
};

const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

sendMessageButton.addEventListener("click", function () {
  const userMessage = chatInput.value;

  if (userMessage.trim() === "") {
    return;
  }

  chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

  let botReply = "I'm still learning. Try asking about mochi donuts, boba, cakes, or corn dogs.";
  const message = userMessage.toLowerCase();

 if (message.includes("mochi") || message.includes("donut")) {
  botReply = bakeryInfo.mochi;
} else if (message.includes("ube") || message.includes("boba")) {
  botReply = bakeryInfo.boba;
} else if (message.includes("whole cake")) {
  botReply = bakeryInfo.wholeCake;
} else if (message.includes("cake")) {
  botReply = bakeryInfo.cake;
} else if (message.includes("corn dog")) {
  botReply = bakeryInfo.cornDog;
} else if (message.includes("topping")) {
  botReply = bakeryInfo.toppings;
}
else if (message.includes("matcha")) {
  botReply = bakeryInfo.matcha;
}
chatMessages.innerHTML += `<p><strong>Midnight Bot:</strong> ${botReply}</p>`;
chatInput.value = "";
});
