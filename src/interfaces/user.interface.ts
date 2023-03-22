import Roles from './roles.interface';

interface UserSession {
  email?: string;
  username?: string;
  role?: Roles;
  isActive?: boolean;
}

interface User extends UserSession {
  id?: string;
  password: string;
  employeeId?: string;
}

interface UserSessionStore {
  user?: UserSession;
  setSession: (session: UserSession) => void;
  logoutSession: () => void;
}

export type { User, UserSession, UserSessionStore };
