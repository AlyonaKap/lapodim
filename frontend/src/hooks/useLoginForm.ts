import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/services/auth";
import { getAuthIntentMessage, REGISTER_ROUTE } from "@/constants/auth";
import type { LoginCredentials } from "@/types/auth";
import { getAuthErrorFields } from "@/utils/authErrors";
import { getAuthRouteState } from "@/utils/authRouteState";
import { validateSequentialFields } from "@/utils/sequentialValidation";
import { useAuth } from "@/hooks/useAuth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, setUser } = useAuth();
  const routeState = getAuthRouteState(location.state);
  const [formError, setFormError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ access, user }) => {
      setAccessToken(access);
      setUser(user);
      navigate(routeState.from ?? "/profile", { replace: true });
    },
  });

  const handleClose = (): void => {
    navigate(routeState.from ?? "/", { replace: true });
  };

  const handleNavigateToRegister = (): void => {
    navigate(REGISTER_ROUTE, { state: routeState });
  };

  const handleTogglePasswordVisibility = (): void => {
    setIsPasswordVisible((currentValue) => !currentValue);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setFormError("");
    form.clearErrors();

    const isValid = await validateSequentialFields(form.trigger, [
      "email",
      "password",
    ]);

    if (!isValid) {
      return;
    }

    try {
      await loginMutation.mutateAsync(form.getValues());
    } catch (error) {
      const authErrors = getAuthErrorFields(error);

      if (authErrors.email) {
        form.setError("email", {
          type: "server",
          message: authErrors.email,
        });
      }

      if (authErrors.password) {
        form.setError("password", {
          type: "server",
          message: authErrors.password,
        });
      }

      if (authErrors.form) {
        setFormError(authErrors.form);
      }
    }
  };

  const errorMessage =
    formError ||
    form.formState.errors.email?.message ||
    form.formState.errors.password?.message;

  return {
    errorMessage,
    errors: form.formState.errors,
    formError,
    isPasswordVisible,
    isSubmitting: loginMutation.isPending,
    routeState,
    subtitle: getAuthIntentMessage(routeState.intent),
    register: form.register,
    handleClose,
    handleNavigateToRegister,
    handleSubmit,
    handleTogglePasswordVisibility,
    emailValidation: {
      required: "Введіть електронну пошту",
      pattern: {
        value: EMAIL_PATTERN,
        message: "Введіть коректну електронну пошту",
      },
    },
    passwordValidation: {
      required: "Введіть пароль",
    },
  };
}
