import React, { useState, useMemo } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface PolicyPoint {
  year: number;
  policies: {
    point: string;
    category: string;
    severity: 'low' | 'medium' | 'high';
    impact: string;
    statement?: string;
    details?: string;
  }[];
}

interface EthicsTimelineProps {
  companyName: string;
  policies?: PolicyPoint[];
}

const EthicsTimeline: React.FC<EthicsTimelineProps> = ({ companyName, policies = [] }) => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyPoint['policies'][number] | null>(null);

  // Group policies by year
  const timelineData = useMemo(() => {
    const years = new Map<number, PolicyPoint['policies']>();
    
    policies.forEach((policy) => {
      if (!years.has(policy.year)) {
        years.set(policy.year, []);
      }
      years.get(policy.year)?.push(...policy.policies);
    });

    const sortedYears = Array.from(years.entries())
      .sort((a, b) => b[0] - a[0]) // Sort descending (newest first)
      .map(([year, policyList]) => {
        const hasBullets = (str?: string) => str && (str.includes('-') || str.includes('•'));
        
        const withBullets = policyList.filter(p => hasBullets(p.details) || hasBullets(p.statement));
        const withoutBullets = policyList.filter(p => !hasBullets(p.details) && !hasBullets(p.statement));

        let finalPolicies = [...withBullets];
        
        if (withoutBullets.length > 1) {
            finalPolicies.push({
                point: "Additional General Updates",
                category: "Misc",
                severity: "low",
                impact: "Various lower-priority structural or operational agreements.",
                statement: withoutBullets.map(p => `• ${p.point}`).join('\n'),
                details: "A consolidated group of specific milestones that lacked exhaustive underlying documentative details:\n\n" + withoutBullets.map(p => `- ${p.point}: ${p.impact}`).join('\n')
            });
        } else if (withoutBullets.length === 1) {
            finalPolicies.push(withoutBullets[0]);
        }

        return {
          year,
          policies: finalPolicies,
        };
      });

    return sortedYears;
  }, [policies]);

  const totalPoints = useMemo(() => {
    return timelineData.reduce((sum, entry) => sum + entry.policies.length, 0);
  }, [timelineData]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-900/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-900/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    // A mapping returning minimalist dark mode specific badges
    const categoryColors: Record<string, string> = {
      'Ethics Principles': 'bg-purple-900/30 text-purple-300 border border-purple-700/50',
      'Transparency': 'bg-blue-900/30 text-blue-300 border border-blue-700/50',
      'Fair Representation': 'bg-indigo-900/30 text-indigo-300 border border-indigo-700/50',
      'Privacy': 'bg-pink-900/30 text-pink-300 border border-pink-700/50',
      'Safety': 'bg-red-900/30 text-red-300 border border-red-700/50',
      'Accessibility': 'bg-green-900/30 text-green-300 border border-green-700/50',
      'Governance': 'bg-orange-900/30 text-orange-300 border border-orange-700/50',
      'Research': 'bg-teal-900/30 text-teal-300 border border-teal-700/50',
      'Training': 'bg-cyan-900/30 text-cyan-300 border border-cyan-700/50',
      'Accountability': 'bg-violet-900/30 text-violet-300 border border-violet-700/50',
      'Philosophy': 'bg-fuchsia-900/30 text-fuchsia-300 border border-fuchsia-700/50',
    };
    return categoryColors[category] || 'bg-white/5 text-gray-300 border border-white/10';
  };

  const getKeywordCount = (impact: string) => {
    const match = impact.match(/(\d+)/);
    return match ? Number(match[1]) : null;
  };

  if (timelineData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white">
        <h3 className="text-xl font-semibold mb-2">No Ethics Data Available</h3>
        <p className="text-gray-400">No AI policy milestones found for {companyName}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 sm:px-8 text-white relative">
      {/* Sleek Minimal Header */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent mb-3">
          {companyName} Ethics Evolution
        </h2>
        <div className="flex flex-wrap items-center text-xs sm:text-sm gap-4 text-gray-400 font-medium">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> {totalPoints} Core Policies</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> {timelineData.length} Years Analyzed</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 bg-gradient-to-r from-orange-950/40 to-purple-950/40 rounded-lg p-6 border border-orange-500/20">
        <h3 className="font-semibold text-white mb-4">Impact Levels</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-300">High Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-300">Medium Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-300">Low Impact</span>
          </div>
        </div>
      </div>

      {/* DETAILED POLICY MODAL */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-orange-500/30 rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex justify-between items-center p-6 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Go Back</span>
              </button>
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 text-white space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${getCategoryColor(selectedPolicy.category)}`}>
                  {selectedPolicy.category}
                </span>
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border ${getSeverityColor(selectedPolicy.severity)}`}>
                  {selectedPolicy.severity} Priority
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                {selectedPolicy.point}
              </h2>

              {selectedPolicy.statement && (
                <div className="px-6 py-4 border-l-4 border-purple-500/50 bg-white/5 rounded-r-lg italic text-lg text-gray-200">
                  "{selectedPolicy.statement}"
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Summary Impact</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedPolicy.impact}</p>
                </div>

                {selectedPolicy.details && (
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Detailed Explanation</h4>
                    <p className="text-gray-300 text-base leading-loose whitespace-pre-line">
                      {selectedPolicy.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main List Layout */}
      <div className="space-y-6">
        {timelineData.map((item, yearIndex) => (
          <div key={item.year} className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 group">
            
            {/* Year Block (Left side) */}
            <div className="sm:w-28 shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start pt-1 gap-4 sm:gap-0 z-10 sm:sticky sm:top-24 self-start">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
                {item.year}
              </div>
              <div className="text-[10px] sm:text-xs text-orange-400/80 uppercase tracking-widest font-semibold mt-1">
                {item.policies.length} {item.policies.length === 1 ? 'Update' : 'Updates'}
              </div>
            </div>

            {/* Timline Visual Connector (Hidden on very small screens) */}
            <div className="hidden sm:flex relative w-4 flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-black border-2 border-orange-500 z-10 shadow-[0_0_10px_rgba(249,115,22,0.5)] mt-3 group-hover:scale-125 transition-transform duration-300"></div>
              {yearIndex !== timelineData.length - 1 && (
                <div className="w-px h-full bg-gradient-to-b from-orange-500/50 via-purple-500/20 to-transparent absolute top-6"></div>
              )}
            </div>

            {/* Policy Points (Right Side) */}
            <div className="flex-1 pb-10">
              <div className="flex flex-col gap-4">
                {item.policies.map((policy, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedPolicy(policy)}
                    className="relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl p-5 backdrop-blur-md overflow-hidden transition-all duration-300 group/card cursor-pointer"
                  >
                    {/* Glossy gradient inset */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                    
                    {/* Clean Left colored line */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${policy.severity === 'high' ? 'bg-red-500/50' : policy.severity === 'medium' ? 'bg-yellow-500/50' : 'bg-green-500/50'}`}></div>
                    
                    <div className="relative z-10 pl-2">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(policy.category)}`}>
                          {policy.category}
                        </span>
                        <span className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${getSeverityColor(policy.severity)}`}>
                          {policy.severity} Priority
                        </span>
                        {getKeywordCount(policy.impact) !== null && (
                          <span className="px-2.5 py-1 text-[10px] font-bold text-gray-400 bg-black/40 border border-gray-700/50 rounded-sm">
                            K-Factor: {getKeywordCount(policy.impact)}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-semibold text-gray-100 mb-2 leading-snug drop-shadow-md">
                        {policy.point}
                      </h4>
                      {policy.statement && (
                        <div className="mb-3 px-3 py-2 border-l-2 border-purple-500/50 bg-white/5 rounded-r flex gap-2 items-start">
                          <span className="text-purple-400 font-serif text-xl leading-none">"</span>
                          <span className="italic text-sm text-gray-300">
                            {policy.statement}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                        {policy.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default EthicsTimeline;
