export default function LoadingSpinner() {
  return (
    <div className="bg-dark-800/50 border border-purple-900/20 rounded-xl p-12 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full animate-spin opacity-75"></div>
          <div className="absolute inset-1 bg-dark-800 rounded-full"></div>
          <div className="absolute inset-1 bg-gradient-to-r from-purple-600/30 to-purple-400/30 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-white">Analyzing...</h3>
          <p className="text-dark-400 max-w-md">
            Our AI is reviewing company guidelines, identifying changes over time, and extracting insights. This may take a moment.
          </p>
        </div>
        <div className="w-full max-w-md space-y-2">
          <div className="space-y-1">
            <p className="text-xs text-dark-500 font-semibold">Processing steps:</p>
            <div className="space-y-2">
              {['Fetching guidelines', 'Analyzing policies', 'Identifying risks', 'Generating insights'].map((step, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: `${idx * 0.2}s`}}></div>
                  <span className="text-dark-400">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
