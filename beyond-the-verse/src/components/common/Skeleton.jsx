import React from 'react';

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
);

export const PostSkeleton = () => (
  <div className="w-full border-y sm:border sm:rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] mb-0 sm:mb-6 md:mb-8 pt-5 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-8 lg:px-10 bg-white border-slate-100 sm:border-slate-200">
    <div className="flex items-start justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
    <div className="space-y-3 mb-6 sm:mb-8">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
      <Skeleton className="h-6 w-4/6" />
    </div>
    <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
    </div>
  </div>
);

export const ResearchCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-6 space-y-4 shadow-sm">
    <div className="flex justify-between">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-5 w-24" />
    </div>
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-2 pt-4">
      <Skeleton className="h-6 w-16 rounded-lg" />
      <Skeleton className="h-6 w-16 rounded-lg" />
    </div>
  </div>
);

export const LibrarySkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm">
    <Skeleton className="h-24 w-full rounded-xl" />
    <Skeleton className="h-4 w-3/4 mx-auto" />
    <Skeleton className="h-3 w-1/2 mx-auto" />
  </div>
);
