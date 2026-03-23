import React, { useState } from "react";

export default function DonationForm({ onInitiate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 200) return alert("Minimum donation is ₹200");
    onInitiate({ name, phone, message, amount: Number(amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          placeholder="Aapka Naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-3 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          WhatsApp Number *
        </label>
        <input
          type="tel"
          pattern="[0-9]{10}"
          placeholder="10 Digit Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full pl-3 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Message (Optional)
        </label>
        <textarea
          placeholder="Write a short message of support..."
          rows="2"
          maxLength="100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full pl-3 pr-3 py-3 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-teal-500"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Amount (₹) *
        </label>
        <div className="flex gap-2 mb-3">
          {[500, 1000, 2000].map((preset) => (
            <button
              type="button"
              key={preset}
              onClick={() => setAmount(preset)}
              className={`flex-1 border py-2 rounded-xl font-bold transition shadow-sm ${
                amount === preset
                  ? "bg-teal-100 text-teal-800 border-teal-500"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              ₹{preset}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="200"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-3 border-2 border-teal-100 rounded-xl font-bold text-lg bg-teal-50/30 outline-none focus:border-teal-500"
        />
        <p className="text-[10px] text-slate-500 mt-1 pl-1">
          * Minimum donation is ₹200
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg mt-2 flex justify-center items-center transition"
      >
        Generate QR to Donate <i className="fa-solid fa-qrcode ml-2"></i>
      </button>
    </form>
  );
}
