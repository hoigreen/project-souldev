import { z } from 'zod';
import { NAME_REGEX } from '../regex';

/* -----------------------------------------------------------------------------
 * Signin Schema
 * -------------------------------------------------------------------------- */

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email address.',
    })
    .min(1)
    .email({
      message: 'Please enter a valid email address.',
    }),
  password: z
    .string({
      required_error: 'Please enter your password.',
    })
    .min(1, 'Please enter your password.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

/* -----------------------------------------------------------------------------
 * Signup Schema
 * -------------------------------------------------------------------------- */

export const signupSchema = z.object({
  first_name: z
    .string({
      required_error: 'Please enter your first name',
    })
    .min(1, 'Please enter your first name')
    .max(128, 'First name is too long')
    .regex(NAME_REGEX, 'Only letters and spaces are allowed'),
  last_name: z
    .string({
      required_error: 'Please enter your last name',
    })
    .min(1, 'Please enter your last name')
    .max(128, 'Last name is too long')
    .regex(NAME_REGEX, 'Only letters and spaces are allowed'),
  email: z
    .string({
      required_error: 'Please enter a valid email address',
    })
    .email('Please enter a valid email address'),
  mobile: z
    .string({
      required_error: 'Phone is required!',
    })
    .min(10, 'Phone number is too short')
    .max(10, 'Phone number cannot be longer than 15 digits'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(32, { message: 'Password must be no more than 32 characters long' }),
  terms: z.boolean().refine((value) => value, {
    message: 'You must agree to the terms of service',
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

/* -----------------------------------------------------------------------------
 * Forget Password Schema
 * -------------------------------------------------------------------------- */

export const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email address.',
    })
    .min(1)
    .email({
      message: 'Please enter a valid email address.',
    }),
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

/* -----------------------------------------------------------------------------
 * Reset Password Schema
 * -------------------------------------------------------------------------- */

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, 'Invalid reset token'),
    password: z
      .string({
        required_error: 'Please enter your password.',
      })
      .min(1, 'Please enter your password.'),
    confirm_password: z
      .string({
        required_error: 'Please confirm your password.',
      })
      .min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

/* -----------------------------------------------------------------------------
 * Change password Schema
 * -------------------------------------------------------------------------- */

export const changePasswordSchema = z
  .object({
    current_password: z
      .string({
        required_error: 'Please enter your password.',
      })
      .min(1, 'Please enter your password.'),
    new_password: z
      .string({
        required_error: 'Please enter your password.',
      })
      .min(1, 'Please enter your password.'),
    confirm_password: z
      .string({
        required_error: 'Please confirm your password.',
      })
      .min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
