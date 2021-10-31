import { User } from "../models";
import db from '../database/config/connection';
import { 
    querySelectUsers, querySelectUserById, scriptInsertUser, 
    scriptUpdateUser, scriptRemoveUser, querySelectUserByUsernameAndPassword 
} from '../sql/scripts';
import { DatabaseError } from "../models/errors";

class UserRepository {

    async findAll(): Promise<User[]> {
        try {
            const { rows } = await db.query<User>(querySelectUsers);
            return rows;
        } catch (error) {
            throw new DatabaseError('Database query error', error);
        }
    }

    async findById(uuid: string): Promise<User> {
        try{
            const values = [uuid];        
            const { rows } = await db.query<User>(querySelectUserById, values);
            const [user] = rows
            return user;
        } catch(error) {
            throw new DatabaseError('Database query error', error);
        }
        
    }

    async findUsernameAndPassword(username: string, password: string): Promise<User> {
        try {
            const values = [username, password];
            const { rows } = await db.query<User>(querySelectUserByUsernameAndPassword, values)
            const [user] = rows
            return user;
        } catch(error) {
            throw new DatabaseError('Database query error', error);
        }
    }

    async insert(user: User): Promise<string> {
        try {
            const values = [user.username, user.password];
            const { rows } = await db.query<{uuid: string}>(scriptInsertUser, values);
            const [ newUser ] = rows;
            return newUser.uuid;
        } catch (error) {
            throw new DatabaseError('Database query error', error);
        }
    }

    async update(user: User): Promise<void> {
        try {
            const values = [user.username, user.password, user.uuid];
            await db.query(scriptUpdateUser, values);
        } catch (error) {
            throw new DatabaseError('Database query error', error);
        }
    }

    async remove(uuid: string): Promise<void> {
        try {
            const values = [uuid];
            await db.query(scriptRemoveUser, values)
        } catch (error) {
            throw new DatabaseError('Database query error', error);
        }

    }

}

export default new UserRepository()