# Google Analytics & Search Console Setup Guide

## Current Status

### ✅ Already Configured
- **Vercel Analytics** - Integrated in `app/layout.tsx:107`
- **Vercel Speed Insights** - Integrated in `app/layout.tsx:108`
- **Sitemap** - Dynamic sitemap at `/sitemap.xml`
- **Robots.txt** - Configured at `/robots.txt`

### ⚠️ Needs Configuration

---

## Step 1: Set Up Google Analytics 4 (GA4)

### Option A: Use Vercel Analytics (Recommended - Already Installed)

Vercel Analytics is already installed and providing basic analytics. To connect it to GA4:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your `datavruti` project
   - Go to **Analytics** tab

2. **Integrate with GA4**
   - Click **Link Google Analytics**
   - Follow OAuth flow to connect your Google account
   - Select your GA4 property

### Option B: Add Google Analytics Directly

1. **Create a GA4 Property**
   - Go to https://analytics.google.com/
   - Click **Admin** → **Create Account**
   - Account Name: `datavruti`
   - Property Name: `datavruti.com`
   - Reporting Time Zone: `India`
   - Currency: `INR (Indian Rupee)`

2. **Get Your Measurement ID**
   - After creation, go to **Admin → Data Streams**
   - Click on your web data stream
   - Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

3. **Add to `.env` file**
   ```bash
   # Add this line to your .env file
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Create Google Analytics Component**
   Create file: `app/components/GoogleAnalytics.tsx`

   ```typescript
   'use client';

   import Script from 'next/script';

   export default function GoogleAnalytics({ GA_ID }: { GA_ID: string }) {
     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${GA_ID}');
           `}
         </Script>
       </>
     );
   }
   ```

5. **Update Layout**

   Edit `app/layout.tsx`:

   ```typescript
   import GoogleAnalytics from '@/components/GoogleAnalytics';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

     return (
       <html lang="en" className={raleway.variable}>
         <body className="font-sans">
           {GA_ID && <GoogleAnalytics GA_ID={GA_ID} />}
           <Navbar />
           {/* rest of your layout */}
         </body>
       </html>
     );
   }
   ```

---

## Step 2: Set Up Google Search Console (GSC)

### 1. Verify Your Website

1. **Go to Google Search Console**
   - Visit https://search.google.com/search-console
   - Click **Add Property**
   - Select **URL Prefix**
   - Enter: `https://www.datavruti.com`

### 2. Verify Ownership (Choose One Method)

#### Method A: HTML Meta Tag (Recommended)

1. In GSC, select **HTML tag** verification method
2. Copy the meta tag provided (format: `<meta name="google-site-verification" content="..." />`)

3. **Add to `app/layout.tsx`**

   Edit line 89-91:
   ```typescript
   verification: {
     google: 'YOUR_VERIFICATION_CODE_HERE', // Replace with actual code from GSC
   },
   ```

#### Method B: Google Analytics (Easiest)

If you set up GA4 with the same Google account:
- In GSC, select **Google Analytics** verification
- Click **Verify**

#### Method C: DNS TXT Record

Add this TXT record to your domain:
```
Type: TXT
Name: @
Value: google-site-verification=YOUR_VERIFICATION_CODE
```

### 3. Submit Sitemap

After verification:

1. **In GSC, go to:**
   - **Site Maps** (left sidebar)

2. **Submit your sitemap:**
   - Enter: `sitemap.xml`
   - Click **Submit**

3. **Verify sitemap is accessible**
   - Visit: `https://www.datavruti.com/sitemap.xml`
   - Should show XML with all your pages

### 4. Monitor Coverage

1. Go to **Pages** (formerly Coverage) in GSC
2. Check for:
   - ✅ Valid pages
   - ⚠️ Excluded pages (like /privacy-policy with noindex)
   - ❌ Errors (fix immediately)

---

## Step 3: Update Environment Variables

### Production (Vercel)

1. **Go to Vercel Dashboard → datavruti project**
2. **Settings → Environment Variables**
3. **Add:**
   ```
   NEXT_PUBLIC_SITE_URL=https://www.datavruti.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (if using direct GA4)
   ```

### Local Development

Update `.env` file:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://www.datavruti.com
```

---

## Step 4: Test Everything

### 1. Verify Analytics

**Check Real-Time Report:**
1. Go to https://analytics.google.com
2. Open your site in a new tab
3. Go to **Reports → Realtime**
4. You should see yourself as active user

### 2. Verify Search Console

1. Go to https://search.google.com/search-console
2. Check **Overview** for any errors
3. Go to **URL Inspection**
4. Enter: `https://www.datavruti.com`
5. Click **Test Live URL**
6. Should show: **URL is available to Google**

### 3. Verify Sitemap

Visit these URLs and ensure they work:
- `https://www.datavruti.com/sitemap.xml`
- `https://www.datavruti.com/robots.txt`

### 4. Verify Schema Markup

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter: `https://www.datavruti.com`
3. Check for detected schemas:
   - ✅ Organization
   - ✅ LocalBusiness
   - ✅ WebSite
   - ✅ BreadcrumbList

---

## Step 5: Set Up Goals & Events (Optional)

### Key Events to Track

In GA4, configure these events:

1. **Form Submissions**
   - Contact form submissions
   - Candidate applications

2. **Outbound Links**
   - WhatsApp clicks
   - Email clicks
   - Social media clicks

3. **Page Engagement**
   - Scroll depth (25%, 50%, 75%, 100%)
   - Time on page

### Conversion Tracking

1. In GA4, go to **Configure → Events**
2. Create custom events for:
   - `generate_lead` (contact form submitted)
   - `submit_application` (candidate applied)
   - `click_whatsapp` (WhatsApp CTA clicked)

---

## Step 6: Monitor Weekly

### Key Metrics to Track

**Google Analytics:**
- Users & Sessions
- Bounce Rate
- Avg. Session Duration
- Top Pages
- Traffic Sources (Organic, Direct, Social, Referral)
- Conversions

**Search Console:**
- Total Clicks
- Total Impressions
- Avg. CTR
- Avg. Position
- Top Queries
- Coverage Issues

---

## Quick Checklist

- [ ] GA4 property created
- [ ] Measurement ID added to `.env`
- [ ] GoogleAnalytics component created
- [ ] Layout updated with GA4 tracking
- [ ] GSC property created
- [ ] Site verified (HTML tag or GA4 method)
- [ ] Sitemap submitted to GSC
- [ ] `google-site-verification` code updated in layout.tsx
- [ ] Environment variables updated in Vercel
- [ ] Real-time analytics tested
- [ ] Rich results tested
- [ ] Weekly monitoring schedule set

---

## Troubleshooting

### Analytics Not Showing Data
- Check browser ad blocker
- Ensure GA_ID is correctly set in environment variables
- Wait 24-48 hours for data to appear

### Search Console Not Indexing
- Check robots.txt isn't blocking important pages
- Ensure noindex tags are only on legal pages
- Submit individual URLs for indexing in GSC
- Check for crawl errors in GSC

### Sitemap Not Found
- Ensure `sitemap.ts` exists in `app/` directory
- Deploy changes to production
- Check Vercel deployment logs

---

## Next Steps

1. **Set up weekly reports** from GA4 and GSC
2. **Create content strategy** based on top queries
3. **Build backlinks** from relevant sites
4. **Optimize low-performing pages**
5. **Add Schema markup** to individual service/case study pages

---

## Useful Links

- [Google Analytics 4](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
