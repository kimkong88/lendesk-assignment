const { authService } = require("../../src/services");
const ApiError = require("../../src/utils/api-error.util");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");

// Mock RedisClientService
const mockRedisClientService = {
    jsonGet: jest.fn(),
    jsonSet: jest.fn(),
};

describe("AuthService", () => {
    describe("register function", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should register a user and return user object", async () => {
            const email = "test@example.com";
            const password = "testpassword";

            mockRedisClientService.jsonGet.mockResolvedValue(null);
            mockRedisClientService.jsonSet.mockResolvedValue("OK");

            const result = await authService.register(
                email,
                password,
                mockRedisClientService
            );

            expect(result).toEqual({
                email,
                password: expect.any(String),
                createdAt: expect.any(Date),
            });

            expect(mockRedisClientService.jsonGet).toHaveBeenCalledWith(
                `user:${email}`
            );
            expect(mockRedisClientService.jsonSet).toHaveBeenCalledWith(
                `user:${email}`,
                ".",
                JSON.stringify(result)
            );
        });

        it("should throw ApiError with BAD_REQUEST status if user already exists", async () => {
            const email = "test@example.com";
            const password = "testpassword";

            mockRedisClientService.jsonGet.mockResolvedValue({});

            await expect(
                authService.register(email, password, mockRedisClientService)
            ).rejects.toThrow(
                new ApiError(httpStatus.BAD_REQUEST, "Registration failed")
            );

            expect(mockRedisClientService.jsonGet).toHaveBeenCalledWith(
                `user:${email}`
            );
            expect(mockRedisClientService.jsonSet).not.toHaveBeenCalled();
        });
    });

    describe("login function", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should authenticate a user and return user object without password", async () => {
            const email = "test@example.com";
            const password = "testpassword";
            const hashedPassword = "hashedpassword";

            const user = {
                email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            mockRedisClientService.jsonGet.mockResolvedValue(
                JSON.stringify(user)
            );
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const result = await authService.login(
                email,
                password,
                mockRedisClientService
            );

            expect(result).toEqual({
                email,
                createdAt: expect.any(String),
            });

            expect(mockRedisClientService.jsonGet).toHaveBeenCalledWith(
                `user:${email}`
            );
        });

        it("should throw ApiError with UNAUTHORIZED status if user does not exist", async () => {
            const email = "test@example.com";
            const password = "testpassword";

            mockRedisClientService.jsonGet.mockResolvedValue(null);

            await expect(
                authService.login(email, password, mockRedisClientService)
            ).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized")
            );

            expect(mockRedisClientService.jsonGet).toHaveBeenCalledWith(
                `user:${email}`
            );
        });

        it("should throw ApiError with UNAUTHORIZED status if password does not match", async () => {
            const email = "test@example.com";
            const password = "testpassword";
            const hashedPassword = "hashedpassword";
            const user = {
                email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            mockRedisClientService.jsonGet.mockResolvedValue(
                JSON.stringify(user)
            );
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await expect(
                authService.login(email, password, mockRedisClientService)
            ).rejects.toThrow(
                new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized")
            );

            expect(mockRedisClientService.jsonGet).toHaveBeenCalledWith(
                `user:${email}`
            );
        });
    });
});
