import { UserDocument } from '../user.schema';

export interface CreateUserInput extends Pick<UserDocument, 'name' | 'email'> {
    password: string;
    phone?: string;
    address?: string;
}
