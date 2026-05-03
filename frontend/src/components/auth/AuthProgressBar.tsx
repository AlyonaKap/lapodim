type AuthProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function AuthProgressBar({
  currentStep,
  totalSteps,
}: AuthProgressBarProps) {
  const progress = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-light-yellow"
      aria-label={`Крок ${currentStep} з ${totalSteps}`}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
    >
      <div
        className="h-full rounded-full bg-foreground transition-[width] duration-300"
        style={{ width: progress }}
      />
    </div>
  );
}
