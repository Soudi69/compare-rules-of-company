import React, { useCallback } from 'react';
import { Activity, ChevronRight } from 'lucide-react';
import { getEthicsTimeline } from '../services/api';

interface AnalysisPanelProps {
  selectedCompany: string | null;
  onAnalyze?: () => void;
  onTimelineToggle?: (show: boolean) => void;
  onQuickReview?: () => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ selectedCompany, onAnalyze, onTimelineToggle, onQuickReview }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAnalyse = useCallback(async () => {
    if (!selectedCompany) {
      setError('Please select a company first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Verify data exists
      await getEthicsTimeline(selectedCompany);
      onTimelineToggle?.(true);
      onAnalyze?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load ethics timeline';
      setError(errorMessage);
      onTimelineToggle?.(false);
    } finally {
      setLoading(false);
    }
  }, [selectedCompany, onAnalyze, onTimelineToggle]);

  return (
    <div className="w-full">
      {/* Analyse Button Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <button
          onClick={handleAnalyse}
          disabled={!selectedCompany || loading}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-500/50 disabled:shadow-none"></div>

          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse group-hover:animate-none" />
            <span>{loading ? 'Loading...' : 'Analyse'}</span>
            {!loading && <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </div>
        </button>

        <button
          onClick={onQuickReview}
          disabled={!selectedCompany}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/50 disabled:shadow-none"></div>

          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <Activity className="w-5 h-5 group-hover:animate-none" />
            <span>Quick Review</span>
            {<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </div>
        </button>

        {!selectedCompany && (
          <p className="text-sm text-gray-500">Select a company to analyse its ethics timeline</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <p className="font-semibold mb-1">Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
