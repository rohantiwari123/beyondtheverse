import React, { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How will these funds be used?",
      a: "The funds will go directly towards purchasing better streaming equipment, a high-quality microphone, drawing tablets, and paying for premium software subscriptions required to run uninterrupted, high-quality classes.",
    },
    {
      q: "Is my payment secure?",
      a: "Yes! We do not collect any bank details. You make the payment securely using your own trusted UPI app (GPay, PhonePe, Paytm, etc.).",
    },
    {
      q: "Can I contribute anonymously?",
      a: "You can write 'Anonymous' or 'Well Wisher' in the Name field if you prefer not to disclose your real name publicly.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold border-b pb-3 mb-4 text-slate-800">
        <i className="fa-regular fa-circle-question text-teal-600 mr-2"></i>{" "}
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-slate-100 pb-2">
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full text-left font-semibold text-slate-700 flex justify-between items-center py-2 hover:text-teal-600 transition"
            >
              {faq.q}
              <i
                className={`fa-solid fa-chevron-down text-sm text-slate-400 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            <div
              className="faq-answer text-sm text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: openIndex === idx ? "500px" : "0",
                paddingBottom: openIndex === idx ? "1rem" : "0",
              }}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
