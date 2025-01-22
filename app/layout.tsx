import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navbar/Navbar';
import ClientOnly from '../components/ClientOnly';
import RegisterModal from '../components/modals/RegisterModal';
import LoginModal from '../components/modals/LoginModal';
import RentModal from '../components/modals/RentModal';
import PrivateRentModal from '../components/modals/PrivateRentModal';
import SearchModal from '../components/modals/SearchModal';

import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import EmptyModal from '../components/modals/EmptyModal';
import MobileHeader from '@/components/MobileHeader';
import CreateActivityModal from '@/components/modals/CreateActivityModal';

export const metadata: Metadata = {
  title: 'Exploracy',
  description: 'Social activities',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ]
  }
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <PrivateRentModal />
          <EmptyModal />
          <LoginModal />
          <RegisterModal />
          <MobileHeader currentUser={currentUser}/>
          <Navbar currentUser={currentUser} className="hidden lg:flex"/>
        </ClientOnly>
        <main>
          <div className="mx-auto h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
