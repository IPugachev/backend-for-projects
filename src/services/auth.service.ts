class AuthService {
    async test(data: string): Promise<string> {
        return new Promise<string>((result) =>
            setTimeout(result, 500, data),
        );
    }
}
export const authService = new AuthService();
