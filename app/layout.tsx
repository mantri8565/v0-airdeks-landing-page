import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Airdeks — For Serious Creators and Builders',
  description:
    'Airdeks is a premium floating desk that disappears in seconds. Engineered in India, built to last.',
  generator: 'v0.app',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-slate-950 font-sans antialiased">
        {children}
        
        {/* Existing Vercel Analytics */}
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* 1. Google Analytics 4 */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-C32NCBDT9Q" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C32NCBDT9Q');
          `}
        </Script>

        {/* 2. Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x4z182y04c");
          `}
        </Script>

        {/* 3. LinkedIn Insight Tag
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "YOUR_LINKEDIN_PARTNER_ID";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
            if (!l){window.linkedin_data_partner_load = true;
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(b, s);}
            })(window.lintrk);
          `}
        </Script>  */}

         {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1721569655665280'); 
            fbq('track', 'PageView');
          `}
        </Script>

      </body>
    </html>
  )
}