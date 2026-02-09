import { authService } from "@/app/services/serviceLogin";
import { mockUsers, mockToken } from "@/app/mocks/auth";

describe("serviceLogin", () => {
    it("should return a token and user when login is successful", async () => {
        const validUser = mockUsers[0];
        const { token, user } = await authService.login({
            email: validUser.email,
            password: validUser.password,
        });
        expect(token).toBe(mockToken);
        expect(user.id).toBe(validUser.id);
        expect(user.email).toBe(validUser.email);
        expect(user.name).toBe(validUser.name);
    });

    it("should throw 'Invalid credentials' when login is unsuccessful", async () => {
        await expect(
            authService.login({ email: "wrong@seek.com", password: "wrong" })
        ).rejects.toThrow("Invalid credentials");
    });
});