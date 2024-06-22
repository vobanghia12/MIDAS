export { default } from 'next-auth/middleware';

export const config = { matcher: [
  '/dashboard',
  '/dashboard/school', 
  '/dashboard/grade',
  '/dashboard/classroom',
  '/dashboard/student'
]};