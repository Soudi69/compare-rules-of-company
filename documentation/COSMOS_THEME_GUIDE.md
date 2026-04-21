# 🌌 COSMOS THEME STYLE GUIDE

## Overview
Beautiful, dark-themed, cosmic-styled UI system with gorgeous gradients, cute animations, and ethereal styling. Perfect for AI/data-driven applications.

---

## 🎨 Color Palette

### Core Colors

```
NEBULA (Primary Magic Color)
├─ Hex: #d612ff
├─ RGB: (214, 18, 255)
└─ Usage: Primary CTAs, glows, accents

COSMOS (Secondary)
├─ Hex: #8595ff
├─ RGB: (133, 149, 255)
└─ Usage: Backgrounds, secondary elements

STARLIGHT
├─ Hex: #7888ff
├─ RGB: (120, 136, 255)
└─ Usage: Tertiary, hover states

VOID (Background)
├─ Hex: #0f1219
├─ RGB: (15, 18, 25)
└─ Usage: Dark background, deepest black
```

### Aurora Accent Colors

```
CYAN:    #00f0ff  ← Bright cyber cyan
MAGENTA: #ff00ff  ← Pure magenta glow
PINK:    #ff1493  ← Hot pink accent
PURPLE:  #d946ef  ← Deep purple
BLUE:    #3b82f6  ← Azure blue
```

### Recommended Color Combinations

```
✨ Primary Gradient:    Nebula → Aurora Cyan
💜 Secondary Gradient:  Cosmos → Pink
⚡ Aurora Gradient:     Cyan → Magenta → Pink → Blue
🌙 Dark Gradient:       Void → Cosmos
```

---

## 🔘 Button Components

### 1. Primary Button (CTA)
```typescript
<CosmicButton>Click Me</CosmicButton>
```

**Features:**
- Gradient background (Nebula → Cosmos)
- Hover lift animation (+2px up)
- Glow effect on hover
- Smooth gradient transition

**Styling:**
```css
background: linear-gradient(135deg, #d612ff, #8595ff);
box-shadow: 0 0 20px rgba(214, 18, 255, 0.4);
transform: translateY(-2px);
```

---

### 2. Secondary Button
```typescript
<SecondaryButton>Secondary Action</SecondaryButton>
```

**Features:**
- Transparent background with border
- Nebula border glow
- Hover background fill

---

### 3. Ghost Button
```typescript
<GhostButton>Ghost Action</GhostButton>
```

**Features:**
- Minimal design
- Cyan text
- Nebula border on hover

---

## 🎴 Card Components

### Cosmic Card
```typescript
<CosmicCard>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</CosmicCard>
```

**Features:**
- Glass morphism effect
- Backdrop blur
- Subtle nebula glow
- Hover elevation

**Styling:**
```css
background: rgba(26, 31, 46, 0.8);
border: 1px solid rgba(214, 18, 255, 0.2);
box-shadow: 0 0 20px rgba(214, 18, 255, 0.15);
```

---

### Glass Card
```typescript
<GlassCard>
  Frosted glass effect content
</GlassCard>
```

---

## 📝 Input Components

### Cosmic Input
```typescript
<CosmicInput 
  placeholder="Enter something..."
  value={value}
  onChange={handleChange}
/>
```

**Features:**
- Subtle nebula border
- Focus glow effect
- Smooth transitions
- Placeholder styling

**Focus State:**
```css
border-color: #d612ff;
box-shadow: 
  inset 0 0 10px rgba(214, 18, 255, 0.1),
  0 0 20px rgba(214, 18, 255, 0.3);
```

---

## 🏷️ Badge Components

### Cosmic Badge
```typescript
<CosmicBadge variant="primary">Premium</CosmicBadge>
<CosmicBadge variant="success">Active</CosmicBadge>
<CosmicBadge variant="warning">Pending</CosmicBadge>
<CosmicBadge variant="error">Error</CosmicBadge>
```

**Features:**
- Gradient backgrounds
- Color-coded variants
- Glow effect
- Compact design

---

## 📄 Text Components

### Aurora Gradient Text
```typescript
<AuroraText>Beautiful Glowing Text</AuroraText>
```

