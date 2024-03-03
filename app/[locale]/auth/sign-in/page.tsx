import { getTranslations } from 'next-intl/server';
import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@codefixlabs/ui';
import { LoginForm } from '@/components/auth/login/login-form';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M_1'),
  };
}

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardDescription>Descriotion</CardDescription>
      <CardBody>
        <LoginForm />
      </CardBody>
      <CardFooter>
        <Button>123</Button>
      </CardFooter>
    </Card>
  );
}
