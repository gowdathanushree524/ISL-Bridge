import type { DemoUser } from '@/types';

export const DEMO_USER: DemoUser = {
  id: 'demo-user',
  name: 'Aditi Rao',
  email: 'aditi.demo@islbridge.local',
  location: 'Bengaluru, Karnataka',
};

// Swap this for a real Supabase session lookup when authentication is added.
export function getCurrentUser(): DemoUser {
  return DEMO_USER;
}
