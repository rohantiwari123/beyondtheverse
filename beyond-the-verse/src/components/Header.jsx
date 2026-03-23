import React, { useState, useEffect } from "react";

export default function Header({ onAdminClick }) {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount >= 3) {
      onAdminClick();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [clickCount, onAdminClick]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-teal-700 flex items-center gap-2 cursor-pointer select-none"
          title="Click 3 times for Admin"
          onClick={() => setClickCount((prev) => prev + 1)}
        >
          <i className="fa-solid fa-atom pointer-events-none"></i> Beyond The
          Verse
        </h1>
      </div>
    </header>
  );
}
