# 🛍️ JinStore - E-Commerce Platform

A modern, fully-featured e-commerce dashboard built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. Features multilingual support (English & Arabic) with complete RTL layout, advanced filtering, shopping cart functionality, and optimized for performance and accessibility.

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)

---

## ✨ Features

### 🌍 Internationalization (i18n)
- **English & Arabic** support with automatic language detection
- **RTL/LTR** layout switching
- **Persistent language** preference in localStorage
- **Dynamic translations** for all UI elements

### 🛒 E-Commerce Functionality
- **Product Catalog** with Grid & List views
- **Shopping Cart** with real-time updates
- **Advanced Filtering** (Keywords, Categories, Price Range, Colors)
- **Search Functionality** in Navbar and Sidebar filters
- **Product Cards** with ratings, wishlist, and "In Cart" status
- **Checkout Process** (ready for implementation)

### 📦 Order Management
- **Orders Dashboard** with comprehensive table view
- **Status Tracking** (Processing, Shipped, Completed, Refunded, Cancelled)
- **Real-time Search** and filtering
- **Bulk Selection** and actions
- **Pagination** with customizable items per page
- **Sorting** by date, total, or name

### 🎨 Modern UI/UX
- **Clean Design** with consistent color scheme
- **Smooth Animations** and transitions
- **Responsive Layout** (Mobile, Tablet, Desktop)
- **Custom Select** components with hover effects
- **Interactive Elements** with visual feedback
- **Professional Sidebar** navigation

### ♿ Accessibility & SEO
- **WCAG 2.1** compliant
- **Semantic HTML5** (header, nav, main, aside, article)
- **ARIA labels** and roles for screen readers
- **Keyboard navigation** with focus indicators
- **Skip to main content** link
- **Single H1** per page for proper SEO
- **Alt text** for all images
- **Meta tags** (OpenGraph, Twitter Cards)
- **React Helmet Async** for dynamic meta tags

### ⚡ Performance
- **React 19** with latest optimizations
- **useCallback** hooks to prevent unnecessary re-renders
- **Lazy loading** ready
- **Optimized bundle** with Vite
- **Fast HMR** (Hot Module Replacement)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.0 | UI Framework |
| **TypeScript** | 5.9.2 | Type Safety |
| **Tailwind CSS** | 4.1.13 | Styling |
| **Vite** | 6.3.5 | Build Tool |
| **React Router** | 7.9.3 | Navigation |
| **i18next** | 25.5.2 | Internationalization |
| **React Helmet Async** | 2.0.5 | SEO & Meta Tags |
| **FontAwesome** | 7.0.1 | Icons |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/jinstore.git

# Navigate to project directory
cd jinstore

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🚀 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📂 Project Structure

```
JinStore/
├── public/
│   └── logo.svg                 # Favicon
├── src/
│   ├── assets/
│   │   └── Images/              # Logo, icons, product images
│   ├── Components/
│   │   ├── Cart/                # Cart components (future)
│   │   ├── Footer/              # Footer component
│   │   ├── LanguageSwitcher/    # Language toggle
│   │   ├── Layout/              # Page layout wrapper
│   │   │   └── PageLayout.tsx
│   │   ├── MobileMenu/          # Mobile navigation
│   │   ├── Navbar/              # Top navigation bar
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavbarActions.tsx
│   │   │   ├── NotificationButton.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── Orders/              # Orders-related components
│   │   │   ├── CustomSelect.tsx
│   │   │   ├── OrdersFilters.tsx
│   │   │   ├── OrdersHeader.tsx
│   │   │   ├── OrdersTable.tsx
│   │   │   ├── OrderStatus.tsx
│   │   │   └── Pagination.tsx
│   │   ├── Products/            # Product-related components
│   │   │   ├── FilterSidebar.tsx
│   │   │   └── ProductCard.tsx
│   │   └── Sidebar/             # Main sidebar navigation
│   │       └── Sidebar.tsx
│   ├── constants/
│   │   └── orderData.ts         # Sample order data
│   ├── context/
│   │   ├── CartContext.tsx      # Shopping cart state
│   │   └── LanguageContext.tsx  # Language state
│   ├── hooks/
│   │   ├── useOrders.ts         # Orders logic
│   │   └── useOrderSelection.ts # Selection logic
│   ├── i18n/
│   │   ├── config.ts            # i18next configuration
│   │   └── locales/
│   │       ├── ar.json          # Arabic translations
│   │       └── en.json          # English translations
│   ├── Pages/
│   │   ├── Orders.tsx           # Orders dashboard
│   │   └── Products/
│   │       ├── Checkout.tsx
│   │       ├── ProductDetail.tsx
│   │       ├── ProductsGridView.tsx
│   │       ├── ProductsListView.tsx
│   │       └── ShoppingCart.tsx
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

---

## 🎨 Color Scheme

```css
/* Primary Colors */
--color-primary-50: #F5F4FE;    /* Background */
--color-primary-100: #634C9F;   /* Primary brand color */
--color-primary-200: #5A4491;   /* Hover states */
--color-primary-300: #4E3A7C;   /* Dark variant */

