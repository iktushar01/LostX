/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/authUtils";
import { normalizeUserRole } from "@/lib/roleMapping";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { setCookie } from "@/lib/cookieUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import {
  ILoginPayload,
  loginZodSchema,
} from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  // ❌ Validation fail
  if (!parsedPayload.success) {
    return {
      success: false,
      message:
        parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data
    );

    const { accessToken, refreshToken, token, user } =
      response.data;

    const {
      role,
      needPasswordChange,
      email,
    } = user;

    const normalizedRole = normalizeUserRole(role);

    if (!normalizedRole) {
      return {
        success: false,
        message: "Login failed: unrecognized user role",
      };
    }

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies(
      "better-auth.session_token",
      token,
      24 * 60 * 60
    );
    await setCookie(
      "user",
      JSON.stringify({ ...user, role: normalizedRole }),
      7 * 24 * 60 * 60,
      false,
    );

    // 🔐 Force password change
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    // 🎯 Decide final route
    const targetPath =
      redirectPath &&
      isValidRedirectForRole(redirectPath, normalizedRole)
        ? redirectPath
        : getDefaultDashboardRoute(normalizedRole);

    redirect(targetPath);
  } catch (error: any) {
    // ✅ Ignore Next.js redirect "error"
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // 📩 Email not verified
    const apiMessage =
      error?.response?.data?.message?.toLowerCase?.() ?? "";
    if (
      apiMessage.includes("email not verified") ||
      apiMessage.includes("verify")
    ) {
      redirect(`/verify-email?email=${payload.email}`);
    }

    // ❌ Real error only
    console.error("LOGIN ERROR:", error);

    return {
      success: false,
      message: `Login failed: ${error.message}`,
    };
  }
};