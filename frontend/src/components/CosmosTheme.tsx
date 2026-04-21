/**
 * Cosmos Theme Components Library
 * Beautiful, dark-themed, cosmic-styled React components
 * Features: Gorgeous gradients, cute animations, ethereal styling
 */

import React, { ReactNode } from 'react'

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/**
 * Primary CTA Button with gradient and glow effect
 * Usage: <CosmicButton>Click Me</CosmicButton>
 */
export function CosmicButton({ children, onClick, disabled = false, className = '', type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-cosmic-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

/**
 * Secondary Button with border and subtle glow
 * Usage: <SecondaryButton>Secondary Action</SecondaryButton>
 */
export function SecondaryButton({ children, onClick, disabled = false, className = '', type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-cosmic-secondary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

/**
 * Ghost Button - transparent with border only
 * Usage: <GhostButton>Ghost Action</GhostButton>
 */
export function GhostButton({ children, onClick, disabled = false, className = '', type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-cosmic-ghost
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
  className?: string
}

/**
 * Cosmic Styled Input Field
 * Usage: <CosmicInput placeholder="Enter text..." />
 */
export function CosmicInput({ placeholder, value, onChange, type = 'text', disabled = false, className = '' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        input-cosmic
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    />
  )
}

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

/**
 * Cosmic Card with glass morphism and glow
 * Usage: <CosmicCard>Card content</CosmicCard>
 */
export function CosmicCard({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        card-cosmic
        ${hover && 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * Glass Morphism Card
 * Usage: <GlassCard>Frosted glass content</GlassCard>
 */
export function GlassCard({ children, className = '' }: CardProps) {
  return (
    <div className={`glass-cosmos rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

// ============================================================================
// BADGE COMPONENTS
// ============================================================================

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}

/**
 * Cosmic Badge
 * Usage: <CosmicBadge variant="primary">Premium</CosmicBadge>
 */
export function CosmicBadge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-nebula-600 to-cosmos-600 border-nebula-500',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-500',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-500',
    error: 'bg-gradient-to-r from-red-600 to-pink-600 border-red-500',
  }

  return (
    <span className={`
      badge-cosmic
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}

// ============================================================================
// TEXT COMPONENTS
// ============================================================================

interface TextProps {
  children: ReactNode
  className?: string
}

/**
 * Aurora Gradient Text
 * Usage: <AuroraText>Beautiful Glowing Text</AuroraText>
 */
export function AuroraText({ children, className = '' }: TextProps) {
  return (
    <span className={`text-gradient-aurora ${className}`}>
      {children}
    </span>
  )
}

/**
 * Cosmic Heading
 * Usage: <CosmicHeading>Main Title</CosmicHeading>
 */
export function CosmicHeading({ children, className = '' }: TextProps) {
  return (
    <h1 className={`heading-cosmic ${className}`}>
      {children}
    </h1>
  )
}

/**
 * Glowing Text with animation
 * Usage: <ShimmerText>Animated Text</ShimmerText>
 */
export function ShimmerText({ children, className = '' }: TextProps) {
  return (
    <span className={`shimmer-text ${className}`}>
      {children}
    </span>
  )
}

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

/**
 * Cosmic Divider
 * Usage: <CosmicDivider />
 */
export function CosmicDivider() {
  return <div className="divider-cosmic my-6" />
}

/**
 * Floating Element with animation
 * Usage: <FloatingElement><Icon /></FloatingElement>
 */
export function FloatingElement({ children, className = '' }: CardProps) {
  return (
    <div className={`float-element ${className}`}>
      {children}
    </div>
  )
}

/**
 * Glow Pulsing Container
 * Usage: <GlowPulse><YourContent /></GlowPulse>
 */
export function GlowPulse({ children, className = '' }: CardProps) {
  return (
    <div className={`glow-pulsing ${className}`}>
      {children}
    </div>
  )
}

// ============================================================================
// GRID & LAYOUT COMPONENTS
// ============================================================================

interface GridProps {
  children: ReactNode
  columns?: number
  gap?: number
  className?: string
}

/**
 * Responsive Cosmic Grid
 * Usage: <CosmicGrid columns={3}>Grid items</CosmicGrid>
 */
export function CosmicGrid({ children, columns = 3, gap = 6, className = '' }: GridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Full Screen Layout with cosmic background
 * Usage: <CosmicLayout>Page content</CosmicLayout>
 */
export function CosmicLayout({ children, className = '' }: CardProps) {
  return (
    <div className={`
      min-h-screen
      bg-gradient-cosmos
      grid-cosmic
      ${className}
    `}>
      {children}
    </div>
  )
}

// ============================================================================
// LOADING & FEEDBACK COMPONENTS
// ============================================================================

/**
 * Cosmic Loading Spinner
 * Usage: <CosmicSpinner />
 */
export function CosmicSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-nebula-500 border-r-cosmos-500 animate-cosmic-spin" />
        
        {/* Middle spinning ring */}
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-b-aurora-cyan border-l-aurora-magenta animate-cosmic-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Inner glowing circle */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-nebula-600 to-cosmos-600 glow-aurora" />
      </div>
    </div>
  )
}

/**
 * Minimal Loading Skeleton
 * Usage: <SkeletonLoader />
 */
export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-12 bg-gradient-to-r from-void-700 to-void-800 rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

// ============================================================================
// ALERT & NOTIFICATION COMPONENTS
// ============================================================================

interface AlertProps {
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
}

/**
 * Cosmic Alert/Notification
 * Usage: <CosmicAlert type="success" message="Operation successful!" />
 */
export function CosmicAlert({ title, message, type = 'info', onClose }: AlertProps) {
  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-r from-green-900/20 to-emerald-900/20',
      border: 'border-green-500/50',
      icon: '✓',
      color: 'text-green-300',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-900/20 to-pink-900/20',
      border: 'border-red-500/50',
      icon: '✕',
      color: 'text-red-300',
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20',
      border: 'border-yellow-500/50',
      icon: '⚠',
      color: 'text-yellow-300',
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-900/20 to-cyan-900/20',
      border: 'border-blue-500/50',
      icon: 'ℹ',
      color: 'text-blue-300',
    },
  }

  const style = typeStyles[type]

  return (
    <div className={`
      ${style.bg}
      border ${style.border}
      rounded-lg p-4
      backdrop-blur-md
      flex items-start gap-3
      animate-fade-in
    `}>
      <span className={`${style.color} font-bold text-lg`}>{style.icon}</span>
      <div className="flex-1">
        {title && <h3 className={`${style.color} font-semibold mb-1`}>{title}</h3>}
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${style.color} hover:opacity-70 transition`}
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ============================================================================
// MODAL/DIALOG COMPONENTS
// ============================================================================

interface ModalProps {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}

/**
 * Cosmic Modal/Dialog
 * Usage: <CosmicModal isOpen={true} title="Confirm" onClose={() => {}}>Modal content</CosmicModal>
 */
export function CosmicModal({ isOpen, title, children, onClose, footer }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative card-cosmic max-w-md w-full mx-4 animate-float">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-cosmic text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          {children}
        </div>

        {footer && (
          <>
            <CosmicDivider />
            <div className="flex gap-3 justify-end">
              {footer}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// GRADIENT BACKGROUNDS
// ============================================================================

/**
 * Animated Aurora Background
 * Usage: <AuroraBackground>Content</AuroraBackground>
 */
export function AuroraBackground({ children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-gradient-aurora
      bg-[size:400%_400%]
      animate-aurora-wave
      ${className}
    `}>
      {children}
    </div>
  )
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook for cosmos theme colors
 * Usage: const colors = useCosmosColors()
 */
export function useCosmosColors() {
  return {
    // Main colors
    nebula: '#d612ff',
    cosmos: '#8595ff',
    starlight: '#7888ff',
    void: '#0f1219',
    
    // Aurora colors
    cyan: '#00f0ff',
    magenta: '#ff00ff',
    pink: '#ff1493',
    purple: '#d946ef',
    blue: '#3b82f6',
    
    // Gradients
    gradientNebula: 'linear-gradient(135deg, #d612ff, #ff1493)',
    gradientCosmos: 'linear-gradient(135deg, #1a1f2e, #3f4fd1)',
    gradientAurora: 'conic-gradient(from 0deg, #00f0ff, #d946ef, #ff1493, #3b82f6)',
    
    // Glows
    glowNebula: '0 0 20px rgba(214, 18, 255, 0.4)',
    glowAurora: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(214, 18, 255, 0.3)',
  }
}

/**
 * Hook for cosmos animations
 * Usage: const { float, glow } = useCosmosAnimations()
 */
export function useCosmosAnimations() {
  return {
    float: 'float 6s ease-in-out infinite',
    glowPulse: 'glow-pulse 3s ease-in-out infinite',
    shimmer: 'shimmer 2s ease-in-out infinite',
    cosmicSpin: 'cosmic-spin 20s linear infinite',
    auroraWave: 'aurora-wave 4s ease-in-out infinite',
  }
}

export default {
  // Buttons
  CosmicButton,
  SecondaryButton,
  GhostButton,

  // Inputs
  CosmicInput,

  // Cards
  CosmicCard,
  GlassCard,

  // Badges
  CosmicBadge,

  // Text
  AuroraText,
  CosmicHeading,
  ShimmerText,

  // Decorative
  CosmicDivider,
  FloatingElement,
  GlowPulse,

  // Grid & Layout
  CosmicGrid,
  CosmicLayout,

  // Loading
  CosmicSpinner,
  SkeletonLoader,

  // Alerts
  CosmicAlert,

  // Modal
  CosmicModal,

  // Backgrounds
  AuroraBackground,

  // Hooks
  useCosmosColors,
  useCosmosAnimations,
}
