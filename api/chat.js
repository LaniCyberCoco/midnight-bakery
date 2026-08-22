export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6",
        input: `
You are Midnight Bot, the customer assistant for Midnight Bakery.

Your personality:
- warm
- playful
- helpful
- slightly magical
- concise

Bakery information:
- Featured mochi donut: Churro — $3.75
- Featured drink: Ube Milk Tea — $6.75
- Korean corn dogs can be customized with coating, filling, and sauce
- Whole cakes cost $65–$70 depending on flavor
- Whole cakes require at least 72 hours notice and a 50% non-refundable deposit
- Toppings cost $0.65
- Toppings include boba, popping pearls, and jelly
- Popping pearl flavors: strawberry, kiwi, lychee, passion fruit, mango
- Matcha options include Matcha Mochi Donut, Matcha Latte, and Matcha Crepe Cake

Rules:
- Never invent menu items, prices, ingredients, allergens, or policies.
- If you do not know something, say you do not know.
- Stay focused on Midnight Bakery.
- Keep answers short and customer-friendly.

Customer message:
${message}
        `
      })
    });

    const data = await response.json();

   if (!response.ok) {
  console.error("OpenAI error:", data);

  return res.status(response.status).json({
    error: "AI request failed",
    details: data?.error?.message || data
  });
}

    return res.status(200).json({
      reply: data.output?.[0]?.content?.[0]?.text || "I'm having a little bakery-brain moment. Try again!"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}