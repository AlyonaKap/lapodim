import { AuthField } from "@/components/auth/AuthField";
import { AuthErrorSpace } from "@/components/auth/AuthErrorSpace";
import { AuthProgressBar } from "@/components/auth/AuthProgressBar";
import { AuthScreenShell } from "@/components/auth/AuthScreenShell";
import { Button } from "@/components/ui/Button";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function Register() {
  const {
    currentStep,
    emailValidation,
    errorMessage,
    errors,
    handleClose,
    handleNavigateToLogin,
    handlePreviousStep,
    handleSubmit,
    handleTogglePasswordVisibility,
    isPasswordVisible,
    isSubmitting,
    nameValidation,
    passwordValidation,
    phoneValidation,
    register,
    surnameValidation,
    totalSteps,
  } = useRegisterForm();

  return (
    <AuthScreenShell
      title='Притулок "Лаподім"'
      subtitle='Створіть акаунт, щоб розпочати допомогати тваринкам'
      onClose={handleClose}
      footer={
        <p className="mt-3">
          Уже маєте акаунт?{" "}
          <button
            type="button"
            onClick={handleNavigateToLogin}
            className="text-dark-blue underline decoration-dark-blue/60 underline-offset-2 cursor-pointer"
          >
            Увійти
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        <div className="mb-5">
          <AuthProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {currentStep === 1 ? (
          <>
            <AuthField
              key="register-name"
              type="text"
              label="Ім'я"
              placeholder="Ваше ім'я"
              registration={register("name", nameValidation)}
              error={errors.name?.message}
              autoComplete="given-name"
            />

            <AuthField
              key="register-surname"
              type="text"
              label="Прізвище"
              placeholder="Ваше прізвище"
              registration={register("surname", surnameValidation)}
              error={errors.surname?.message}
              autoComplete="family-name"
            />

            <AuthField
              key="register-phone"
              type="tel"
              label="Телефон"
              placeholder="+380..."
              registration={register("phone", phoneValidation)}
              error={errors.phone?.message}
              autoComplete="tel"
            />
          </>
        ) : (
          <>
            <AuthField
              key="register-email"
              type="text"
              inputMode="email"
              label="Електронна пошта"
              placeholder="hello@lapodim.com"
              registration={register("email", emailValidation)}
              error={errors.email?.message}
              autoComplete="email"
            />

            <AuthField
              key="register-password"
              type={isPasswordVisible ? "text" : "password"}
              label="Пароль"
              placeholder="Створіть пароль"
              registration={register("password", passwordValidation)}
              error={errors.password?.message}
              autoComplete="new-password"
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
          </>
        )}

        <AuthErrorSpace message={errorMessage} />

        <div className="flex gap-3">
          {currentStep === 2 ? (
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handlePreviousStep}
              disabled={isSubmitting}
              className="flex-1 justify-center bg-light-yellow text-[18px]"
            >
              Назад
            </Button>
          ) : null}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            disabled={isSubmitting}
            className="flex-1 justify-center bg-foreground text-[20px] text-light-yellow shadow-lg"
          >
            {currentStep === 1
              ? "Далі"
              : isSubmitting
                ? "Створюємо"
                : "Зареєструватися"}
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  );
}
