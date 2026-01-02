# 🌙 Dark Mode Implementation Guide

This project uses a **combined approach** with both **Ant Design** and **Tailwind CSS** dark modes working seamlessly together.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Toggle Button                        │
│                      (Sun/Moon Icon in Header)                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ThemeProvider.tsx                           │
│  - Manages isDarkMode state                                      │
│  - Saves to localStorage                                         │
│  - Updates document.documentElement.classList                    │
└────────────┬──────────────────────────────┬─────────────────────┘
             │                              │
             ▼                              ▼
┌────────────────────────────┐  ┌──────────────────────────────┐
│   Ant Design Dark Mode     │  │   Tailwind CSS Dark Mode     │
│                            │  │                              │
│  ConfigProvider            │  │  .dark class on <html>       │
│  theme={{                  │  │                              │
│    algorithm:              │  │  All dark: utilities         │
│    isDarkMode ?            │  │  - dark:bg-gray-900          │
│      darkAlgorithm :       │  │  - dark:text-gray-100        │
│      defaultAlgorithm      │  │  - dark:border-gray-700      │
│  }}                        │  │  etc.                        │
└────────────────────────────┘  └──────────────────────────────┘
             │                              │
             └──────────────┬───────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │  Synchronized Theme   │
                │  Across All Components│
                └───────────────────────┘
```

## 📁 Key Files

### 1. ThemeProvider (`components/providers/ThemeProvider.tsx`)

**Purpose**: Central dark mode management for both systems

```typescript
import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // 1. Save to localStorage
    setToLocalStorage("darkMode", newDarkMode);
    
    // 2. Toggle Tailwind dark class
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {/* 3. Configure Ant Design theme */}
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#3b82f6",
            borderRadius: 8,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
```

**Key Features:**
- ✅ Single source of truth for dark mode state
- ✅ Synchronizes both Ant Design and Tailwind CSS
- ✅ Persists user preference in localStorage
- ✅ Prevents flash of wrong theme on page load

### 2. Global Styles (`app/globals.css`)

**Purpose**: Configure Tailwind v4 dark mode

```css
@import "tailwindcss" important;

@theme {
  /* Enable class-based dark mode */
  --color-scheme: light dark;
}

:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

/* Respects system preference as fallback */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Key Features:**
- ✅ Tailwind v4 class-based dark mode
- ✅ CSS custom properties for theme colors
- ✅ System preference fallback

### 3. Root Layout (`app/layout.tsx`)

**Purpose**: Wrap entire app with ThemeProvider

```typescript
import ThemeProvider from "@/components/providers/ThemeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <AntdRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
```

**Key Features:**
- ✅ `suppressHydrationWarning` prevents hydration mismatch
- ✅ Body has dark mode classes for seamless transition
- ✅ AntdRegistry for Ant Design styling in Next.js

## 🎨 Using Dark Mode in Components

### Ant Design Components (Automatic)

Ant Design components automatically use the theme from ConfigProvider:

```typescript
import { Button, Card, Table } from "antd";

// These automatically adapt to dark mode!
<Card>
  <Button type="primary">Click Me</Button>
  <Table dataSource={data} columns={columns} />
</Card>
```

**No additional styling needed!** ✨

### Custom Components with Tailwind CSS

Use Tailwind's `dark:` modifier for custom components:

```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-2xl font-bold">Hello</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

### Mixed Ant Design + Tailwind Components

Combine both approaches:

```typescript
import { Card } from "antd";

<Card className="shadow-sm">
  <div className="space-y-4">
    {/* Ant Design handles Card background */}
    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
      {/* Tailwind handles text color */}
      Custom Content
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      {/* Tailwind handles description color */}
      More content here
    </p>
  </div>
</Card>
```

## 🔧 Accessing Dark Mode State

### In React Components

```typescript
import { useTheme } from "@/components/providers/ThemeProvider";

function MyComponent() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

### In Ant Design Components

For components that need explicit theme awareness:

