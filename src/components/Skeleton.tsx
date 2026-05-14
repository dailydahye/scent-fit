export function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-beige-50 ${className}`}
      aria-hidden
    />
  );
}

export function ResultSkeleton() {
  return (
    <div className="container-content grid gap-10 py-10 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-16">
      <div className="space-y-4">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-10 w-3/4" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
      <div className="space-y-6">
        <SkeletonBlock className="h-48 w-full" />
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonBlock className="h-56" />
          <SkeletonBlock className="h-56" />
        </div>
      </div>
    </div>
  );
}