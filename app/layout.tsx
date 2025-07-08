

// import './globals.css';
// import type { Metadata } from 'next';
// import Navbar from '@/components/Navbar';

// export const metadata: Metadata = {
//   title: 'Mentorship Platform',
//   description: 'Mentor & Mentee Matching App',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className='bg-gray-50 text-gray-900 antialiased'>
//         <Navbar />
//         <main className="min-h-screen">{children}</main>
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentorship App',
  description: 'Empower mentees, connect mentors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* 🌄 Background wrapper */}
        <div  className="absolute inset-0 bg-black/40 z-0">

        
        <div className="min-h-screen bg-[url('/bg2.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="backdrop-brightness-75 min-h-screen">
             <Navbar />
            {children}
          </div>
          </div>
        </div>
      </body>
    </html>
  );
}
