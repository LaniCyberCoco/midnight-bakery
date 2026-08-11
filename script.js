const addButtons = document.querySelectorAll(".add-to-order");

let orderCount = 0;

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    orderCount++;
    document.getElementById("orderCount").textContent = orderCount;
  });
});
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

if (message.includes("mochi donut")) {
  botReply = "Our featured mochi donut is Churro for $3.75. We also offer rotating specialty flavors.";
} else if (message.includes("ube") ||  message.includes("boba")) {
  botReply = "Try our Ube Milk Tea for $6.75. It's creamy, sweet, and served with chewy boba.";
} else if (message.includes("cake")) {
  botReply = "Whole cakes require at least 72 hours notice and a 50% non-refundable deposit.";
} else if (message.includes("corn dog")) {
  botReply = "You can customize a Korean corn dog with your choice of coating, filling, and sauce.";
}
chatMessages.innerHTML += `<p><strong>Midnight Bot:</strong> ${botReply}</p>`;
chatInput.value = "";
});

