export type DemoRole = "USER" | "STAFF" | "ADMIN";

export interface DemoCredential {
  label: string;
  role: DemoRole;
  email: string;
  password: string;
}

/** Demo accounts — create these users in the backend with matching roles. */
export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    label: "User 1",
    role: "USER",
    email: "user1@lostx.demo",
    password: "LostX@2026",
  },
  {
    label: "User 2",
    role: "USER",
    email: "user2@lostx.demo",
    password: "LostX@2026",
  },
  {
    label: "Staff",
    role: "STAFF",
    email: "staff@lostx.demo",
    password: "LostX@2026",
  },
  {
    label: "Admin",
    role: "ADMIN",
    email: "admin@lostx.demo",
    password: "LostX@2026",
  },
];

export const DEMO_ROLE_LABELS: Record<DemoRole, string> = {
  USER: "User",
  STAFF: "Staff",
  ADMIN: "Admin",
};
