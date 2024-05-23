import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Message, ProblemDetails } from "@/types";
import { AlertCircle } from "lucide-react";
import { FC } from "react";

interface FormAlertProps {
  isError?: boolean;
  error?: ProblemDetails;
  isSuccess?: boolean;
  success?: Message;
}

const FormAlert: FC<FormAlertProps> = ({
  isError,
  error,
  isSuccess,
  success,
}) => {
  if (isError) {
    return (
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{error?.title}</AlertTitle>
        <AlertDescription>{error?.detail}</AlertDescription>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert variant="success">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{success?.title}</AlertTitle>
        <AlertDescription>{success?.details}</AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default FormAlert;
