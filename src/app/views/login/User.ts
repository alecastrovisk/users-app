export interface UserCredentials {
    email: string | null;
    password: string | null;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
}