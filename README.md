# Horizontal Training Portal — Full Codebase Explainer

> This document walks through the **entire project**, from the ground up, explaining the simplest pieces first, then building up to the bigger architectural ideas.

---

## 1. The Mental Model: What Is This Project?

This is a **training portal website** for "Horizontal." It has multiple pages:
- A **Home page** (with multiple sections stacked vertically)
- A **Contact Us page** (with a hero banner + contact form)
- A **Training Landing page** (hero + intro + category listing grid)
- **Category Courses pages** (per-category course lists with tag filters & pagination)
- **Course Detail pages** (full course content, video, related courses, feedbacks & form)
- **Auth pages** — Login, Signup, Forgot Password, Thank You (post-registration)
- **Profile pages** — My Profile (read-only), Edit Profile (editable), Change Password (modal-style)
- A **Certification Landing page** (hero + description + 6-category grid)
- A **404 Not Found page**

The tech stack:
| Tool | Role |
|---|---|
| **Vite** | Dev server + build tool (replaces Webpack) |
| **React 19** | UI library — components, state, JSX |
| **TypeScript** | Adds types to JavaScript |
| **Tailwind CSS v3** | Utility-first CSS classes |
| **React Router v7** | Client-side routing (`BrowserRouter`, `Routes`, `Route`) |
| **Modern Era font** | Custom brand font (self-hosted) |

---

## 2. Where Does It All Start? (`index.html` → `main.tsx`)

The browser always loads an HTML file first. Here it is, stripped to its essence:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

**What this does:**  
1. Creates an empty `<div id="root">`. This is the "mount point" — the empty box where React will paint the entire app.
2. Loads `main.tsx` as a JavaScript module.

Now `main.tsx`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- `createRoot` takes that empty `div#root` and hands it to React.
- `.render(...)` tells React: *"Paint `<App />` inside it."*
- `StrictMode` is a development safety wrapper — it deliberately renders components **twice** in dev mode to catch bugs like stale closures. It has **zero effect in production**.
- The `!` after `getElementById('root')` is TypeScript's "non-null assertion." It says: *"Trust me, this element exists. Don't make me handle the null case."*

> **Why does `main.tsx` import `./index.css`?**
> CSS imported in JS gets bundled by Vite and injected into the page. This is a Vite/webpack convention — there's no other place to load global styles in a purely JS-driven setup.

---

## 3. The Design System Foundation

Before we look at any component, we need to understand the **design language** because every component speaks it.

### `tailwind.config.js` — The Brand Token Registry

This file *extends* Tailwind's defaults with custom values specific to this brand:

```js
colors: {
  brand: {
    teal:      '#7FC3BA',   // main accent, CTA color
    orange:    '#F58366',   // secondary accent, star ratings
    navy:      '#065164',   // hero overlays
    dark:      '#2F2D2E',   // near-black, used for text and dark backgrounds
    muted:     '#515151',   // secondary text
    surface:   '#F0F0F0',   // light grey page background
    pureWhite: '#FFFFFF',
    pureBlack: '#000000',
  }
}
```

Now instead of writing `#7FC3BA` everywhere, any component can write `bg-brand-teal` or `text-brand-teal`. If the brand color changes, you change it **once** here.

Typography sizes are also registered:
```js
fontSize: {
  'h1-desktop': ['60px', { lineHeight: '1.2', fontWeight: '900' }],
  'h1-mobile':  ['36px', { lineHeight: '1.2', fontWeight: '900' }],
  // ...
  'body-intro': ['20px', { lineHeight: '28px', fontWeight: '700' }],
  'body-main':  ['16px', { lineHeight: '24px', fontWeight: '400' }],
}
```

This means a class like `text-h1-desktop` sets **font-size, line-height, AND font-weight** in one shot.

