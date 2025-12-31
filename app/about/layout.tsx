import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Bikash Jaiswal - a developer, investor, and entrepreneur passionate about building innovative solutions.',
  openGraph: {
    title: 'About | Bikash Jaiswal',
    description: 'Learn more about Bikash Jaiswal - a developer, investor, and entrepreneur passionate about building innovative solutions.',
    url: 'https://www.bikashjaiswal.com/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Bikash Jaiswal',
    description: 'Learn more about Bikash Jaiswal - a developer, investor, and entrepreneur passionate about building innovative solutions.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
