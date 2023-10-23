const jwt = require("jsonwebtoken");
const moment = require("moment");
const { tokenService } = require("../../src/services");

describe("TokenService", () => {
    describe("generateToken function", () => {
        it("should generate a valid JWT token", () => {
            const currentTime = moment();
            const expirationTime = currentTime.clone().add(1, "hour");

            const expectedPayload = {
                sub: "test@example.com",
                iat: currentTime.unix(),
                exp: expirationTime.unix(),
            };

            jwt.sign = jest.fn((payload, secret) => {
                expect(payload).toEqual(expectedPayload);
                expect(secret).toEqual("secret");
                return "mocked-jwt-token";
            });

            // Generate the token
            const token = tokenService.generateToken(
                "test@example.com",
                expirationTime
            );

            expect(jwt.sign).toHaveBeenCalledWith(expectedPayload, "secret");
            expect(token).toBe("mocked-jwt-token");
        });
    });
});
