import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type FormData = {
  email: string;
  password: string;
};

const FormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6')}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Welcome back!
          </h1>
          <p className="text-sm text-balance text-black dark:text-white">
            Login with your details
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-black dark:text-white">
            Email
          </FieldLabel>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="m@example.com"
            className={cn(
              'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 placeholder:text-meduim-gray flex flex-col gap-6 focus-visible:ring-1'
            )}
          />
        </Field>
        <FieldError className="text-red">
          {errors.email && errors.email.message}
        </FieldError>
        <Field>
          <div className="flex items-center">
            <FieldLabel
              htmlFor="password"
              className="text-black dark:text-white"
            >
              Password
            </FieldLabel>
            <Link
              to="/login"
              className="ml-auto text-sm text-black underline-offset-4 hover:underline dark:text-white"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={cn(
                'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-6 focus-visible:ring-1'
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Field>
        <FieldError className="text-red">
          {errors.password && errors.password.message}
        </FieldError>
        <Field>
          <Button type="submit" className="text-white">
            Login
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center text-black dark:text-white">
            Don&apos;t have an account?
            <Link to="/signup" className="mx-1 underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