```typescript
import { useTheme } from "@/components/providers/ThemeProvider";
import { Menu, Sider } from "antd";

function Sidebar() {
  const { isDarkMode } = useTheme();
  
  return (
    <Sider theme={isDarkMode ? "dark" : "light"}>
      <Menu theme={isDarkMode ? "dark" : "light"} items={menuItems} />
    </Sider>
  );
}
```

## 🎯 Color Mapping Reference

### Text Colors
| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `text-gray-900` | `dark:text-gray-100` | Headings, primary text |
| `text-gray-700` | `dark:text-gray-300` | Secondary headings |
| `text-gray-600` | `dark:text-gray-400` | Body text |
| `text-gray-500` | `dark:text-gray-400` | Muted text |
| `text-gray-400` | `dark:text-gray-500` | Placeholder text |

### Backgrounds
| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `bg-white` | `dark:bg-gray-900` | Main container |
| `bg-gray-100` | `dark:bg-gray-800` | Content area |
| `bg-gray-50` | `dark:bg-gray-800` | Nested cards |

### Borders
| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `border-gray-300` | `dark:border-gray-600` | Input borders |
| `border-gray-200` | `dark:border-gray-700` | Dividers |
| `border-gray-100` | `dark:border-gray-800` | Subtle borders |

### Accent Colors
| Color | Light | Dark | Usage |
|-------|-------|------|-------|
| **Blue** | `bg-blue-100 text-blue-600` | `dark:bg-blue-900/20 dark:text-blue-400` | Info, primary |
| **Green** | `bg-green-100 text-green-600` | `dark:bg-green-900/20 dark:text-green-400` | Success |
| **Red** | `bg-red-100 text-red-600` | `dark:bg-red-900/20 dark:text-red-400` | Error, danger |
| **Yellow** | `bg-yellow-100 text-yellow-600` | `dark:bg-yellow-900/30 dark:text-yellow-400` | Warning |
| **Purple** | `bg-purple-100 text-purple-600` | `dark:bg-purple-900/20 dark:text-purple-400` | Accent |

## ✨ Best Practices

### 1. Always Use Both Systems Together

```typescript
// ✅ Good: Ant Design + Tailwind
<Card className="shadow-sm">
  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
    Title
  </h2>
</Card>

// ❌ Bad: Fighting with Ant Design styles
<Card style={{ background: isDarkMode ? "#000" : "#fff" }}>
  {/* Ant Design already handles this! */}
</Card>
```

### 2. Use `transition-colors` for Smooth Transitions

```typescript
<div className="bg-white dark:bg-gray-900 transition-colors">
  {/* Smooth fade between themes */}
</div>
```

### 3. Leverage Ant Design's Token System

```typescript
<ConfigProvider
  theme={{
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // Customize design tokens
      colorPrimary: "#3b82f6",
      borderRadius: 8,
    },
    components: {
      // Override specific component tokens
      Button: {
        controlHeight: 40,
      },
    },
  }}
>
```

### 4. Test Both Modes

Always test your UI in both light and dark modes:
- Check text contrast
- Verify hover states
- Ensure icons are visible
- Test form inputs
- Check card shadows

## 🚀 Performance Tips

1. **Use Ant Design's Built-in Components** - They're already optimized for dark mode
2. **Minimize Custom Styling** - Let Ant Design and Tailwind handle most styling
3. **Avoid Inline Styles** - Use className with dark: modifiers instead
4. **Use CSS Variables** - For values that change between themes
5. **Lazy Load Theme Assets** - Only load what's needed

## 🔍 Debugging Dark Mode Issues

### Problem: Component not updating on theme change

**Solution**: Make sure the component is wrapped in ThemeProvider

```typescript
// app/layout.tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

### Problem: Flash of wrong theme on page load

**Solution**: Use `suppressHydrationWarning` and prevent initial render

```typescript
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
```

### Problem: Ant Design component not dark

**Solution**: Some components need explicit theme prop

```typescript
const { isDarkMode } = useTheme();
<Menu theme={isDarkMode ? "dark" : "light"} />
```

## 📚 References

- [Ant Design Theme Documentation](https://ant.design/docs/react/customize-theme)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**🎉 Result**: A seamless, performant, and maintainable dark mode implementation that combines the best of both Ant Design and Tailwind CSS!

