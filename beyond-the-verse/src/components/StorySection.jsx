import React from "react";

export default function StorySection() {
  return (
    <>
      <div className="bg-teal-800 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <span className="bg-teal-600 text-teal-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Education Initiative
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2 leading-tight">
            Help Upgrade My Teaching Setup.
          </h2>
          <p className="text-teal-100 text-lg">
            Bring Science & Practical Philosophy to Everyone.
          </p>
        </div>
        <i className="fa-solid fa-book-open-reader absolute -bottom-4 -right-4 text-9xl text-teal-700 opacity-50"></i>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold border-b pb-3 mb-4 text-slate-800">
          The Story
        </h3>
        <p className="mb-4 text-slate-600 leading-relaxed">
          <strong>I am Rohan</strong>, and I am an independent educator. I am
          raising funds to sustain and upgrade a very personal educational
          initiative called "Beyond the Verse."
        </p>
        <h4 className="font-semibold text-lg text-teal-700 mt-6 mb-2">
          What is 'Beyond the Verse'?
        </h4>
        <p className="mb-4 text-slate-600 leading-relaxed">
          Today, we are surrounded by information but often lack true clarity.
          We suffer from deep-rooted conditioning, fears, and blind beliefs. To
          address this, I hold online dialogues and classes where we bring
          together the sharp, evidence-based logic of <strong>Science</strong>{" "}
          and the profound wisdom of <strong>Philosophy</strong>.
        </p>
        <h4 className="font-semibold text-lg text-teal-700 mt-6 mb-2">
          Why I need your support:
        </h4>
        <p className="mb-4 text-slate-600 leading-relaxed">
          Until now, I have been managing with very basic tools. To make these
          sessions more accessible, clear, and impactful for a larger audience,
          I need to upgrade my digital teaching infrastructure.
        </p>
      </div>
    </>
  );
}
