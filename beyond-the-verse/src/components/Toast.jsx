import React from "react";

export default function Toast({ toast }) {
  return (
    <div
      className={`fixed bottom-5 right-5 bg-teal-800 text-white px-6 py-4 rounded-xl shadow-2xl transform transition-transform duration-300 z-[200] flex items-center gap-3 font-medium ${
        toast.show ? "translate-y-0" : "translate-y-32"
      }`}
    >
      <i
        className={
          toast.isSuccess
            ? "fa-solid fa-circle-check text-green-400 text-xl"
            : "fa-solid fa-circle-info text-blue-400 text-xl"
        }
      ></i>
      <span>{toast.message}</span>
    </div>
  );
}
