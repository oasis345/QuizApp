import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilRootWrapper from './RecoilRootWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz App',
  description: '다양한 퀴즈 주제를 정하고 정답을 맞추어 보세요!.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootWrapper>
          <div className="flex flex-col h-screen">
            <header></header>

            <main>
              <section className="container w-full mx-auto py-5 px-5">{children}</section>
            </main>

            <footer></footer>
          </div>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
