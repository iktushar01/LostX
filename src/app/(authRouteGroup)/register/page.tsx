import RegisterForm from "@/components/modules/auth/RegisterForm";

export const maxDuration = 60;

/**
 * LostX Auth Page
 * This server component unwraps searchParams and passes the 
 * redirect destination to the Client-side LoginForm.
 */
const RegisterPage = async () => {

  return (
    <div className="relative min-h-screen w-full">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;