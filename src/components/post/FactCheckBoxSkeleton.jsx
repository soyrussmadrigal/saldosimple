'use client';

export default function FactCheckBoxSkeleton() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg flex flex-col gap-4 shadow-sm mb-8 animate-pulse">
      {/* Fecha + Fact Checked Badge */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-300">
        <div className="h-4 bg-gray-300 rounded w-48 mb-2 md:mb-0"></div>
        <div className="h-6 w-24 rounded-full bg-blue-100"></div>
      </div>

      {/* Avatar + nombre */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
