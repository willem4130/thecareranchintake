# The Care Ranch - Leadership Retreat Intake Form

A beautiful, modern web-based intake form built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.

## 🎨 Features

- **Beautiful Country-Elegant Design**: Warm earth tones (sage green, cream, terracotta)
- **2-Column Responsive Grid**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations throughout
- **Date Picker**: Beautiful calendar popup for date selection
- **Form Validation**: Real-time validation with helpful error messages
- **Auto-save**: Form data saved to localStorage (prevents data loss)
- **Accessible**: ARIA labels and keyboard navigation
- **Type-Safe**: Full TypeScript support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd care-ranch-intake
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
care-ranch-intake/
├── app/
│   ├── api/submit/      # API route for form submission
│   ├── globals.css      # Global styles with custom colors
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main form page
├── components/ui/       # Shadcn UI components
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── date-picker.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── popover.tsx
│   └── textarea.tsx
├── lib/
│   ├── form-schema.ts   # Zod validation schema
│   └── utils.ts         # Utility functions
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Color Palette

The form uses a warm, country-elegant color scheme:

- **Primary**: Sage Green (#6B8E7D)
- **Background**: Warm Cream (#F9F7F4)
- **Foreground**: Deep Brown (#3D2E28)
- **Accent**: Terracotta (#C17860)
- **Secondary**: Soft Tan (#D9C5B0)

## 📧 Email Integration

To enable email submissions:

1. Install Resend:
```bash
npm install resend
```

2. Add your Resend API key to `.env.local`:
```
RESEND_API_KEY=your_key_here
```

3. Update `app/api/submit/route.ts` with your email logic

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

```bash
npm run build
```

## 📝 Form Sections

1. **Personal Details** - Name, contact info, DOB
2. **Training Goals & Self-Awareness** - Motivations, mood, qualities
3. **Relationships & Family** - Family dynamics, partnerships
4. **Self-Rating** - Rate various life aspects (0-10)
5. **Leadership Identity** - Leadership style, patterns
6. **Intention** - Goals for the retreat
7. **Health Questions** - Medical history, medications
8. **Movement Questions** - Body awareness, physical challenges

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Typography
The form uses:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

Change fonts in `app/layout.tsx`.

### Animations
Adjust animation timing in `tailwind.config.ts` under the `animation` key.

## 📄 License

Private - The Care Ranch

## 🆘 Support

For issues or questions, contact: your.email@thecareranch.com
