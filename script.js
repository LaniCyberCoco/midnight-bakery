const addButtons = document.querySelectorAll(".add-to-order");

let orderCount = 0;
let orderTotal = 0;
const cart = {};

const cartItems = document.getElementById("cartItems");

// Displays everything currently in the cart
function renderCart() {
  cartItems.innerHTML = "";

  for (const itemName in cart) {
    const item = cart[itemName];
    const itemTotal = item.price * item.quantity;

    cartItems.innerHTML += `
      <p>
        ${itemName} × ${item.quantity} — $${itemTotal.toFixed(2)}
        <button class="remove-item" data-name="${itemName}">
          Remove
        </button>
      </p>
    `;
  }

  // Find the Remove buttons AFTER they are created
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach(function (removeButton) {
    removeButton.addEventListener("click", function () {
      const name = removeButton.dataset.name;

      if (cart[name]) {
        cart[name].quantity--;

        orderCount--;
        orderTotal -= cart[name].price;

        // If quantity reaches zero, remove product completely
        if (cart[name].quantity <= 0) {
          delete cart[name];
        }

        document.getElementById("orderCount").textContent = orderCount;
        document.getElementById("orderTotal").textContent =
          orderTotal.toFixed(2);

        renderCart();
      }
    });
  });
}

// Add to Order buttons
addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const price = Number(button.dataset.price);
    const productName = button.dataset.name;

    orderCount++;
    orderTotal += price;

    if (cart[productName]) {
      cart[productName].quantity++;
    } else {
      cart[productName] = {
        price: price,
        quantity: 1
      };
    }

    document.getElementById("orderCount").textContent = orderCount;
    document.getElementById("orderTotal").textContent =
      orderTotal.toFixed(2);

    renderCart();
  });
});


// MIDNIGHT BAKERY CHATBOT

const bakeryInfo = {
  mochi:
    "Our featured mochi donut is Churro for $3.75. We also offer rotating specialty flavors.",

  boba:
    "Our Ube Milk Tea is $6.75, and we also offer other milk teas, fruit teas, smoothies, and toppings.",

  cake:
    "Whole cakes require at least 72 hours notice and a 50% non-refundable deposit.",

  cornDog:
    "Korean corn dogs can be customized with your choice of coating, filling, and sauce.",

  wholeCake:
    "Whole cakes are $65 to $70 depending on the flavor. Orders must be placed at least 72 hours in advance with a 50% non-refundable deposit.",

  toppings:
    "You can add boba, popping pearls, or jelly for $0.65. Popping pearl flavors include strawberry, kiwi, lychee, passion fruit, and mango.",

  matcha:
    "If you love matcha, try a Matcha Mochi Donut, Matcha Latte, or Matcha Crepe Cake."
};

const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

sendMessageButton.addEventListener("click", function () {
  const userMessage = chatInput.value;

  if (userMessage.trim() === "") {
    return;
  }

  chatMessages.innerHTML += `
    <p>
      <strong>You:</strong> ${userMessage}
    </p>
  `;

  let botReply =
    "I'm still learning. Try asking about mochi donuts, boba, cakes, or corn dogs.";

  const message = userMessage.toLowerCase();

  if (message.includes("whole cake")) {
    botReply = bakeryInfo.wholeCake;

  } else if (message.includes("matcha")) {
    botReply = bakeryInfo.matcha;

  } else if (
    message.includes("mochi") ||
    message.includes("donut")
  ) {
    botReply = bakeryInfo.mochi;

  } else if (
    message.includes("ube") ||
    message.includes("boba")
  ) {
    botReply = bakeryInfo.boba;

  } else if (message.includes("cake")) {
    botReply = bakeryInfo.cake;

  } else if (message.includes("corn dog")) {
    botReply = bakeryInfo.cornDog;

  } else if (message.includes("topping")) {
    botReply = bakeryInfo.toppings;
  }

  chatMessages.innerHTML += `
    <p>
      <strong>Midnight Bot:</strong> ${botReply}
    </p>
  `;

  chatInput.value = "";
});