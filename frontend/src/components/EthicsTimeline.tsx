import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PolicyPoint {
  year: number;
  policies: {
    point: string;
    category: string;
    severity: 'low' | 'medium' | 'high';
    impact: string;
  }[];
}

interface EthicsTimelineProps {
  companyName: string;
  policies?: PolicyPoint[];
}

const EthicsTimeline: React.FC<EthicsTimelineProps> = ({ companyName, policies = [] }) => {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

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
      .sort((a, b) => a[0] - b[0])
      .map(([year, policyList]) => ({
        year,
        policies: policyList,
      }));

    return sortedYears;
  }, [policies]);

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 border-red-500 text-red-700';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-700';
      case 'low':
        return 'bg-green-500/20 border-green-500 text-green-700';
      default:
        return 'bg-gray-500/20 border-gray-500 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'Ethics Principles': 'bg-purple-100 text-purple-800',
      'Transparency': 'bg-blue-100 text-blue-800',
      'Fair Representation': 'bg-indigo-100 text-indigo-800',
      'Privacy': 'bg-pink-100 text-pink-800',
      'Safety': 'bg-red-100 text-red-800',
      'Accessibility': 'bg-green-100 text-green-800',
      'Governance': 'bg-orange-100 text-orange-800',
      'Research': 'bg-teal-100 text-teal-800',
      'Training': 'bg-cyan-100 text-cyan-800',
      'Partnership': 'bg-lime-100 text-lime-800',
      'Accountability': 'bg-violet-100 text-violet-800',
      'Philosophy': 'bg-fuchsia-100 text-fuchsia-800',
      'Standards': 'bg-amber-100 text-amber-800',
      'Certification': 'bg-rose-100 text-rose-800',
      'Framework': 'bg-sky-100 text-sky-800',
      'Technical': 'bg-slate-100 text-slate-800',
      'Services': 'bg-zinc-100 text-zinc-800',
      'Commitment': 'bg-stone-100 text-stone-800',
      'Evaluation': 'bg-neutral-100 text-neutral-800',
      'Sustainability': 'bg-emerald-100 text-emerald-800',
      'Inclusion': 'bg-orange-100 text-orange-800',
      'Engagement': 'bg-yellow-100 text-yellow-800',
      'Leadership': 'bg-red-100 text-red-800',
      'Applications': 'bg-blue-100 text-blue-800',
      'Events': 'bg-indigo-100 text-indigo-800',
      'Funding': 'bg-pink-100 text-pink-800',
      'Documentation': 'bg-green-100 text-green-800',
      'Monitoring': 'bg-teal-100 text-teal-800',
      'Advocacy': 'bg-purple-100 text-purple-800',
      'Social Impact': 'bg-orange-100 text-orange-800',
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  if (timelineData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Ethics Data Available</h3>
          <p className="text-gray-500">No AI policy data found for {companyName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
          {companyName} Ethics Timeline
        </h2>
        <p className="text-gray-600">AI Policy Evolution & Critical Points</p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-purple-600 rounded-full"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <div key={item.year} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8">
                <div className="w-6 h-6 bg-white border-4 border-orange-500 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                     onClick={() => toggleYear(item.year)}>
                  <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full"></div>
                </div>
              </div>

              {/* Content - alternating left and right */}
              <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2 pr-4 text-right">
                  {index % 2 === 0 && (
                    <div className="bg-white rounded-lg border-2 border-orange-200 p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{item.year}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {item.policies.length} policy {item.policies.length === 1 ? 'point' : 'points'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-1/2 pl-4">
                  {index % 2 === 1 && (
                    <div className="bg-white rounded-lg border-2 border-purple-200 p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{item.year}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        {item.policies.length} policy {item.policies.length === 1 ? 'point' : 'points'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable Details */}
              <div className={`mt-4 ${index % 2 === 0 ? 'ml-auto mr-1/2 w-1/2 pr-4' : 'mr-auto ml-1/2 w-1/2 pl-4'}`}>
                <button
                  onClick={() => toggleYear(item.year)}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-orange-50 to-purple-50 hover:from-orange-100 hover:to-purple-100 transition-colors px-4 py-2 rounded-lg border border-orange-200/50 group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {expandedYears.has(item.year) ? 'Hide' : 'Show'} Critical Points
                  </span>
                  {expandedYears.has(item.year) ? (
                    <ChevronUp className="w-4 h-4 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-purple-600" />
                  )}
                </button>

                {/* Expanded Content */}
                {expandedYears.has(item.year) && (
                  <div className="mt-3 space-y-3 animate-in fade-in duration-300">
                    {item.policies.map((policy, policyIndex) => (
                      <div
                        key={policyIndex}
                        className="bg-white border-l-4 border-orange-500 rounded-r-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(policy.category)}`}>
                            {policy.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${getSeverityColor(policy.severity)}`}>
                            {policy.severity.charAt(0).toUpperCase() + policy.severity.slice(1)} Impact
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">
                          {policy.point}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {policy.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-6 border border-orange-200/50">
        <h3 className="font-semibold text-gray-900 mb-4">Impact Levels</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">High Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">Medium Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsTimeline;
