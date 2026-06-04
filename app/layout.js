import './globals.css'
import { siteConfig } from '@/data/projects'

export const metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-bg text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}