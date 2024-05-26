import { z } from 'zod';

export const addressSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  ward: z.string().min(1, 'Ward is required'),
});

export type AddressSchema = z.infer<typeof addressSchema>;

export const defaultAddress: AddressSchema = {
  location: '',
  city: '',
  district: '',
  ward: '',
};
