import 'dotenv/config';

export const querySelectUsers = `
    SELECT uuid, username FROM application_user
`;

export const querySelectUserById = `
    SELECT uuid, username FROM application_user WHERE uuid = $1
`;

export const scriptInsertUser = `
    INSERT INTO application_user (username, password)
    VALUES ($1, crypt($2, ${process.env.MY_KEY_SECURITY}))
    RETURNING uuid
`;

export const scriptUpdateUser = `
    UPDATE application_user 
    SET
        username = $1, 
        password = crypt($2, ${process.env.MY_KEY_SECURITY})
    WHERE uuid = $3
`;

export const scriptRemoveUser = `
    DELETE FROM application_user 
    WHERE uuid = $1
`;

export const querySelectUserByUsernameAndPassword = `
    SELECT uuid, username FROM application_user 
    WHERE username = $1
    AND password = crypt($2, ${process.env.MY_KEY_SECURITY})
`;
