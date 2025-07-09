# FadeClub - Modern Barber Booking App

A sleek, modern web application for booking appointments at FadeClub, Nashville's premier barbershop. Built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🎯 Features

- **5-Step Booking Flow**: Service type selection → specific service → time preferences → client intake → confirmation
- **Dual Service Types**: One-time appointments and monthly memberships
- **Time Preference System**: Clients select preferred appointment times, admin confirms manually
- **Real-time Email Notifications**: Automated emails to admin using Resend
- **Admin Dashboard**: Visual schedule view and client submission management
- **Modern Design System**: Custom FadeClub branding with Tailwind CSS v4
- **Fully Responsive**: Optimized for desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JOHNNYMACONNY/FadeClub.git
   cd FadeClub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## 📱 Application Flow

### Client Booking Process
1. **Service Type**: Choose between one-time appointment or monthly membership
2. **Service Selection**: Pick specific service with pricing and duration
3. **Time Preferences**: Select up to 3 preferred appointment times
4. **Client Information**: Fill out contact details and preferences
5. **Confirmation**: Receive booking confirmation with next steps

### Admin Dashboard
- View all client submissions and scheduled appointments
- Click on appointments to see detailed client information
- Access at `/admin`

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Email**: Resend for automated notifications
- **Data**: Local JSON file storage (easily upgradeable to database)

## 🏗 Project Structure

```
app/
├── page.tsx          # Main booking interface
├── admin/            # Admin dashboard
├── api/bookings/     # API endpoints
└── layout.tsx        # Root layout with branding

components/
├── booking/          # Client booking flow components
├── admin/            # Admin dashboard components
├── ui/               # Reusable UI components
└── layout/           # Layout components

lib/
├── types.ts          # TypeScript type definitions
├── data.ts           # Data access layer
└── actions.ts        # Server actions

data/
└── bookings.json     # Client submissions storage
```

## 🎨 Design System

The app features a custom FadeClub design system with:
- **Brand Colors**: Primary blue, accent colors, and neutral grays
- **Typography**: Modern font hierarchy with brand-specific headings
- **Components**: Consistent buttons, cards, forms, and modals
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4

## 📧 Email Integration

- **Real-time Notifications**: Admin receives emails for each booking
- **Dynamic Content**: Different templates for one-time vs subscription bookings
- **Client Information**: Includes all client details and preferred appointment times
- **Professional Branding**: Styled emails matching the app's design

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📈 Current Status

✅ **Completed Features**
- Complete 5-step booking flow
- Admin dashboard with appointment management
- Email notification system
- Responsive design system
- TypeScript type safety
- Build optimization and error handling

🚧 **Next Priorities**
- Admin dashboard enhancements (filtering, quick actions)
- Enhanced UX (loading states, better error handling)
- Analytics and insights
- Advanced scheduling features

## 🚀 Deployment

**Repository**: [https://github.com/JOHNNYMACONNY/FadeClub](https://github.com/JOHNNYMACONNY/FadeClub)
**Live Demo**: *[Add your Vercel URL here after deployment]*

### Vercel Deployment (Recommended)

1. **Fork or Clone**: The repository is already connected to GitHub
2. **Import to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import `JOHNNYMACONNY/FadeClub`
3. **Environment Variables**: Add in Vercel dashboard:
   ```
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_API_BASE_URL=https://your-app.vercel.app
   ```
4. **Deploy**: Vercel will automatically build and deploy

### Manual Deployment

For other platforms:

1. Build the application: `npm run build`
2. Configure environment variables on your platform
3. Deploy the built files

### Environment Variables Required:
- `RESEND_API_KEY`: For email notifications (required)
- `NEXT_PUBLIC_API_BASE_URL`: Your production URL (optional, auto-detected)

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🎨 UI Modernization

A comprehensive **UI Modernization Plan** is included (`UI_MODERNIZATION_PLAN.md`) featuring:
- Mobile-first dark theme design
- Modern component system with animations
- Professional color palette and typography
- Enhanced user experience patterns

The modernization plan includes step-by-step implementation guides for transforming the current interface into a sophisticated, dark-themed mobile-first application.

## 📞 Support

For questions about the FadeClub booking system, contact the development team or refer to the APP_BLUEPRINT.md for detailed technical specifications.
