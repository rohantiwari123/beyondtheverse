import React from "react";
import ResearchCard from "./ResearchCard";
import ResearchEmptyState from "./ResearchEmptyState";

const ResearchList = ({
  researches = [],
  viewMode,
  selectedField,
  searchQuery,
  isAdmin,
  onDeleteResearch,
}) => {
  return (
    <section>
      {/* Clean Header */}
      <div className="mb-6 px-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Research Library
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Published Researches
          </h2>
        </div>

        {/* Result Counter Badge */}
        <div className="hidden items-center justify-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex">
          {researches?.length || 0} result
          {(researches?.length || 0) === 1 ? "" : "s"}
        </div>
      </div>

      {/* SAFETY CHECK: Check if array is empty or undefined */}
      {!researches || researches.length === 0 ? (
        <ResearchEmptyState
          message="No research yet" // Fixed: Ab yahan wahi dikhega jo aap chahte hain
          subMessage={
            searchQuery || selectedField
              ? "Try another keyword or field filter."
              : "Be the first to share evidence-backed knowledge with the community."
          }
        />
      ) : (
        <div
          className={
            viewMode === "compact"
              ? // COMPACT VIEW: Edge-to-edge on mobile
                "-mx-4 flex flex-col sm:mx-0"
              : // CARD VIEW: Responsive grid
                "grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6"
          }
        >
          {researches.map((res) => (
            <ResearchCard
              key={res.id}
              res={res}
              viewMode={viewMode}
              isAdmin={isAdmin}
              onDeleteResearch={onDeleteResearch}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResearchList;
