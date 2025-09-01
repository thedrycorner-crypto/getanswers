const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
  const { pack } = JSON.parse(event.body);
  // Use STRING values for your actual Stripe Price IDs!
  const prices = {
    5: "price_1S2ZwrAJyNOCPM6pH7QpY0o4",   // 5 answers
    10: "price_1S2ZzEAJyNOCPM6pxGvi6STD"   // 10 answers
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: prices[pack], quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/success.html?pack=${pack}`,
    cancel_url: `${process.env.FRONTEND_URL}/`
  });
  return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
};
