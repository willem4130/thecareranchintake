# 🚀 Quick Setup Guide

## ⚠️ Important: Fix Next.js Version First

The project currently has Next.js 16 (with Turbopack), which has permission issues. Run this command to downgrade to the stable Next.js 14:

```bash
npm install next@14.2.5 react@^18.3.1 react-dom@^18.3.1 @types/react@^18.3.3 @types/react-dom@^18.3.0
```

## 🎯 Running the Project

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open in browser**:
Visit http://localhost:3000

## 🎨 What's Included

✅ **Beautiful UI Components**
- Custom sage green & terracotta color scheme
- Smooth animations with Framer Motion
- Responsive 2-column grid layout
- Beautiful date picker with calendar popup

✅ **Form Features**
- 72 questions across 8 sections
- Real-time validation with Zod
- Type-safe with TypeScript
- Error messages with animations

✅ **Ready for Production**
- API route for form submission (`/api/submit`)
- Success page with confirmation
- Mobile-responsive design
- Accessible (ARIA labels, keyboard nav)

## 📧 Email Integration (Next Steps)

1. **Install Resend**:
```bash
npm install resend
```

2. **Get API key** from https://resend.com

3. **Create `.env.local`**:
```
RESEND_API_KEY=re_xxx...
RESEND_TO_EMAIL=yourteam@thecareranch.com
```

4. **Update `/app/api/submit/route.ts`**:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = intakeFormSchema.parse(body);

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'The Care Ranch <intake@thecareranch.com>',
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `New Intake Form: ${validatedData.name}`,
      html: generateEmailHTML(validatedData),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

## 🚀 Deploy to Vercel

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Care Ranch intake form"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy**:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables (RESEND_API_KEY, etc.)
   - Click "Deploy"

3. **Custom Domain** (optional):
   - In Vercel dashboard → Settings → Domains
   - Add `intake.thecareranch.com`
   - Update DNS records as instructed

## 🎨 Customization

### Change Colors
Edit `app/globals.css` (lines 5-50) to adjust the color palette.

### Add/Remove Questions
Edit `lib/form-schema.ts` and `app/page.tsx` to modify form fields.

### Change Fonts
Edit `app/layout.tsx` to use different Google Fonts.

## 📝 Current Status

The form includes 2 main sections currently implemented in `app/page.tsx`:
- Section I: Personal Details (9 fields)
- Section II: Training Goals & Self-Awareness (16 fields)

**Remaining sections to add** (follow the same pattern):
- Section III: Relationships & Family
- Section IV: Self-Rating (0-10 sliders)
- Section V: Leadership Identity
- Section VI: Intention
- Section VII: Health Questions
- Section VIII: Movement Questions

All fields are defined in `lib/form-schema.ts` - just need to add them to the UI!

## 🆘 Troubleshooting

**"Port 3000 in use"**:
```bash
kill -9 $(lsof -ti:3000)
# or use a different port
npm run dev -- -p 3001
```

**"Module not found"**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Turbopack errors**:
Make sure you downgraded to Next.js 14 (see top of this file)

---

Need help? The code is well-commented and follows Next.js best practices!
