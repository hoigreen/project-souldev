export type SignupBody = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  terms: boolean;
  image?: string;
};