**Creates:**
- Animated gradient effect
- Multi-color text
- Smooth color transitions

---

### Cosmic Heading
```typescript
<CosmicHeading>Main Title</CosmicHeading>
```

**Features:**
- Bold, high contrast
- Gradient text
- Professional look

---

### Shimmer Text
```typescript
<ShimmerText>Animated Text</ShimmerText>
```

**Features:**
- Opacity animation
- Gentle pulsing effect

---

## ✨ Decorative Elements

### Cosmic Divider
```typescript
<CosmicDivider />
```

**Creates:** Gradient line separator

---

### Floating Element
```typescript
<FloatingElement>
  <Icon />
</FloatingElement>
```

**Features:**
- Vertical floating animation
- Continuous up-down movement

---

### Glow Pulse
```typescript
<GlowPulse>
  <YourContent />
</GlowPulse>
```

**Features:**
- Box shadow pulsing
- Attention-grabbing glow

---

## 🎬 Animations

### Available Animations

| Name | Duration | Effect |
|------|----------|--------|
| `float` | 6s | Up-down floating |
| `glow-pulse` | 3s | Box shadow pulsing |
| `shimmer` | 2s | Opacity fade |
| `cosmic-spin` | 20s | Smooth rotation |
| `aurora-wave` | 4s | Gradient wave |

### Usage
```css
animation: float 6s ease-in-out infinite;
animation: glow-pulse 3s ease-in-out infinite;
```

---

## 🌐 Full Page Layout

### Cosmic Layout
```typescript
<CosmicLayout>
  <Header />
  <MainContent />
  <Footer />
</CosmicLayout>
```

**Features:**
- Full viewport coverage
- Cosmos gradient background
- Grid pattern overlay
- Smooth scrolling

---

## 🔄 Loading States

### Cosmic Spinner
```typescript
<CosmicSpinner />
```

**Features:**
- Triple rotating rings
- Gradient colors
- Aurora glow

---

### Skeleton Loader
```typescript
<SkeletonLoader />
```

**Features:**
- Animated placeholder
- Multiple lines
- Pulse effect

---

## 📢 Alerts & Notifications

### Cosmic Alert
```typescript
<CosmicAlert 
  type="success"
  title="Success!"
  message="Operation completed successfully"
  onClose={() => {}}
/>
```

**Variants:**
- `success` - Green gradient
- `error` - Red gradient
- `warning` - Yellow gradient
- `info` - Blue gradient

---

## 🗂️ Modal/Dialog

### Cosmic Modal
```typescript
<CosmicModal
  isOpen={isOpen}
  title="Confirm Action"
  onClose={handleClose}
  footer={<CosmicButton>Confirm</CosmicButton>}
>
  Are you sure?
</CosmicModal>
```

**Features:**
- Backdrop blur
- Floating animation
- Responsive sizing

---

## 🎯 Gradient Backgrounds

### Aurora Background
```typescript
<AuroraBackground>
  Content with animated gradient
</AuroraBackground>
```

**Features:**
- Animated gradient colors
- Aurora wave effect

---

## 🛠️ Custom Hooks

### useCosmosColors
```typescript
const colors = useCosmosColors()

// Returns:
{
  nebula: '#d612ff',
  cosmos: '#8595ff',
  cyan: '#00f0ff',
  gradientNebula: 'linear-gradient(...)',
  glowNebula: '0 0 20px rgba(214, 18, 255, 0.4)',
  // ... more colors
}
```

---

### useCosmosAnimations
```typescript
const animations = useCosmosAnimations()

// Returns:
{
  float: 'float 6s ease-in-out infinite',
  glowPulse: 'glow-pulse 3s ease-in-out infinite',
  // ... more animations
}
```

---

## 📐 Spacing & Typography

### Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Font Sizes
```
sm: 0.875rem (14px)
base: 1rem (16px)
lg: 1.125rem (18px)
xl: 1.25rem (20px)
2xl: 1.5rem (24px)
3xl: 1.875rem (30px)
4xl: 2.25rem (36px)
```

### Font Weights
```
Regular: 400
Semibold: 600
Bold: 700
```

---

## 🌙 Dark Theme Features

