# 🌌 Cosmos Theme Integration Guide

## Quick Start

### Step 1: Import Components in Your Component

```typescript
import {
  CosmicButton,
  CosmicCard,
  CosmicInput,
  CosmicHeading,
  AuroraText,
  SecondaryButton,
  CosmicBadge,
} from '@/components/CosmosTheme'
```

### Step 2: Use the Components

```typescript
export function MyComponent() {
  return (
    <div className="min-h-screen bg-gradient-cosmos p-8">
      {/* Heading with Aurora Text */}
      <CosmicHeading>
        Welcome to <AuroraText>My App</AuroraText>
      </CosmicHeading>

      {/* Card with content */}
      <CosmicCard>
        <h2 className="text-lg font-bold text-white">Features</h2>
        <p className="text-gray-300 mt-2">
          Beautiful, cosmic-themed design system
        </p>
        <CosmicBadge variant="success">Active</CosmicBadge>
      </CosmicCard>

      {/* Input with button */}
      <CosmicInput placeholder="Enter something..." />
      <CosmicButton className="mt-4">Submit</CosmicButton>
    </div>
  )
}
```

---

## Integration with Existing Components

### Replace Old Button with CosmicButton

**Before:**
```typescript
<button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">
  Click
</button>
```

**After:**
```typescript
<CosmicButton>Click</CosmicButton>
```

### Replace Old Cards

**Before:**
```typescript
<div className="bg-gray-800 p-4 rounded border border-gray-700">
  Card content
</div>
```

**After:**
```typescript
<CosmicCard>
  Card content
</CosmicCard>
```

### Replace Old Inputs

**Before:**
```typescript
<input 
  className="px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded"
  placeholder="Search..."
/>
```

**After:**
```typescript
<CosmicInput placeholder="Search..." />
```

---

## Update App.tsx

Add cosmic theme to your main app:

```typescript
import { CosmicLayout } from './components/CosmosTheme'

function App() {
  return (
    <CosmicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Your app content */}
      </div>
    </CosmicLayout>
  )
}
```

---

## Update Tailwind Configuration

Already done! ✅ Your `tailwind.config.js` now includes:

- ✅ Cosmos color palette
- ✅ Aurora gradients
- ✅ Custom animations
- ✅ Glow effects
- ✅ Box shadows

---

## Update Global Styles

Already done! ✅ Your `index.css` now includes:

- ✅ Cosmic background
- ✅ Scrollbar styling
- ✅ Component classes (@layer)
- ✅ Animation keyframes
- ✅ Glass morphism effects

---

## Customization

### Change Primary Color

In `tailwind.config.js`, modify the gradient:

```javascript
'gradient-nebula': 'linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2)',
```

### Change Animation Speed

```typescript
// In CosmosTheme.tsx, modify keyframes:
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }, // Increase distance
  },
}
```

### Add Custom Component

```typescript
// In CosmosTheme.tsx, add:
export function CustomComponent() {
  return (
    <div className="card-cosmic glow-medium">
      Custom cosmic component
    </div>
  )
}
```

---

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CosmosTheme.tsx           ← Main component library
│   │   ├── CosmosThemeShowcase.tsx   ← Example/demo page
│   │   ├── LoginScreen.tsx
│   │   ├── PolicyView.tsx
│   │   └── ... (other components)
│   │
│   ├── index.css                      ← Global cosmos styles
│   └── App.tsx
│
├── tailwind.config.js                 ← Cosmos theme colors & animations
└── COSMOS_THEME_GUIDE.md             ← This guide
```

---

## Browser Compatibility

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

All modern features are supported!

---

## Performance Tips

1. **Use CosmicSpinner instead of GIF**
   - Smaller file size
   - Better performance
   - Animated with CSS

2. **Lazy load heavy components**
   ```typescript
   const CosmicThemeShowcase = lazy(() => import('./CosmosThemeShowcase'))
   ```

3. **Optimize animations on mobile**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { animation: none !important; }
   }
   ```

---

## Accessibility

All components include:
- ✅ Proper color contrast
- ✅ Focus states for keyboard navigation
- ✅ ARIA labels where needed
- ✅ Semantic HTML

### Improve Accessibility

```typescript
<CosmicButton aria-label="Close menu">×</CosmicButton>
<CosmicInput aria-label="Search companies" />
<CosmicCard role="article">Content</CosmicCard>
```

---

## Dark Mode Support

The entire theme is dark mode. Light mode coming soon! (Optional)

---

## Troubleshooting

### Styles not applying?

1. Make sure Tailwind is processing your files:
   ```javascript
   // tailwind.config.js
   content: ["./src/**/*.{js,ts,jsx,tsx}"]
   ```

2. Import CosmosTheme components correctly:
   ```typescript
   import { CosmicButton } from '@/components/CosmosTheme'
   ```

3. Use `@layer` in CSS for utilities:
   ```css
   @layer components {
     .btn-cosmic-primary { ... }
   }
   ```

### Animations too slow?

Reduce duration in `tailwind.config.js`:
```javascript
keyframes: {
  float: {
    // Change from 6s to 3s
    animation: 'float 3s ease-in-out infinite'
  }
}
```

### Colors not vibrant enough?

Increase glow intensity in `index.css`:
```css
.glow-strong {
  box-shadow: 0 0 50px rgba(214, 18, 255, 0.8); /* More intense */
}
```

---

## Example: Converting PolicyView.tsx

**Original:**
```typescript
<div className="bg-gray-800 rounded p-4 border border-gray-700">
  <h2 className="text-white text-lg">Policy</h2>
  <button className="bg-purple-600 px-4 py-2 rounded">Analyze</button>
</div>
```

**Cosmified:**
```typescript
import { CosmicCard, CosmicHeading, CosmicButton } from '@/components/CosmosTheme'

<CosmicCard>
  <CosmicHeading className="text-lg">Policy</CosmicHeading>
  <CosmicButton className="mt-4">Analyze</CosmicButton>
</CosmicCard>
```

---

## Next Steps

1. ✅ Review `COSMOS_THEME_GUIDE.md` for all components
2. ✅ Check `CosmosThemeShowcase.tsx` for examples
3. ✅ Update existing components to use cosmos components
4. ✅ Customize colors if needed
5. ✅ Test on different browsers

---

## Support

For issues or questions:
1. Check `COSMOS_THEME_GUIDE.md` first
2. Review `CosmosThemeShowcase.tsx` for usage examples
3. Check component JSDoc in `CosmosTheme.tsx`

---

**Theme Status:** ✨ Production Ready  
**Version:** 1.0  
**Last Updated:** April 21, 2026
