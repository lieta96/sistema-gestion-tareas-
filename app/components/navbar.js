"use client"
import { useAuth } from "@/app/context/authContext"

export default function Navbar() {
    const { user, logout } = useAuth();
    if (!user) return null
    return (
        <nav className="flex justify-between items-center p-4  ">
            <p className="text-xl font-bold">Hi, {user.name}!</p>
            <button onClick={logout} className="btn-secondary text-sm">Logout</button>
        </nav>
    )
}