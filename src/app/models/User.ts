export interface UserCredentials {
  email: string | null;
  password: string | null;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
