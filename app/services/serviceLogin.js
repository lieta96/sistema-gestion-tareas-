import { mockUsers, mockToken } from "@/app/mocks/auth"

const delay = (ms = 400) =>
    new Promise(res => setTimeout(res, ms))

export const authService = {
    async login({ email, password }) {
        await delay()
        const user = mockUsers.find(
            u => u.email === email && u.password === password
        )
        if (!user) {
            throw new Error("Invalid credentials")
        }
        return {
            token: mockToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    },
}
