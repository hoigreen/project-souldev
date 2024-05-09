// import EmployerOnboarding from '@/components/employer/onboarding/employer-onboarding';
import { Metadata } from 'next';
// import requestServer from '@/lib/request-server';
import { getTranslations } from 'next-intl/server';
// import { GetCompanyInfoOnboardingDocument } from '@/lib/graphql/generated/graphql';
// import { GetCurrentUserEmailDocument } from '@/lib/graphql/generated/graphql';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default async function Page() {
  const t = await getTranslations('Index');
  // const { data, error } = await requestServer(GetCompanyInfoOnboardingDocument);
  // const { data: currentUserEmailData, error: currentUserEmailError } =
  //   await requestServer(GetCurrentUserEmailDocument);

  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  // if (currentUserEmailError) {
  //   return <div>{currentUserEmailError.message}</div>;
  // }

  // const { recruiter } = data;

  // if (!recruiter.company) {
  //   return <div className="text-error-400 text-sm">{t('T_0643')}</div>;
  // }
  // const { company } = recruiter;

  return (
    <></>
    // <EmployerOnboarding
    //   companyInfo={company}
    //   currentUserEmail={currentUserEmailData?.currentUser.email || ''}
    // />
  );
}