/* Accent Colors */
--color-third: #FAAE42;         /* Star ratings, highlights */
--color-success: #05B171;       /* In cart, badges */

/* Gray Scale */
--color-gray-50 to --color-gray-900
```

---

## 📱 Pages Overview

### 1. **Orders Dashboard** (`/` or `/orders`)
- Complete order management system
- Filterable table (Status, Search, Sort)
- Bulk selection and actions
- Responsive table with mobile cards view
- RTL support for Arabic

### 2. **Products Grid View** (`/products/grid`)
- Product catalog with cards layout
- Advanced filtering sidebar
- Search functionality
- Add to cart & wishlist
- Dynamic product display
- Rating system with custom stars

### 3. **Shopping Cart** (`/products/cart`)
- View all cart items
- Adjust quantities (+/-)
- Remove items
- Order summary with totals
- Responsive layout
- Full RTL support

### 4. **Product Detail** (`/products/detail`)
- Detailed product information
- (Ready for implementation)

### 5. **Checkout** (`/products/checkout`)
- Secure checkout process
- (Ready for implementation)

### 6. **Products List View** (`/products/list`)
- Alternative list layout
- (Ready for implementation)

---

## 🔧 Key Components

### CartContext
Manages shopping cart state globally:
- Add/Remove items
- Update quantities
- Calculate totals
- Persist to localStorage
- Check if item in cart

### FilterSidebar
Advanced product filtering:
- Keyword search
- Category selection (multiple)
- Price range slider (1-2000)
- Color filters
- Real-time filter application

### CustomSelect
Reusable dropdown component:
- Custom styling to match design
- Keyboard accessible
- Smooth animations
- Consistent with brand colors

### OrdersTable
Responsive data table:
- Sortable columns
- Selectable rows
- Mobile-optimized card view
- Status badges with colors
- Actions menu

---

## 🌐 Adding New Languages

1. **Create translation file:**
   ```json
   // src/i18n/locales/fr.json
   {
     "nav": { ... },
     "orders": { ... },
     ...
   }
   ```

2. **Update i18n config:**
   ```typescript
   // src/i18n/config.ts
   import fr from './locales/fr.json';
   
   resources: {
     en: { translation: en },
     ar: { translation: ar },
     fr: { translation: fr }  // Add new language
   }
   ```

3. **Update LanguageSwitcher:**
   ```tsx
   // Add new language option
   ```

---

## 🎯 SEO Features

- ✅ Dynamic page titles with React Helmet
- ✅ Unique meta descriptions per page
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Favicon with logo
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text for all images
- ✅ ARIA labels and roles
- ✅ Lang and dir attributes

---

## ♿ Accessibility Features

- ✅ **WCAG 2.1 Level AA** compliance
- ✅ **Keyboard Navigation** (Tab, Enter, Space, Arrows)
- ✅ **Screen Reader Support** with ARIA attributes
- ✅ **Focus Indicators** visible on all interactive elements
- ✅ **Skip to Main Content** link
- ✅ **Semantic HTML** (header, nav, main, aside, article)
- ✅ **Role Attributes** (banner, navigation, main, complementary)
- ✅ **Alt Text** on all images
- ✅ **Form Labels** and aria-labels on inputs
- ✅ **Color Contrast** meets WCAG standards

---

## 🚀 Performance Optimizations

- ⚡ **React 19** latest optimizations
- ⚡ **useCallback** to memoize functions
- ⚡ **Vite** for lightning-fast builds
- ⚡ **Tailwind CSS** optimized bundle
- ⚡ **Code Splitting** ready
- ⚡ **Lazy Loading** ready
- ⚡ **localStorage** for cart persistence

---

## 📸 Screenshots

### Desktop View
- Full sidebar with navigation
- Product grid with filters
- Orders table with all columns

### Mobile View
- Hamburger menu
- Responsive cards
- Touch-friendly controls

### RTL (Arabic)
- Right-to-left layout
- Mirrored UI elements
- Arabic typography

---

## 🔮 Future Enhancements

- [ ] Product detail page implementation
- [ ] Checkout flow completion
- [ ] User authentication
- [ ] Backend API integration
- [ ] Payment gateway
- [ ] Order tracking
- [ ] Customer reviews
- [ ] Image zoom/gallery
- [ ] Wishlist page
- [ ] User profile

---

## 🐛 Known Issues

None currently. Report issues on GitHub.

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind Labs** - For Tailwind CSS
- **FontAwesome** - For the icon library
- **i18next** - For internationalization

---

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
