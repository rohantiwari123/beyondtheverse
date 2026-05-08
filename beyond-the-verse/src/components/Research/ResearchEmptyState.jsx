import React from "react";

const ResearchEmptyState = ({
  message = "No research yet",
  subMessage = "Be the first to share your knowledge with the community!",
}) => {
  return (
    <div className="border-y border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center sm:mx-0 sm:rounded-[2rem] sm:border">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-teal-600 shadow-sm border border-slate-100">
        <i className="fa-solid fa-microscope text-3xl"></i>
      </div>
      <h3 className="text-xl font-black tracking-tight text-slate-800">
        {message}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        {subMessage}
      </p>
    </div>
  );
};

export default ResearchEmptyState;
