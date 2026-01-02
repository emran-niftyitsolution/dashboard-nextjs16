# 🌙 Tailwind CSS Dark Mode Implementation

This implementation follows the **official [Tailwind CSS v4 Dark Mode documentation](https://tailwindcss.com/docs/dark-mode)** exactly.

## ✅ Implementation Overview

We've implemented **manual dark mode toggling with system theme support** - the recommended approach from Tailwind.

### 🎯 What This Means:

1. ✅ **Manual Toggle** - Users can explicitly choose light or dark mode
2. ✅ **System Preference** - Respects OS theme when no preference is set
3. ✅ **No FOUC** - Flash of Unstyled Content prevented with inline script
4. ✅ **Persistent** - Theme choice saved to localStorage

---

## 📝 Step-by-Step Implementation

### 1. Configure Tailwind Dark Mode (`app/globals.css`)

Following [this section](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually):

```css
@import "tailwindcss" important;

/* Override dark variant to use .dark class instead of prefers-color-scheme */
@custom-variant dark (&:where(.dark, .dark *));
```

**What this does:**
- Overrides the default `prefers-color-scheme` behavior
- Makes `dark:*` utilities activate when `.dark` class is present on ancestor
- The `&:where(.dark, .dark *)` selector ensures proper specificity

### 2. Prevent FOUC (`app/layout.tsx`)

Following [this pattern](https://tailwindcss.com/docs/dark-mode#with-system-theme-support):

```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    {/* Inline script to prevent FOUC - runs before page render */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const theme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
            if (shouldBeDark) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
    />
  </head>
  <body className="bg-white dark:bg-gray-900">
    {children}
  </body>
</html>
```

**Why this works:**
- Runs **immediately** before page renders (no React, no hydration)
- Checks localStorage for user preference
- Falls back to system preference if no choice made
- Applies `.dark` class before any content is visible

### 3. Theme Provider (`components/providers/ThemeProvider.tsx`)

Following the [localStorage pattern](https://tailwindcss.com/docs/dark-mode#with-system-theme-support):

```typescript
export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Toggle function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

**Key points:**
- Uses `localStorage.setItem("theme", "dark" | "light")` as per Tailwind docs
- Uses `classList.toggle()` for cleaner code
- Respects system preference when no localStorage value exists
- Integrates Ant Design's theme algorithm

---

## 🎨 Using Dark Mode in Components

### Basic Usage

```tsx
// Tailwind utilities automatically work with dark: prefix
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">Title</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

### With State (When Needed)

```tsx
import { useTheme } from "@/components/providers/ThemeProvider";

function MyComponent() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}
```

### Ant Design Components

```tsx
// Automatically themed via ConfigProvider
import { Button, Card, Input } from "antd";

<Card>
  <Input placeholder="Search" />
  <Button type="primary">Submit</Button>
</Card>
```

---

## 🔄 How It All Works Together

```
1. Page Load
   ↓
2. Inline Script Runs (BEFORE React hydration)
   - Checks localStorage.getItem('theme')
   - Checks window.matchMedia('(prefers-color-scheme: dark)')
   - Adds .dark class if needed
   ↓
3. React Hydrates
   ↓
4. ThemeProvider Initializes
   - Syncs state with existing .dark class
   - Wraps app in ConfigProvider
   ↓
5. User Toggles Theme
   - Updates state
   - Updates localStorage
   - Toggles .dark class
   - Ant Design re-renders with new algorithm
   - Tailwind dark: utilities activate/deactivate
```

---

## 📚 Three-Way Theme Support

As per [Tailwind documentation](https://tailwindcss.com/docs/dark-mode#with-system-theme-support):

| User Action | localStorage | Result |
|-------------|--------------|--------|
| Never clicked toggle | `null` | Uses system preference |
| Clicked to dark | `"dark"` | Always dark |
| Clicked to light | `"light"` | Always light |

**Code that handles this:**

```javascript
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
```

**Logic:**
- If `savedTheme === "dark"` → Dark mode ✅
- If `savedTheme === "light"` → Light mode ✅
- If `savedTheme === null` and system is dark → Dark mode ✅
- If `savedTheme === null` and system is light → Light mode ✅

---

## ✨ Benefits of This Approach

### 1. **No FOUC (Flash of Unstyled Content)**
- Inline script runs before page renders
- No visual "flash" when page loads

### 2. **System Preference Respect**
- Automatically detects OS theme
- Falls back to system when user hasn't chosen

### 3. **User Choice Persistence**
- Stores preference in localStorage
- Persists across page reloads and sessions

### 4. **Follows Tailwind Best Practices**
- Uses official `@custom-variant` syntax
- Matches documentation examples exactly
- Future-proof for Tailwind updates

### 5. **Ant Design Integration**
- Seamlessly combines with Ant Design's theme system
- All components automatically themed
- Single source of truth

---

## 🔧 Customization Options

### Change Dark Class Name

If you want to use a different class name:

```css
/* app/globals.css */
@custom-variant dark (&:where(.darkmode, .darkmode *));
```

Then update the JavaScript to use `darkmode` instead of `dark`.

### Use Data Attribute Instead

Following [this example](https://tailwindcss.com/docs/dark-mode#using-a-data-attribute):

```css
/* app/globals.css */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```typescript
// Update toggle function
document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
```

### Add More Themes

```css
@custom-variant dark (&:where(.dark, .dark *));
@custom-variant sepia (&:where(.sepia, .sepia *));
@custom-variant high-contrast (&:where(.high-contrast, .high-contrast *));
```

---

## 🐛 Common Issues & Solutions

### Issue: Dark mode not working

**Check:**
1. Is `@custom-variant` in `globals.css`?
2. Is `.dark` class being added to `<html>`?
3. Are you using `dark:` prefix in your classes?

### Issue: Flash of white on page load

**Solution:** Make sure inline script in `<head>` is present and runs before body.

### Issue: Theme not persisting

**Check:** Is localStorage working? Check browser DevTools → Application → localStorage

### Issue: Ant Design components not themingAnt Design components not theming

**Check:** Is component wrapped in `<ConfigProvider>` from ThemeProvider?

---

## 📖 References

- [Tailwind CSS Dark Mode Documentation](https://tailwindcss.com/docs/dark-mode)
- [Tailwind CSS v4 Custom Variants](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)
- [Ant Design Theme Customization](https://ant.design/docs/react/customize-theme)
- [Window.matchMedia() MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

---

## ✅ Checklist

- [x] `@custom-variant dark` configured in CSS
- [x] Inline script in `<head>` to prevent FOUC
- [x] ThemeProvider wraps entire app
- [x] localStorage for persistence
- [x] System preference fallback
- [x] Ant Design ConfigProvider integration
- [x] All components support dark mode
- [x] Smooth transitions with `transition-colors`

---

**🎉 Result:** A production-ready dark mode implementation that follows Tailwind CSS best practices and integrates seamlessly with Ant Design!

