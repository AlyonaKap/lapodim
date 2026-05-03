import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/auth/AuthField";
import { AuthErrorSpace } from "@/components/auth/AuthErrorSpace";
import { AuthScreenShell } from "@/components/auth/AuthScreenShell";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function Login() {
  const {
    emailValidation,
    errorMessage,
    errors,
    handleClose,
    handleNavigateToRegister,
    handleSubmit,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    isSubmitting,
    passwordValidation,
    register,
    subtitle,
  } = useLoginForm();

  return (
    <AuthScreenShell
      title='Притулок "Лаподім"'
      subtitle={subtitle}
      onClose={handleClose}
      footer={
        <p className="mt-3">
          У вас ще немає акаунта?{" "}
          <button
            type="button"
            onClick={handleNavigateToRegister}
            className="text-dark-blue underline decoration-dark-blue/60 underline-offset-2 cursor-pointer"
          >
            Зареєструватися
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          type="text"
          inputMode="email"
          label="Електронна пошта"
          placeholder="hello@lapodim.com"
          registration={register("email", emailValidation)}
          error={errors.email?.message}
          autoComplete="email"
        />

        <AuthField
          type={isPasswordVisible ? "text" : "password"}
          label="Пароль"
          placeholder="Введіть пароль"
          registration={register("password", passwordValidation)}
          error={errors.password?.message}
          autoComplete="current-password"
          trailingAction={
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="shrink-0 rounded-full px-3 py-1 text-[14px] text-dark-blue transition hover:bg-primary/60"
            >
              {isPasswordVisible ? "Сховати" : "Показати"}
            </button>
          }
        />

        <AuthErrorSpace message={errorMessage} />

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          disabled={isSubmitting}
          className="mt-0 w-full justify-center bg-foreground text-[20px] text-light-yellow shadow-lg"
        >
          {isSubmitting ? "Входимо" : "Увійти"}
        </Button>
      </form>
    </AuthScreenShell>
  );
}
