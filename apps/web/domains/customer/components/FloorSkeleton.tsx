import { Skeleton } from "@heroui/react";
import { Building2 } from "lucide-react";
import React from "react";

const FloorSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Floor 1 - Six rooms with grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center">
            <Building2 className="h-4 w-4 text-gray-400" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>

      {/* Floor 2 - Six rooms with grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center">
            <Building2 className="h-4 w-4 text-gray-400" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default FloorSkeleton;
