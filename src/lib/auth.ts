// Authorized users database
export const authorizedUsers = {
  'ian@yixy.com': {
    password: 'yixyian',
    name: 'Ian'
  },
  'john@yixy.com': {
    password: 'yixy123',
    name: 'John'
  },
  'sarah@yixy.com': {
    password: 'yixy456',
    name: 'Sarah'
  },
  'mike@yixy.com': {
    password: 'yixy789',
    name: 'Mike'
  }
} as const;

export type AuthorizedUser = keyof typeof authorizedUsers;

export function validateCredentials(email: string, password: string): boolean {
  const user = authorizedUsers[email as AuthorizedUser];
  return user?.password === password;
}