The font family:
```js
fontFamily: {
  sans: ['"Modern Era"', 'system-ui', 'sans-serif'],
}
```
This makes `font-sans` (Tailwind's default font class) point to the brand font.

### `index.css` — Where Design Tokens Become Rules

This file is divided into three **Tailwind layers**:

**`@layer base`** — Sets the default styling for raw HTML elements.
```css
body { @apply text-brand-dark bg-brand-surface font-sans text-body-main antialiased; }
h1   { @apply text-h1-mobile md:text-h1-desktop font-black text-brand-pureWhite; }
h2   { @apply text-h2-mobile md:text-h2-desktop font-black text-brand-dark; }
p    { @apply text-body-main text-brand-muted; }
p.intro { @apply text-body-intro text-brand-dark; }
```

> **Intuition:** When you write `<h1>Hello</h1>` anywhere in the project, it **automatically** gets the correct size, weight, and color. You don't have to re-apply those classes every time. The design system *flows down* from the base layer.

> **Why `md:text-h1-desktop`?** The `md:` prefix is Tailwind's responsive prefix — it means "apply this at `768px` and above." So headings are smaller on mobile and bigger on desktop without you writing any media queries manually.

**`@layer components`** — Reusable CSS classes (like a mini-component library at the CSS level):
```css
.btn          { /* base flex layout, height, transition */ }
.btn-primary  { @apply btn bg-brand-teal text-brand-dark hover:bg-[...]; }
.btn-dark     { @apply btn bg-brand-dark text-white ...; }
.btn-outline  { @apply btn border-2 border-brand-navy ...; }
.nav-link     { /* nav-specific active state with underline */ }
.container-desktop { @apply mx-auto px-6 md:px-12 w-full; max-width: 1440px; }
```

`container-desktop` is the **master layout constraint**. Every section wraps its content in this class to prevent it from stretching wider than 1440px on huge monitors, while also adding consistent left/right padding.

**`@font-face`** — Loads the brand font at specific weights:
```css
@font-face {
  font-family: 'Modern Era';
  src: url('/fonts/ModernEra-Regular-woff2.woff2') format('woff2'), ...;
  font-weight: 400;
  font-display: swap; /* show system font instantly, swap when loaded */
}
```
`font-display: swap` is a performance best practice — it prevents invisible text while the font downloads.

---

## 4. The Atomic Design Hierarchy

This project uses **Atomic Design** — a way of thinking about components in layers, like building with Lego:

```
Atoms      →  Molecules     →  Organisms (home/)  →  Pages   →  App
(smallest)                                          (biggest)
```

Let's walk through each level.

---

## 5. Atoms — The Smallest Building Blocks

### `Container.tsx`

```tsx
export function Container({ as: Component = 'div', className = '', children }: ContainerProps) {
  return (
    <Component className={`container-desktop ${className}`.trim()}>
      {children}
    </Component>
  )
}
```

**What it does:** Wraps any content in the `container-desktop` layout constraint.

**Why `as?: ElementType`?** This is the **polymorphic component pattern**. Most of the time you'd render a `<div>`, but sometimes you want a `<section>` or `<main>` to have that same centering/padding behavior. `as` lets the *caller* choose the HTML element. Example:
```tsx
<Container as="section">...</Container>
// renders: <section class="container-desktop">...</section>
```

**The renaming trick:** `{ as: Component = 'div' }` — the prop is called `as` on the outside (since `as` is a readable convention), but inside the function it's renamed to `Component` because JSX requires element names to start with a capital letter (`<Component />` works, `<as />` would be interpreted as a custom HTML element).

---

### `Button.tsx`

```tsx
type ButtonVariant = 'primary' | 'outline' | 'dark'
```

**This is a TypeScript union type.** It means `variant` can only ever be one of those three strings — nothing else. TypeScript will give a compile error if you write `<Button variant="red" />`.

```tsx
const variantClass = `btn-${variant}`
// e.g. 'primary' → 'btn-primary'  (matches the CSS class in index.css)
```

The clever part — the same component renders an `<a>` tag OR a `<button>` tag:
```tsx
if (href) {
  return <a href={href} className={classes}>{children}</a>
}
return <button type={type} className={classes}>{children}</button>
```

**Why?** Buttons that navigate somewhere should be `<a>` tags for semantics and accessibility (right-click → "Open in new tab"). Buttons that trigger actions (like form submit) should be `<button>`. One component handles both cases.

---

### `Text.tsx`

This is the most complex atom. It maps a `variant` name to an HTML tag AND to CSS classes:

```tsx
// If variant is 'h1', it picks <h1> as the element
if (variant === 'h1' || ... || variant === 'h5') {
  Component = variant  // 'h1' → renders <h1>
}
```

But you can also override with `as`:
```tsx
<Text as="p" variant="intro">...</Text>
// renders <p class="intro"> (the CSS class from index.css)
```

The `color` and `align` props just add Tailwind classes:
```tsx
if (color) baseClasses.push(`text-${color}`)
// 'brand-dark' → 'text-brand-dark'

if (align) baseClasses.push(`text-${align}`)
// 'center' → 'text-center'
```

> **Why does this atom exist?** Without it, if the design system changes the "intro" paragraph style, you'd have to hunt down every `<p className="intro ...">` across the codebase. With `<Text variant="intro">`, the mapping lives in one file.

---

### `Icons.tsx`

This is a **centralized icon registry**. All SVG icons and image imports live here. Components that need icons import from this file — never directly from the images folder.

```tsx
import angleDownIcon from '../../images/angle-down.svg'
// Vite converts this import into a URL string, e.g. '/assets/angle-down-abc123.svg'

export function IconChevronDown({ className }) {
  return <img src={angleDownIcon} alt="" aria-hidden />
}
```

**`alt=""`** + **`aria-hidden`** — these icons are decorative. Screen readers would say "image" without alt text, which is confusing. `alt=""` tells screen readers to skip it. `aria-hidden` is a belt-and-suspenders approach.

**`IconChevronRight` and `IconClose`** are inline SVGs (not `<img>` tags):
```tsx
export function IconChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
```
`stroke="currentColor"` is the key — it means "inherit the text color of the surrounding element." So if the parent has `text-white`, the icon becomes white automatically. This is why inline SVGs are preferred when the icon color needs to be dynamically controlled via CSS.

**New auth-related icons:** `IconEye`/`IconEyeOff` (password visibility toggle), `IconArrowLeft` (back navigation), `IconPencil` (edit profile link), `IconCheck`/`IconCircle` (password strength indicators — green filled circle for passed rules, grey outline for failing).

---

### `PasswordInput.tsx`

A **reusable password field** with a show/hide eye toggle, matching the design's underline-style input pattern:
```tsx
const [visible, setVisible] = useState(false)
return (
  <div className="relative border-b border-brand-dark">
    <input type={visible ? 'text' : 'password'} ... />
    <button onClick={() => setVisible(!visible)}>
      {visible ? <IconEyeOff /> : <IconEye />}
    </button>
  </div>
)
```
Used across Login, Signup, Edit Profile, and Change Password pages.

---

### `PasswordStrength.tsx`

A **real-time password rules checker** that displays 6 validation criteria:
- minimum 10 characters
- 1 uppercase letter
- 1 lowercase letter
- 1 numeric character
- 1 special character
- Passwords match

Each rule shows `IconCheck` (green) when passing and `IconCircle` (grey) when not. Also exports `isPasswordValid()` for form-level validation before submission.

---

## 6. Molecules — Combinations of Atoms

### `NavItem.tsx`

A nav link that renders differently based on context: **mobile** vs **desktop**. Now uses React Router's `<Link>` instead of raw `<a>` tags for client-side navigation.

```tsx
import { Link } from 'react-router-dom'

// Each item receives an `href` prop (e.g. '/training') from navigation.json
if (isMobile) {
  return <li><Link to={href}>...<IconChevronRight /></Link></li>
}
return <li><Link to={href}>...<IconChevronDown /></Link></li>
```

**The `isActive` logic:**
```tsx
isActive && id !== 'home'
  ? 'border-b-2 border-white pb-1'  // active underline
  : 'border-b-2 border-transparent pb-1'  // invisible border (holds spacing)
```

**Why always render a `border-b-2`?** Even when the item is *not* active, there's an invisible transparent border. This prevents the text from visually "jumping" by 2px when a border appears. Both states take the same vertical space.

**Why `id !== 'home'` special-cased?** Home is the default page. It was decided not to show the active underline on Home to avoid it always looking selected. A deliberate design decision.

---

### `Card.tsx`

A content card with a **hover color swap** effect. Now supports an optional `href` prop to render as a React Router `<Link>` for navigation:

```tsx
// If href is provided, renders as a <Link>; otherwise a plain <div>
if (href) {
  return <Link to={href} className={sharedClassName}>{content}</Link>
}
return <div className={sharedClassName}>{content}</div>
```

**Tailwind's `group` pattern** is the key concept here:
- `group` is added to the **parent** element.
- `group-hover:*` classes on **children** activate when the *parent* is hovered.

So hovering the entire card:
1. Card background → `bg-brand-teal` (teal)
2. Icon → `brightness-0 invert` (makes any colored image pure black, then inverts to white)
3. Title text → `text-white`

This creates a cohesive "all-white on teal" hover state without any JavaScript.

### `HeroBanner.tsx`

A **reusable hero banner** extracted from the repeated hero pattern across Training, Category, and Contact pages:

```tsx
export function HeroBanner({ title }: { title: string }) {
  return (
    <section className="relative min-h-[240px] overflow-hidden">
      <img src={bannerImage} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-brand-navy/60" />
      <div className="relative z-10 container-desktop">
        <h1>{title}</h1>
      </div>
    </section>
  )
}
```

Uses the same triple-layer overlay technique as the Home hero (photo → teal blend → navy overlay → text).

---

## 7. Layout — The Persistent Shell

### `Navbar.tsx`

The Navbar is the most architecturally interesting file. It has three distinct layers:

#### Layer 1: State Management

```tsx
const [open, setOpen] = useState(false)
```
One boolean controls whether the mobile drawer is visible.

```tsx
useEffect(() => {
  if (!open) return
  document.body.style.overflow = 'hidden'   // prevent scrolling behind drawer
  return () => { document.body.style.overflow = '' }  // cleanup on close
}, [open])
```

**The cleanup function** (the `return () => {...}`) is crucial. When `open` becomes `false`, React runs that returned function, removing the overflow lock. If you didn't clean up, the page would stay unscrollable forever after the first open.

```tsx
useEffect(() => {
  const closeOnWide = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false)
  }
  window.addEventListener('resize', closeOnWide)
  return () => window.removeEventListener('resize', closeOnWide)
}, [])
```
If someone opens the mobile drawer and then resizes the window to desktop width, the drawer auto-closes. Again, cleanup removes the event listener on unmount.

#### Layer 2: Route-Aware Active State

The Navbar now uses `useLocation()` from React Router to determine which nav item is active:

```tsx
const location = useLocation()
const getActiveItem = (): NavbarNavId => {
  if (location.pathname.startsWith('/training')) return 'training'
  if (location.pathname.startsWith('/certification')) return 'certification'
  if (location.pathname.startsWith('/contact')) return 'contact'
  return 'home'
}
```

This replaces the old `activeItem` prop — the Navbar now **derives** its active state from the URL rather than receiving it from a parent.

#### Layer 3: The Data-Driven Pattern (ComponentRegistry)

```tsx
const ComponentRegistry = { NavItem: NavItem }

{navigationConfig.map((itemConfig) => {
  if (itemConfig.authRequired && !isLoggedIn) return null
  const Component = ComponentRegistry[itemConfig.type]
  return <Component key={itemConfig.id} href={itemConfig.href} {...props} />
})}
```

`navigation.json` now includes `href` paths:
```json
{ "id": "training", "type": "NavItem", "label": "Training", "href": "/training", "hasDropdown": true, "authRequired": true }
```

#### Layer 4: Auth-Conditional UI

```tsx
{isLoggedIn ? (<div>My Account button</div>) : (<div>Log In button</div>)}
```

`isLoggedIn` is a **prop** passed from `App.tsx`. The Navbar doesn't know *why* the user is logged in — it just receives a boolean and renders accordingly.

#### Layer 5: Mobile Drawer (auto-closes on navigation)

```tsx
useEffect(() => { setOpen(false) }, [location.pathname])  // close on route change

{open && (
  <div id="mobile-navigation" className="fixed inset-0 z-[60]">
    ...
  </div>
)}
```

`fixed inset-0` covers the entire viewport. `z-[60]` sits above the header (`z-50`). The drawer now **auto-closes when the route changes**, preventing it from staying open after clicking a nav link.

---

### `Footer.tsx`

Purely presentational (no state). Uses React Router `<Link>` for internal navigation. Layout: logo left, links + social icons right:
```tsx
<div className="container-desktop flex flex-col lg:flex-row lg:justify-between">
  <div>Logo</div>
  <div>Training / Certification / Contact links + social icons</div>
</div>
```

Bottom bar: `Privacy Policy | Disclaimer | © Horizontal Digital {year}`

---

## 8. Pages — Assembled from Organisms

### `Home.tsx`

```tsx
export function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <ExploreBy />
      <FeaturedLearnings />
      <CategoryListing />
      <CertificationsList />
    </>
  )
}
```

The `<>...</>` is a **React Fragment** — a wrapper that groups elements without adding an extra DOM node. `Home` is purely a **composer** — it lists sections in order, nothing else. The layout is defined entirely by the individual section components (each uses `<section>` with padding and a background color).

### Home Page Sections (the organisms)

| Component | Background | Key Content |
|---|---|---|
| `Hero` | Banner image + teal/navy overlays | Full-width hero, h1, CTA button |
| `Welcome` | White | h2 + long intro paragraph |
| `ExploreBy` | `brand-surface` (light grey) | 3 cards: Subscriptions, Solutions, Certs |
| `FeaturedLearnings` | `brand-dark` (near black) | Text left + 4 cert cards right |
| `CategoryListing` | White | Data-driven: reads `categories.json` |
| `CertificationsList` | `brand-surface` | Placeholder grid of 8 cert tiles |

**The alternating bg pattern** (`white` → `surface` → `dark` → `white` → `surface`) creates visual rhythm — sections feel distinct without needing borders.

**`Hero.tsx`** — the banner layering technique:
```tsx
<section className="relative min-h-[500px]">
  <div className="absolute inset-0">              {/* Layer 1: photo */}
    <img className="h-full w-full object-cover" />
    <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply" />  {/* Layer 2: teal tint */}
    <div className="absolute inset-0 bg-brand-navy/60" />                     {/* Layer 3: dark overlay */}
  </div>
  <div className="relative z-10 container-desktop">  {/* Layer 4: text content */}
    <h1>...</h1>
  </div>
</section>
```
Three visual layers stack on top of the photo: a teal color with `mix-blend-multiply` (blends with the image) + a dark navy semi-transparent overlay = a rich, branded hero feel. The content div sits *above* all of them via `relative z-10`.

**`CategoryListing.tsx`** — uses the same ComponentRegistry pattern as Navbar but for cards:
```tsx
import categoryConfig from '../../config/categories.json'
const Registry = { Card: Card }

cards.map((cardData) => {
  const Component = Registry[cardData.type]
  return <Component key={cardData.id} title={cardData.title} icon={cardData.iconPath} />
})
```

**`FeaturedLearnings.tsx`** — generates placeholder data programmatically:
```tsx
const CERTS = Array(4).fill(0).map((_, i) => ({ id: i, title: 'Certifications', icon: certIcon }))
```
`Array(4).fill(0)` creates `[0,0,0,0]`. `.map((_, i) => ...)` iterates it, using only the index `i` as a unique key (the value `_` is ignored — the underscore is a convention for "I don't need this").

---

### `ContactUs.tsx`

The Contact page is **self-contained** — it doesn't use any atom or molecule components (a sign it was built slightly differently, possibly before the design system was fully solidified).

The hero reuses the same banner image and overlay technique as `Hero.tsx`.

The form uses **underline-style inputs** (no visible box, just a border-bottom):
```tsx
<div className="flex flex-col border-b border-brand-dark">
  <input className="bg-transparent pb-3 outline-none ..." />
</div>
```
`bg-transparent` + `outline-none` removes the default browser input box appearance. The border is on the *wrapper div*, not the input itself, which gives cleaner control.

`<select className="appearance-none ...">` — `appearance-none` removes the browser's default dropdown arrow so the design is consistent across browsers.

---

## 9. The App Shell — `App.tsx` (React Router + Auth)

The app uses **React Router** (`BrowserRouter`) with a **reactive auth system**:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from './lib/useAuth'

export default function App() {
  const { loggedIn } = useAuth()  // ← reactive auth state

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-brand-surface">
        <Navbar isLoggedIn={loggedIn} />  {/* ← dynamic, not hardcoded */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/training" element={<TrainingLanding />} />
            <Route path="/training/:categoryId" element={<CategoryCourses />} />
            <Route path="/training/:categoryId/:courseId" element={<CourseDetail />} />
            <Route path="/certification" element={<CertificationLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />  {/* catch-all 404 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

**Key architectural decisions:**
- `useAuth()` provides a **reactive** `loggedIn` boolean that updates the Navbar instantly when the user logs in/out.
- The Navbar's `isLoggedIn` prop is now driven by real localStorage state instead of being hardcoded to `true`.
- Auth-protected pages (`Profile`, `EditProfile`, `ChangePassword`) use `<Navigate to="/login" replace />` internally to redirect unauthenticated users.
- The `*` catch-all route at the end matches any URL that doesn't match a defined route, rendering the 404 page.
- `ScrollToTop` resets scroll position on every route change.

`flex flex-col` stacks Navbar → Main → Footer vertically. `min-h-screen` ensures the wrapper is at least the full viewport height. `flex-1` on `main` makes it expand to fill all remaining space — this is how the Footer is "pushed" to the bottom even on short pages.

---

## 10. The Training Module

The Training section is the largest content area, with three levels of drill-down:

### `TrainingLanding.tsx` — `/training`

Hero banner → "Horizontal Training" intro section → Category Listing grid (6 cards).
Each category card is a `<Link>` to `/training/:categoryId`. Uses the `HeroBanner` molecule and reads from `training.json`.

### `CategoryCourses.tsx` — `/training/:categoryId`

Hero with category title → Breadcrumb → Tag filter pills (desktop) / dropdown (mobile) → Paginated course list → Pagination controls.

```tsx
const { categoryId } = useParams<{ categoryId: string }>()
const courseData = trainingConfig.courses[categoryId]
```

`useParams()` extracts the dynamic segment from the URL. If the category doesn't exist, it redirects to `/training` with `<Navigate to="/training" replace />`.

Each course item has a two-column desktop layout (title+description left, duration+button right) and a stacked mobile layout.

### `CourseDetail.tsx` — `/training/:categoryId/:courseId`

The most complex page. Sections:
1. **Breadcrumb** — `Home | Training | Frontend Solutions | Web Development Basic - HTML`
2. **Course description** — long-form text
3. **Code image** — full-width image
4. **Bullet points** — sub-heading + list
5. **Video thumbnail** — with a play button overlay (CSS-only, centered with flexbox)
6. **Related Courses** — 3-card grid with images and "Learn more" links
7. **Feedbacks** — reviewer cards with `StarRating` component (orange stars, date, comment)
8. **Submit Feedback form** — textarea + interactive star rating + Submit/Cancel
9. **Submitted state** — green checkmark + thank you message

The `StarRating` component handles both display and interactive modes:
```tsx
function StarRating({ rating, interactive, onChange }) {
  // interactive=false → read-only display
  // interactive=true → clickable stars that call onChange
}
```

---

## 11. The Auth System — `src/lib/auth.ts` + `useAuth.ts`

The project uses a **localStorage-based mock auth system** designed to be swapped for a real backend later.

### `auth.ts` — The Auth Service

Stores data under two localStorage keys:
- `hztl_users` — JSON array of all registered user objects
- `hztl_session` — JSON of the currently logged-in user (null = logged out)

```tsx
export function login(email, password) → { ok, user?, error? }
export function register(data: UserData) → { ok, error? }
export function logout() → void
export function getSession() → UserData | null
export function updateProfile(partial) → void
export function changePassword(currentPw, newPw) → { ok, error? }
```

**Critical detail:** Every mutation (`login`, `logout`, `updateProfile`) fires a custom event:
```tsx
window.dispatchEvent(new Event('auth-change'))
```
This is the **pub/sub bridge** between the imperative auth API and React's reactive rendering.

### `useAuth.ts` — The Reactive Hook

Uses React 18's `useSyncExternalStore` to subscribe to auth changes:
```tsx
export function useAuth() {
  const session = useSyncExternalStore(
    subscribe,    // listens for 'auth-change' + 'storage' events
    () => localStorage.getItem('hztl_session'),  // snapshot
    () => null,   // server snapshot (SSR)
  )
  const user = session ? JSON.parse(session) : null
  return { user, loggedIn: user !== null }
}
```

**Why `useSyncExternalStore`?** It's the React-blessed way to subscribe to external state (localStorage) and guarantee tearing-free rendering. The Navbar, App, and protected pages all use this hook and re-render in sync when auth state changes.

---

## 12. New Pages

### Auth Pages

| Page | Route | Key Features |
|---|---|---|
| `Login.tsx` | `/login` | Email + password (with eye toggle), forgot password link, signup link, error state |
| `Signup.tsx` | `/signup` | Full registration form, real-time password strength, fake reCAPTCHA, duplicate-email error |
| `ThankYou.tsx` | `/thank-you` | Post-registration confirmation, CTA to login |
| `ForgotPassword.tsx` | `/forgot-password` | Email input + submit (simulated, shows confirmation message) |

### Profile Pages (auth-protected)

| Page | Route | Key Features |
|---|---|---|
| `Profile.tsx` | `/profile` | Read-only view of Personal + Contact info, links to Edit and Change Password |
| `EditProfile.tsx` | `/profile/edit` | Editable fields with Save/Cancel, back-to-profile link |
| `ChangePassword.tsx` | `/profile/change-password` | Modal-style card on desktop, current/new/confirm password with strength checker |

All profile pages use `<Navigate to="/login" replace />` for unauthenticated users.

### Certification Landing Page

`CertificationLanding.tsx` (`/certification`) — Hero banner with teal/navy overlay → breadcrumb → description section → 6-category grid with icons and teal progress bars. Uses the same certification SVG icons as the Home page.

### 404 Not Found

`NotFound.tsx` (catch-all `*` route) — Clean error page with "404 ERROR" label, heading, subtitle, and a CTA button to return home.

---

## 13. The Config Layer — JSON as the Source of Truth

```
src/config/
├── navigation.json    ← drives Navbar items (with route paths)
├── categories.json    ← drives Home page CategoryListing cards
└── training.json      ← drives entire Training module
```

`training.json` contains:
- **`categories`** — 6 training categories with icons (Frontend, Backend, DevOps, QA, UI, Open)
- **`courses`** — per-category course lists with tags, titles, descriptions, durations
- **`courseDetails`** — deep course data (images, bullet points, video, related courses, feedbacks)

The principle: **data and presentation are separate**. The ComponentRegistry/Factory pattern maps JSON `"type"` fields to React components.

---

## 14. How the Whole System Connects (Flow Diagram)

```
index.html
    └── main.tsx          (mounts React)
         └── App.tsx       (BrowserRouter + useAuth())
              ├── ScrollToTop.tsx      (resets scroll on route change)
              ├── Navbar.tsx           (route-aware + auth-aware via isLoggedIn prop)
              │    ├── navigation.json
              │    ├── NavItem.tsx      (molecule: <Link> based)
              │    ├── Icons.tsx        (atom: BrandLogo, Hamburger, Eye, etc.)
              │    └── auth.ts logout() (mobile drawer logout button)
              │
              ├── lib/
              │    ├── auth.ts          (localStorage CRUD: register, login, logout, etc.)
              │    └── useAuth.ts       (reactive hook: useSyncExternalStore)
              │
              ├── Routes
              │    ├── / → Home.tsx
              │    │    ├── Hero, Welcome, ExploreBy, FeaturedLearnings
              │    │    ├── CategoryListing (links to /training/:id)
              │    │    └── CertificationsList
              │    │
              │    ├── /contact → ContactUs.tsx
              │    │
              │    ├── /training → TrainingLanding.tsx
              │    │    ├── HeroBanner (molecule), Breadcrumb (atom)
              │    │    └── Category grid (reads training.json)
              │    │
              │    ├── /training/:categoryId → CategoryCourses.tsx
              │    ├── /training/:categoryId/:courseId → CourseDetail.tsx
              │    │
              │    ├── /certification → CertificationLanding.tsx
              │    │    ├── Hero banner (teal/navy overlay)
              │    │    └── 6-category grid with icons
              │    │
              │    ├── /login → Login.tsx
              │    ├── /signup → Signup.tsx (PasswordInput + PasswordStrength atoms)
              │    ├── /thank-you → ThankYou.tsx
              │    ├── /forgot-password → ForgotPassword.tsx
              │    │
              │    ├── /profile → Profile.tsx (auth-protected)
              │    ├── /profile/edit → EditProfile.tsx (auth-protected)
              │    ├── /profile/change-password → ChangePassword.tsx (auth-protected)
              │    │
              │    └── * → NotFound.tsx (404 catch-all)
              │
              └── Footer.tsx (React Router <Link> based)
```

---

## 15. Key Patterns to Internalize

| Pattern | Where You See It | Why It Exists |
|---|---|---|
| **Tailwind design tokens** | `tailwind.config.js` | One place for brand colors/sizes |
| **`@layer base` defaults** | `index.css` | h1/h2/p styled globally, not per-component |
| **Polymorphic `as` prop** | `Container.tsx`, `Text.tsx` | Reuse layout logic across element types |
| **Conditional HTML element** | `Button.tsx`, `Card.tsx` | `<Link>` for navigation, `<div>` otherwise |
| **ComponentRegistry / Factory** | `Navbar.tsx`, `CategoryListing.tsx` | JSON config → React component, decoupled |
| **Tailwind `group` + `group-hover:`** | `Card.tsx`, `ExploreBy.tsx` | Parent hover triggers child styles |
| **`useEffect` with cleanup** | `Navbar.tsx` | Prevents memory leaks from event listeners |
| **`fixed inset-0`** | Navbar mobile drawer | Full-screen overlay |
| **`flex flex-col` + `flex-1`** | `App.tsx` | Footer always sticks to bottom |
| **React Router (`BrowserRouter`)** | `App.tsx` | Client-side routing with URL params |
| **`useParams()` dynamic routing** | `CategoryCourses`, `CourseDetail` | Extract `:categoryId`/`:courseId` from URL |
| **`useLocation()` derived state** | `Navbar.tsx` | Active nav item from current route |
| **`<Navigate>` redirect** | Profile pages, `CategoryCourses` | Redirect unauthenticated/invalid requests |
| **`ScrollToTop` utility** | `App.tsx` | Reset scroll position on route change |
| **Reusable `HeroBanner`** | Training pages, Certification page | DRY hero pattern across multiple pages |
| **`currentColor` in SVG** | `Icons.tsx` | Icon inherits text color from CSS |
| **`mix-blend-multiply`** | `Hero.tsx`, `HeroBanner.tsx` | Color tint blends realistically with photo |
| **`useSyncExternalStore`** | `useAuth.ts` | React-safe subscription to localStorage |
| **Custom DOM events** | `auth.ts` → `useAuth.ts` | Pub/sub bridge between imperative API and React |
| **localStorage mock auth** | `auth.ts` | Frontend-only auth, swappable for real backend |
| **Auth-protected routes** | Profile, EditProfile, ChangePassword | `<Navigate to="/login">` for unauthenticated users |
| **Real-time validation** | `PasswordStrength.tsx` | Live feedback without form submission |

---

*This document covers every file in the project. Ask about any specific file, pattern, or concept to go deeper.*
