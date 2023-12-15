import { useForm, UseFormReturn, SubmitHandler } from "react-hook-form";

type FormProps<TFormValues extends Record<string, any>> = {
  onSubmit: SubmitHandler<TFormValues>;
  className?: string;
  children: (
    methods: UseFormReturn<TFormValues>
  ) => React.ReactNode | React.ReactNode[];
};

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
};

export default Form;
