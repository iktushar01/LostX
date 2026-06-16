"use server";

import { httpClient } from "@/lib/axios/httpClient";

interface ResendPayload {
  email: string;
}

export const resendVerificationOtpAction = async (payload: ResendPayload) => {
  try {
    return await httpClient.post<null>("/auth/resend-verification-otp", payload);
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to resend verification code",
    };
  }
};
