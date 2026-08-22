const addButtons = document.querySelectorAll(".add-to-order");

let orderCount = 0;
let orderTotal = 0;
const cart = {};

const cartItems = document.getElementById("cartItems");

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

  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach(function (removeButton) {
    removeButton.addEventListener("click", function () {
      const name = removeButton.dataset.name;

      if (cart[name]) {
        cart[name].quantity--;

        orderCount--;
        orderTotal -= cart[name].price;

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
});const bakeryInfo = {
  mochi: {
    featuredFlavor: "Churro",
    price: 3.75,
    specialtyFlavors: "rotating"
  },

  boba: {
    featuredDrink: "Ube Milk Tea",
    price: 6.75,
    categories: [
      "milk teas",
      "fruit teas",
      "smoothies"
    ],
    toppingsAvailable: true
  },

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
const placeOrderButton = document.getElementById("placeOrder");
const orderConfirmation = document.getElementById("orderConfirmation");

placeOrderButton.addEventListener("click", function () {
  const customerName = document.getElementById("customerName").value;
  const customerPhone = document.getElementById("customerPhone").value;
  const pickupTime = document.getElementById("pickupTime").value;

  if (
    customerName.trim() === "" ||
    customerPhone.trim() === "" ||
    pickupTime === ""
  ) {
    orderConfirmation.textContent =
      "Please fill out your name, phone number, and pickup time.";
    return;
  }

  if (orderCount === 0) {
    orderConfirmation.textContent =
      "Please add at least one item to your order.";
    return;
  }

  orderConfirmation.textContent =
    `Thanks, ${customerName}! Your order is confirmed for ${pickupTime}.`;
});

const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

const midnightBotPersonality = {
  name: "Midnight Bot",
  tone: "warm, playful, helpful, slightly magical",
  style: "short, friendly answers",
  rules: [
    "Do not invent menu items, prices, ingredients, allergens, or policies.",
    "If information is unknown, say you do not know.",
    "Stay focused on Midnight Bakery.",
    "Offer helpful suggestions without being pushy.",
    "Keep answers concise."
  ]
};

chatInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessageButton.click();
  }
});

sendMessageButton.addEventListener("click", async function () {
  const userMessage = chatInput.value;

  if (userMessage.trim() === "") {
    return;
  }

  chatMessages.innerHTML += `
    <p>
      <strong>You:</strong> ${userMessage}
    </p>
  `;

  chatInput.value = "";

  chatMessages.innerHTML += `
    <p id="thinkingMessage">
      <strong>Midnight Bot:</strong> Thinking... ✨
    </p>
  `;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    const data = await response.json();

    const thinkingMessage = document.getElementById("thinkingMessage");

    if (!response.ok) {
      thinkingMessage.innerHTML = `
        <strong>Midnight Bot:</strong>
        Sorry, I'm having a little bakery-brain moment. Try again! ✨
      `;
      return;
    }

    thinkingMessage.innerHTML = `
      <strong>Midnight Bot:</strong> ${data.reply}
    `;
  } catch (error) {
    console.error(error);

    const thinkingMessage = document.getElementById("thinkingMessage");

    thinkingMessage.innerHTML = `
      <strong>Midnight Bot:</strong>
      Oops! Something went wrong. Try again in a moment. ✨
    `;
  }
});