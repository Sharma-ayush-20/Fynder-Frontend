function UserDetailsShimmer() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] px-6 sm:px-12 py-10 flex items-center justify-center animate-pulse">
      
      {/* Glow Background */}
      <div className="absolute left-32 top-40 w-96 h-96 bg-primary/20 rounded-full blur-[130px] opacity-40"></div>
      <div className="absolute right-32 bottom-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[130px] opacity-40"></div>

      {/* Layout Skeleton */}
      <div className="flex flex-col sm:flex-row items-center gap-14 w-full max-w-6xl">
        
        {/* Image Shimmer */}
        <div className="w-72 h-72 sm:w-80 sm:h-80 bg-base-300/50 rounded-3xl shadow-lg" />

        {/* Right Info Shimmer */}
        <div className="flex-1 space-y-5">
          {/* Name bar */}
          <div className="h-7 w-48 rounded-lg bg-base-300/50"></div>
          {/* Gender bar */}
          <div className="h-4 w-20 rounded-lg bg-base-300/40"></div>
          {/* About lines */}
          <div className="h-4 w-64 bg-base-300/40 rounded-lg"></div>
          <div className="h-4 w-52 bg-base-300/30 rounded-lg"></div>

          {/* Skill Shimmer */}
          <div className="flex gap-3 mt-2">
            <div className="w-16 h-6 rounded-full bg-primary/20"></div>
            <div className="w-20 h-6 rounded-full bg-primary/20"></div>
            <div className="w-14 h-6 rounded-full bg-primary/20"></div>
          </div>

          {/* Vibe Card Shimmer */}
          <div className="h-11 w-72 rounded-xl bg-base-300/40"></div>
        </div>

      </div>
    </div>
  );
}
export default UserDetailsShimmer