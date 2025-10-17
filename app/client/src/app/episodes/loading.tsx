export default function LoadingEpisodes() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-72 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="h-40 w-full bg-gray-200 rounded-xl mb-4" />
              <div className="h-6 w-2/3 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


