/**
 * Cosmos Theme Example Component
 * Showcase of all beautiful components in the theme
 * 
 * This file demonstrates how to use the cosmos-themed components
 * in your actual application
 */

import React, { useState } from 'react'
import {
  CosmicButton,
  SecondaryButton,
  GhostButton,
  CosmicInput,
  CosmicCard,
  GlassCard,
  CosmicBadge,
  AuroraText,
  CosmicHeading,
  ShimmerText,
  CosmicDivider,
  FloatingElement,
  GlowPulse,
  CosmicSpinner,
  CosmicAlert,
  CosmicModal,
  CosmicLayout,
  useCosmosColors,
} from './CosmosTheme'
import { Sparkles, Zap, Heart } from 'lucide-react'

/**
 * Main Example Component
 * Displays all cosmos theme components in action
 */
export function CosmosThemeShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const colors = useCosmosColors()

  return (
    <CosmicLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <FloatingElement>
              <Sparkles className="w-12 h-12 text-nebula-500" />
            </FloatingElement>
          </div>

          <CosmicHeading className="mb-4 text-5xl">
            Welcome to <AuroraText>Cosmos Theme</AuroraText>
          </CosmicHeading>

          <p className="text-gray-300 text-lg mb-8">
            A beautiful, dark-themed, cosmic-styled UI system with gorgeous gradients and cute animations
          </p>

          <div className="flex gap-4 justify-center">
            <CosmicButton>Get Started</CosmicButton>
            <SecondaryButton>Learn More</SecondaryButton>
          </div>
        </div>

        <CosmicDivider />

        {/* Alerts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Alert & Notifications</h2>

          <div className="space-y-4">
            <CosmicAlert
              type="success"
              title="✓ Success!"
              message="Your changes have been saved successfully"
            />

            <CosmicAlert
              type="error"
              title="✕ Error"
              message="Something went wrong. Please try again later"
            />

            <CosmicAlert
              type="warning"
              title="⚠ Warning"
              message="This action cannot be undone"
            />

            <CosmicAlert
              type="info"
              title="ℹ Information"
              message="New features are now available"
            />
          </div>
        </section>

        <CosmicDivider />

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Button Variations</h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <CosmicCard className="p-8 flex flex-col items-center gap-4">
              <CosmicButton>Primary Button</CosmicButton>
              <p className="text-sm text-gray-400">Main CTA</p>
            </CosmicCard>

            <CosmicCard className="p-8 flex flex-col items-center gap-4">
              <SecondaryButton>Secondary Button</SecondaryButton>
              <p className="text-sm text-gray-400">Secondary Action</p>
            </CosmicCard>

            <CosmicCard className="p-8 flex flex-col items-center gap-4">
              <GhostButton>Ghost Button</GhostButton>
              <p className="text-sm text-gray-400">Minimal Style</p>
            </CosmicCard>
          </div>

          <p className="text-gray-300 mb-4">
            Hover over buttons to see beautiful animations and glow effects
          </p>
        </section>

        <CosmicDivider />

        {/* Input Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Input Fields</h2>

          <CosmicCard>
            <h3 className="text-lg font-semibold text-white mb-4">Search</h3>

            <CosmicInput
              placeholder="Search cosmos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <CosmicDivider />

            <div className="flex gap-3">
              <CosmicButton>Search</CosmicButton>
              <GhostButton onClick={() => setSearchQuery('')}>
                Clear
              </GhostButton>
            </div>
          </CosmicCard>
        </section>

        <CosmicDivider />

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Card Variations</h2>

          <div className="grid grid-cols-3 gap-6">
            {/* Card 1 */}
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-nebula-500" />
                <h3 className="text-lg font-semibold text-white">Performance</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Experience lightning-fast performance with our optimized system
              </p>
              <CosmicBadge variant="success">Active</CosmicBadge>
            </GlassCard>

            {/* Card 2 */}
            <CosmicCard>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-nebula-500" />
                <h3 className="text-lg font-semibold text-white">Beautiful</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Gorgeous cosmic-themed design that's easy on the eyes
              </p>
              <CosmicBadge variant="primary">Featured</CosmicBadge>
            </CosmicCard>

            {/* Card 3 */}
            <CosmicCard>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-nebula-500" />
                <h3 className="text-lg font-semibold text-white">Magical</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Smooth animations and delightful interactions throughout
              </p>
              <CosmicBadge variant="warning">Trending</CosmicBadge>
            </CosmicCard>
          </div>
        </section>

        <CosmicDivider />

        {/* Badge Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Badge Variants</h2>

          <CosmicCard>
            <div className="flex flex-wrap gap-4">
              <CosmicBadge variant="primary">Primary</CosmicBadge>
              <CosmicBadge variant="success">Success</CosmicBadge>
              <CosmicBadge variant="warning">Warning</CosmicBadge>
              <CosmicBadge variant="error">Error</CosmicBadge>
            </div>
          </CosmicCard>
        </section>

        <CosmicDivider />

        {/* Text Effects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Text Effects</h2>

          <div className="space-y-8">
            {/* Aurora Text */}
            <CosmicCard>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Aurora Gradient</h3>
              <p className="text-3xl font-bold">
                <AuroraText>Beautifully Glowing Text</AuroraText>
              </p>
            </CosmicCard>

            {/* Shimmer Text */}
            <CosmicCard>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Shimmer Animation</h3>
              <p className="text-3xl font-bold text-white">
                <ShimmerText>Animated Shimmer Effect</ShimmerText>
              </p>
            </CosmicCard>

            {/* Cosmic Heading */}
            <CosmicCard>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Cosmic Heading</h3>
              <CosmicHeading>Powerful Heading</CosmicHeading>
            </CosmicCard>
          </div>
        </section>

        <CosmicDivider />

        {/* Loading State Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Loading States</h2>

          <div className="grid grid-cols-2 gap-6">
            <CosmicCard className="flex items-center justify-center p-12">
              <CosmicSpinner />
            </CosmicCard>

            <CosmicCard>
              <h3 className="text-lg font-semibold text-white mb-4">
                Loading Skeleton
              </h3>
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-void-700 to-void-800 rounded-full animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-void-700 to-void-800 rounded-full animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-void-700 to-void-800 rounded-full animate-pulse w-2/3" />
              </div>
            </CosmicCard>
          </div>
        </section>

        <CosmicDivider />

        {/* Interactive Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Interactive Elements</h2>

          <CosmicCard>
            <h3 className="text-lg font-semibold text-white mb-4">Try the Modal</h3>
            <p className="text-gray-300 mb-6">
              Click the button below to open a beautiful modal dialog
            </p>
            <CosmicButton onClick={() => setIsModalOpen(true)}>
              Open Modal
            </CosmicButton>
          </CosmicCard>

          <CosmicModal
            isOpen={isModalOpen}
            title="Cosmos Modal"
            onClose={() => setIsModalOpen(false)}
            footer={
              <>
                <GhostButton onClick={() => setIsModalOpen(false)}>
                  Cancel
                </GhostButton>
                <CosmicButton onClick={() => setIsModalOpen(false)}>
                  Confirm
                </CosmicButton>
              </>
            }
          >
            <p className="text-gray-300">
              This is a beautiful cosmic modal with backdrop blur and floating animation.
            </p>
            <CosmicDivider />
            <p className="text-sm text-gray-400">
              All modal elements use the cosmos theme automatically.
            </p>
          </CosmicModal>
        </section>

        <CosmicDivider />

        {/* Color Reference Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Color Palette</h2>

          <div className="grid grid-cols-5 gap-4">
            {Object.entries(colors).map(([name, color]) => {
              // Skip gradients for color display
              if (typeof color !== 'string' || color.includes('gradient') || color.includes('gradient')) {
                return null
              }

              return (
                <div key={name} className="text-center">
                  <div
                    className="h-20 rounded-lg mb-3 border border-white/10 glow-md"
                    style={{
                      background: color,
                      boxShadow: `0 0 20px ${color}40`,
                    }}
                  />
                  <p className="text-xs font-mono text-gray-400">{name}</p>
                  <p className="text-xs text-gray-500">{color}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Created with 💜 using <AuroraText>Cosmos Theme</AuroraText>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Version 1.0 • April 2026 • Production Ready ✨
          </p>
        </div>
      </div>
    </CosmicLayout>
  )
}

export default CosmosThemeShowcase
