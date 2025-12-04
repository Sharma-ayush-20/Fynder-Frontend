function SkeletonUserCard() {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl overflow-hidden">
      
      {/* Image Skeleton */}
      <div className="w-full h-[70vh] sm:h-[65vh] bg-base-300 animate-pulse rounded-2xl"></div>

      {/* Text Skeleton */}
      <div className="absolute bottom-24 sm:bottom-28 left-4 right-4 space-y-2">
        <div className="h-5 w-32 bg-base-300 rounded-md animate-pulse"></div>
        <div className="h-4 w-20 bg-base-300 rounded-md animate-pulse"></div>
        <div className="h-3 w-40 bg-base-300 rounded-md animate-pulse"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="absolute bottom-6 w-full flex justify-center gap-10 sm:gap-14">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-base-300 rounded-full animate-pulse"></div>
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-base-300 rounded-full animate-pulse"></div>
      </div>

    </div>
  );
}

export default SkeletonUserCard;
