import React from 'react'
import { ExternalLink, Shield, Zap, Users, CheckCircle, Lightbulb } from 'lucide-react'

interface CompanyPoliciesDisplayProps {
  companyName: string
}

export default function CompanyPoliciesDisplay({ companyName }: CompanyPoliciesDisplayProps) {
  const policies: Record<string, {
    title: string
    icon: React.ReactNode
    principles: {
      name: string
      description: string
      details: string[]
    }[]
    sourceUrl: string
  }> = {
    google: {
      title: "Google's AI Principles",
      icon: <Lightbulb className="w-6 h-6" />,
      sourceUrl: 'https://ai.google/principles/',
      principles: [
        {
          name: '🚀 Bold Innovation',
          description: 'Rapidly innovating and deploying AI that assists, empowers, and inspires people.',
          details: [
            'Developing models where benefits substantially outweigh risks',
            'Advancing AI research through scientific rigor and open inquiry',
            'Using AI to accelerate breakthroughs in science and medicine',
            'Solving real-world problems with measurable outcomes'
          ]
        },
        {
          name: '🛡️ Responsible Development',
          description: 'Pursuing AI responsibly throughout the entire development lifecycle.',
          details: [
            'Implementing human oversight and feedback mechanisms',
            'Investing in safety and security research',
            'Employing rigorous testing and safeguards',
            'Promoting privacy, security, and intellectual property rights'
          ]
        },
        {
          name: '🤝 Collaborative Progress',
          description: 'Making tools that empower others to harness AI for collective benefit.',
          details: [
            'Developing AI as a foundational technology for creativity',
            'Collaborating with researchers across industry and academia',
            'Fostering an ecosystem for innovation',
            'Engaging with civil society on societal challenges'
          ]
        }
      ]
    },
    microsoft: {
      title: "Microsoft's Responsible AI",
      icon: <Shield className="w-6 h-6" />,
      sourceUrl: 'https://www.microsoft.com/en-us/ai/responsible-ai',
      principles: [
        {
          name: '✅ Accountability',
          description: 'Taking responsibility for AI systems and their impacts.',
          details: [
            'Clear governance and oversight mechanisms',
            'Transparent decision-making processes',
            'Regular audits and impact assessments',
            'Public reporting on AI practices'
          ]
        },
        {
          name: '🔍 Transparency & Explainability',
          description: 'Making AI systems understandable to users and stakeholders.',
          details: [
            'Clear documentation of AI capabilities and limitations',
            'Explainable AI techniques',
            'User-friendly interfaces',
            'Clear communication about AI involvement'
          ]
        },
        {
          name: '⚖️ Fairness & Inclusion',
          description: 'Ensuring AI benefits everyone equitably.',
          details: [
            'Bias detection and mitigation',
            'Inclusive design practices',
            'Diverse training data',
            'Accessibility for all users'
          ]
        },
        {
          name: '🔐 Privacy & Security',
          description: 'Protecting user data and system security.',
          details: [
            'Data protection and encryption',
            'Compliance with regulations',
            'Regular security audits',
            'User data control and consent'
          ]
        }
      ]
    },
    openai: {
      title: "OpenAI's Safety & Alignment",
      icon: <Zap className="w-6 h-6" />,
      sourceUrl: 'https://openai.com/safety/',
      principles: [
        {
          name: '🎯 Safety First',
          description: 'Prioritizing safety in all AI development.',
          details: [
            'Rigorous testing for harmful behaviors',
            'Ongoing monitoring and evaluation',
            'Safety-focused research initiatives',
            'Red-teaming and adversarial testing'
          ]
        },
        {
          name: '📚 Alignment Research',
          description: 'Ensuring AI systems align with human values.',
          details: [
            'Value learning techniques',
            'Interpretability research',
            'Multi-stakeholder engagement',
            'Continuous improvement mechanisms'
          ]
        },
        {
          name: '🌍 Beneficial AI',
          description: 'Developing AI that benefits humanity.',
          details: [
            'Long-term AI safety research',
            'Responsible deployment practices',
            'Industry collaboration',
            'Public engagement and education'
          ]
        }
      ]
    }
  }

  const policy = policies[companyName.toLowerCase()]

  if (!policy) {
    return (
      <div className="text-center py-8 text-dark-400">
        <p>Official policies for {companyName} are not yet available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-purple-400">{policy.icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-white">{policy.title}</h2>
          <p className="text-dark-400 text-sm">Official company policies sourced from official documentation</p>
        </div>
        <a
          href={policy.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-100 border border-purple-600/30 rounded-lg transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm font-medium">View Official Page</span>
        </a>
      </div>

      {/* Principles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policy.principles.map((principle, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-purple-900/30 to-dark-900/50 border border-purple-600/20 hover:border-purple-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            {/* Principle Title */}
            <h3 className="text-lg font-bold text-white mb-2">{principle.name}</h3>

            {/* Description */}
            <p className="text-amber-100/80 text-sm mb-4">{principle.description}</p>

            {/* Details */}
            <div className="space-y-2">
              {principle.details.map((detail, detailIdx) => (
                <div key={detailIdx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-dark-300 text-xs leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-dark-800/50 to-purple-900/20 border border-purple-600/20 rounded-xl p-4 flex items-start gap-3">
        <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold mb-1">Commitment to Ethical AI</p>
          <p className="text-dark-300 text-sm">{companyName} is committed to developing and deploying AI responsibly, with transparency, safety, and human benefit at the core of their approach.</p>
        </div>
      </div>
    </div>
  )
}
