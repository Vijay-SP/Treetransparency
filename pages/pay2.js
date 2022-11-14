import React, { useEffect, useState } from 'react'

export default function pay2() {
  const [amount, setAmount] = useState(0)

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST", body: {amount} }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: "rzp_test_W488yU9uOndfwZ", // Enter the Key ID generated from the Dashboard
      name: "Manu Arora Pvt Ltd",
      currency: "INR",
      amount: data.amount,
      order_id: data.order_id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

    return (
    <div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
        <div style={{color:"white"}}>{amount}</div>
        <button onClick={makePayment}>Submit</button>
    </div>
  )
}
