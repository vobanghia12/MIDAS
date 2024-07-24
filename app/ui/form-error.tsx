import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className=" 00 flex items-center gap-x-2 rounded-md p-3 text-sm text-red-500">
      <ExclamationTriangleIcon className="h4 w-4" />
      <p>{message}</p>
    </div>
  );
};
