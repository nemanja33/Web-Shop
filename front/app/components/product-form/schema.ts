import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),
  category: z
    .string()
    .min(1, 'Category is required'),
  description: z
    .string()
    .min(1, 'Description is required'),
  price: z
    .number()
    .positive('Price must be a positive number'),
  features: z
    .array(z
      .string()
    )
    .optional(),
  imageUrl: z
    .any(),
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // ),
  imageAlt: z
    .string()
    .min(1, 'Image alt text is required')
})