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
        className={`${workSans.variable} ${geistMono.variable} antialiased text-dark font-sans bg-background max-w-4xl mx-auto`}
      >
        <AuthProvider>  
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
