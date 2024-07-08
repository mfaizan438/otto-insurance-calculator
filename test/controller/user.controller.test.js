import UserController from "../../src/server/controllers/users.controller";
import UserService from "../../src/server/services/user.service";
import axios from 'axios';

jest.mock('../../src/server/services/user.service');
jest.mock('axios');

describe('UserController', () => {
    let userService;
    let userController;

    beforeEach(() => {
        userService = new UserService();
        userController = new UserController(userService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('create should return a user', async () => {
        const mockUser = { id: 1, email: 'test@test.com' };
        userService.create.mockResolvedValue(mockUser);

        const mockReq = { body: mockUser };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.create(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    test('submit should return a response from third-party API', async () => {
        const mockUser = { id: 1, email: 'test@test.com', phone: '1234567890', first_name: 'John', last_name: 'Doe' };
        const mockResponse = { data: { message: 'Success' } };
        userService.findUserById.mockResolvedValue(mockUser);
        axios.post.mockResolvedValue(mockResponse);

        const mockReq = { body: { user_id: 1, desired_start_date: '2022-01-01' } };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.submit(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockResponse.data);
    });
});