### Background Gradients
```css
/* Base cosmic background */
background: linear-gradient(135deg, #0f1219 0%, #1a1f2e 25%, #2f354a 50%, #1a1f2e 75%, #0f1219 100%);
background-attachment: fixed;

/* Creates: Deep cosmic void feeling */
```

### Transparency Layers
```css
/* Cards have 80% opacity background */
background: rgba(26, 31, 46, 0.8);

/* Inputs have 60% opacity */
background: rgba(15, 18, 25, 0.6);

/* Creates: Layered depth effect */
```

### Glow Effects
```css
/* Subtle glow */
box-shadow: 0 0 20px rgba(214, 18, 255, 0.2);

/* Medium glow */
box-shadow: 0 0 30px rgba(214, 18, 255, 0.4);

/* Strong glow */
box-shadow: 0 0 40px rgba(214, 18, 255, 0.6);

/* Aurora glow */
box-shadow: 
  0 0 20px rgba(0, 240, 255, 0.4), 
  0 0 40px rgba(214, 18, 255, 0.3);
```

---

## 💡 Design Best Practices

### ✅ DO
- Use nebula (#d612ff) for primary CTAs
- Combine aurora colors for visual interest
- Add glow effects to important elements
- Use glass morphism for cards
- Animate on hover/focus
- Keep text contrasted on dark backgrounds

### ❌ DON'T
- Use pure white text (use rgba white instead)
- Stack too many glowing elements
- Use bright colors on bright backgrounds
- Forget hover states
- Ignore accessibility contrast ratios
- Use animations for static content

---

## 🎨 Example Component Usage

```typescript
import {
  CosmicButton,
  CosmicCard,
  CosmicInput,
  CosmicHeading,
  AuroraText,
  CosmicSpinner,
  CosmicAlert,
  CosmicBadge,
} from './CosmosTheme'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-cosmos p-8">
      {/* Header */}
      <CosmicHeading className="mb-8">
        Welcome to <AuroraText>Cosmos Dashboard</AuroraText>
      </CosmicHeading>

      {/* Alert */}
      <CosmicAlert
        type="success"
        message="Your theme is loaded!"
        className="mb-6"
      />

      {/* Grid of Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <CosmicCard>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Performance</h3>
            <CosmicBadge variant="success">Active</CosmicBadge>
          </div>
          <p className="text-gray-300 text-sm mt-2">99.9% uptime</p>
        </CosmicCard>

        <CosmicCard>
          <h3 className="text-lg font-semibold text-white">Users</h3>
          <p className="text-2xl font-bold text-nebula-500 mt-2">2.5K</p>
        </CosmicCard>

        <CosmicCard>
          <h3 className="text-lg font-semibold text-white">Status</h3>
          <p className="text-sm text-cosmos-300 mt-2">
            <AuroraText>All Systems</AuroraText> Running
          </p>
        </CosmicCard>
      </div>

      {/* Input Section */}
      <CosmicCard>
        <h2 className="text-xl font-bold text-white mb-4">Search</h2>
        <CosmicInput placeholder="Search cosmos..." />
        <div className="flex gap-3 mt-4">
          <CosmicButton>Search</CosmicButton>
          <SecondaryButton>Clear</SecondaryButton>
        </div>
      </CosmicCard>
    </div>
  )
}
```

---

## 📦 Installation

All components are in `frontend/src/components/CosmosTheme.tsx`

### Import
```typescript
import {
  CosmicButton,
  CosmicCard,
  CosmicInput,
  // ... other components
} from '@/components/CosmosTheme'
```

### Use in your components
```typescript
<CosmicButton>Click Me</CosmicButton>
```

---

## 🎯 Design System Summary

| Category | Options | Usage |
|----------|---------|-------|
| **Colors** | 6 core + 5 aurora | Gradients, glows |
| **Components** | 25+ | Buttons, cards, inputs |
| **Animations** | 5 types | Hover, load, focus |
| **Effects** | Glass, glow, float | Visual polish |
| **Layout** | Grid, flex | Responsive design |

---

**Created:** April 2026  
**Version:** 1.0  
**Theme:** Cosmos (Dark, Magical, Gorgeous)  
**Status:** ✨ Production Ready
