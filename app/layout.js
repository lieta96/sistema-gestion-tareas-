import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/authContext";
import Navbar from "./components/navbar";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema de Gestión de Tareas",
  description: "Reto Frontend - Gestión de tareas con autenticación",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${workSans.variable} ${geistMono.variable} antialiased text-dark font-sans bg-background max-w-4xl mx-auto min-h-screen flex flex-col justify-between`}
      >
        <AuthProvider>  
          <Navbar/>
          {children}
          <footer className='text-center text-xs py-4'>
            <p>Coded by <a href="https://github.com/lieta96" target="_blank" rel="noopener noreferrer" className='font-semibold'>Lieta</a></p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
