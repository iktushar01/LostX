import type { UserRole } from "./authUtils";

/** Maps backend roles (USER/ADMIN) to frontend route roles (CLIENT/ADMIN). */
export const normalizeUserRole = (
    role: string | undefined | null,
): UserRole | null => {
    if (!role) {
        return null;
    }

    const normalizedRole = role.toUpperCase();

    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "ADMIN") {
        return "ADMIN";
    }

    if (normalizedRole === "CLIENT" || normalizedRole === "USER") {
        return "CLIENT";
    }

    return null;
};
