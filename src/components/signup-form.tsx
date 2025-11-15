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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
  })
  .required();

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            {...register('firstName')}
            id="first-name"
            type="text"
            placeholder="John"
            className={cn(
              'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-6 focus-visible:ring-1'
            )}
          />
        </Field>
        <FieldError className="text-red">
          {errors.firstName && errors.firstName.message}
        </FieldError>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            {...register('lastName')}
            id="last-name"
            type="text"
            placeholder="Doe"
            className={cn(
              'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-6 focus-visible:ring-1'
            )}
          />
        </Field>
        <FieldError className="text-red">
          {errors.lastName && errors.lastName.message}
        </FieldError>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            className={cn(
              'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-6 focus-visible:ring-1'
            )}
          />
        </Field>
        <FieldError className="text-red">
          {errors.email && errors.email.message}
        </FieldError>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
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
          <FieldLabel htmlFor="confirm-password"> Confirm Password</FieldLabel>
          <div className="relative">
            <Input
              {...register('confirmPassword')}
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              className={cn(
                'border-meduim-gray focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-6 focus-visible:ring-1'
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Field>
        <FieldError className="text-red">
          {errors.confirmPassword && errors.confirmPassword.message}
        </FieldError>
        <Field>
          <Button
            type="submit"
            className="dark:text-very-light-purple text-white"
          >
            Sign Up
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already have an account?
            <Link to="/login" className="mx-1 underline underline-offset-4">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
