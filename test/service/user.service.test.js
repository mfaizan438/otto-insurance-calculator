import UserService from "../../src/server/services/user.service";
import { encrypt, decrypt } from '../../src/server/utils/crypto';

jest.mock('../../src/server/utils/crypto');

describe('UserService', () => {
    let users;
    let userService;

    beforeEach(() => {
        users = {
            findOne: jest.fn(),
            create: jest.fn(),
        };
        userService = new UserService(users);

        encrypt.mockClear();
        decrypt.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('create should encrypt the phone number and create a user', async () => {
        const mockUser = { id: 1, email: 'test@test.com', phone: '1234567890' };
        users.findOne.mockResolvedValue(null);
        users.create.mockResolvedValue(mockUser);
        encrypt.mockReturnValue('encrypted_phone'); // Ensure this mock is working correctly

        const user = await userService.create(mockUser);

        expect(users.findOne).toHaveBeenCalledWith({ where: { email: mockUser.email } });
        expect(encrypt).toHaveBeenCalledWith('1234567890'); // Correct argument
        expect(users.create).toHaveBeenCalledWith({ ...mockUser, phone: 'encrypted_phone' });
        expect(user).toEqual(mockUser);
    });

    test('findUserById should decrypt the phone number and return a user', async () => {
        const mockUser = { id: 1, email: 'test@test.com', phone: 'encrypted_phone' };
        users.findOne.mockResolvedValue(mockUser);
        decrypt.mockReturnValue('1234567890');

        const user = await userService.findUserById(1);

        expect(users.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(decrypt).toHaveBeenCalledWith('encrypted_phone'); // Correct argument
        expect(user).toEqual({ ...mockUser, phone: '1234567890' });
    });
});
