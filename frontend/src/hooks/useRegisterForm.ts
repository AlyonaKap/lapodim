import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "@/api/services/auth";
import { getAuthIntentMessage, LOGIN_ROUTE } from "@/constants/auth";
import type { RegisterCredentials } from "@/types/auth";
import { getAuthErrorFields } from "@/utils/authErrors";
import { getAuthRouteState } from "@/utils/authRouteState";
import { validateSequentialFields } from "@/utils/sequentialValidation";
import { useAuth } from "@/hooks/useAuth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9()\-\s]{10,20}$/;
const FIRST_STEP_FIELDS: Array<keyof RegisterCredentials> = [
  "name",
  "surname",
  "phone",
];
const SECOND_STEP_FIELDS: Array<keyof RegisterCredentials> = [
  "email",
  "password",
];
const REGISTER_STEPS_COUNT = 2;

export function useRegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken, setUser } = useAuth();
  const routeState = getAuthRouteState(location.state);
  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<RegisterCredentials>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ access, user }) => {
      setAccessToken(access);
      setUser(user);
      navigate(routeState.from ?? "/profile", { replace: true });
    },
  });

  const handleClose = (): void => {
    navigate(routeState.from ?? "/", { replace: true });
  };

  const handleNavigateToLogin = (): void => {
    navigate(LOGIN_ROUTE, { state: routeState });
  };

  const handleTogglePasswordVisibility = (): void => {
    setIsPasswordVisible((currentValue) => !currentValue);
  };

  const handlePreviousStep = (): void => {
    setFormError("");
    setCurrentStep(1);
  };

  const handleNextStep = async (): Promise<boolean> => {
    setFormError("");
    form.clearErrors(FIRST_STEP_FIELDS);

    const isValid = await validateSequentialFields(
      form.trigger,
      FIRST_STEP_FIELDS,
    );

    if (isValid) {
      setCurrentStep(2);
    }

    return isValid;
  };

  const submitRegister = async (): Promise<void> => {
    form.clearErrors(SECOND_STEP_FIELDS);

    const isValid = await validateSequentialFields(
      form.trigger,
      SECOND_STEP_FIELDS,
    );

    if (!isValid) {
      return;
    }

    try {
      await registerMutation.mutateAsync(form.getValues());
    } catch (error) {
      const authErrors = getAuthErrorFields(error);

      if (authErrors.name) {
        setCurrentStep(1);
        form.setError("name", { type: "server", message: authErrors.name });
      }

      if (authErrors.surname) {
        setCurrentStep(1);
        form.setError("surname", {
          type: "server",
          message: authErrors.surname,
        });
      }

      if (authErrors.phone) {
        setCurrentStep(1);
        form.setError("phone", {
          type: "server",
          message: authErrors.phone,
        });
      }

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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setFormError("");

    if (currentStep === 1) {
      await handleNextStep();
      return;
    }

    await submitRegister();
  };

  const firstStepError =
    form.formState.errors.name?.message ||
    form.formState.errors.surname?.message ||
    form.formState.errors.phone?.message;
  const secondStepError =
    form.formState.errors.email?.message ||
    form.formState.errors.password?.message;
  const errorMessage =
    formError || (currentStep === 1 ? firstStepError : secondStepError);

  return {
    currentStep,
    errorMessage,
    errors: form.formState.errors,
    formError,
    isPasswordVisible,
    isSubmitting: registerMutation.isPending,
    subtitle: `${getAuthIntentMessage(routeState.intent)} або створіть новий акаунт`,
    totalSteps: REGISTER_STEPS_COUNT,
    register: form.register,
    handleClose,
    handleNavigateToLogin,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    handleTogglePasswordVisibility,
    nameValidation: {
      required: "Введіть ім'я",
    },
    surnameValidation: {
      required: "Введіть прізвище",
    },
    emailValidation: {
      required: "Введіть електронну пошту",
      pattern: {
        value: EMAIL_PATTERN,
        message: "Введіть коректну електронну пошту",
      },
    },
    phoneValidation: {
      validate: (value: string) =>
        value.trim() === "" ||
        PHONE_PATTERN.test(value) ||
        "Введіть коректний номер телефону",
    },
    passwordValidation: {
      required: "Введіть пароль",
      minLength: {
        value: 8,
        message: "Пароль має містити щонайменше 8 символів",
      },
    },
  };
}
