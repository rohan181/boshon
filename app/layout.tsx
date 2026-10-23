import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boshon — A story to live in',
  description: 'Earthy roots. Vivid colour. Discover sarees and everyday pieces that carry a sense of Bengal, and make the story your own.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
