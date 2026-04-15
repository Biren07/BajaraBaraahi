# BajaraBaraahi Frontend

A Next.js 16 e-commerce frontend application for an online bookstore.

## Tech Stack

- **Framework**: Next.js 16.2.0 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with custom shadcn/ui-style components
- **Components**: Radix UI primitives for accessible UI elements
- **Form Handling**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode support

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── categories/        # Categories listing
│   ├── category/[slug]/  # Dynamic category page
│   ├── bestsellers/       # Bestsellers page
│   ├── new-arrivals/      # New arrivals page
│   ├── offers/            # Special offers page
│   ├── cart/              # Shopping cart
│   ├── wishlist/          # User wishlist
│   ├── track-order/       # Order tracking
│   ├── help/              # Help/FAQ page
│   ├── about/             # About page
│   ├── circle/            # Community/loyalty page
│   └── ledger/            # Account ledger page
├── components/            # React components
│   ├── ui/                # Reusable UI components (shadcn-style)
│   ├── header.tsx         # Site header
│   ├── footer.tsx         # Site footer
│   ├── hero.tsx           # Hero section
│   ├── categories.tsx     # Category grid
│   ├── bestsellers.tsx    # Bestsellers section
│   ├── book-card.tsx      # Book product card
│   └── ...                # Additional feature components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets (images, icons)
```

## Features

- Product catalog with categories and filtering
- Bestsellers and new arrivals sections
- Shopping cart functionality
- User wishlist
- Order tracking
- User authentication (login/signup)
- Dark/light theme support
- Responsive design
- Accessible UI components

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

The project uses a comprehensive component library built on Radix UI primitives, including:
- Buttons, Cards, Badges
- Forms, Inputs, Selects
- Dialogs, Drawers, Sheets
- Navigation components
- Toast notifications
- Carousels, Sliders
- Tables, Accordions
- And more...