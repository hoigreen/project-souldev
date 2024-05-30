import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import BasicInfoCard from '@/components/app/people/basic-info-card';
import BioCard from '@/components/app/people/bio-card';
import SkillCard from '@/components/app/people/skills-card';
import { ProfileCardLoadingSkeleton } from '@/components/app/post/loading';
import { getProfileById } from '@/lib/actions/profile';
import getSession from '@/lib/get-session';
import { getFullName } from '@/lib/utils';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

interface PageProps {
  params: {
    locale: string;
    userId: string;
  };
}

export default async function Page({ params: { locale, userId } }: PageProps) {
  unstableSetRequestLocale(locale);

  const session = await getSession();

  if (!session) {
    return redirect('/auth/sign-in');
  }

  const response = await getProfileById({ userId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.PageNotFound} />;
  }

  if (session.user._id === response.data.user_id._id) {
    return redirect('/profile');
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <Suspense fallback={<ProfileCardLoadingSkeleton />}>
        <BasicInfoCard profile={response.data} />

        {/* Bio & Skill */}
        <div className="space-y-4 md:flex md:justify-between md:gap-4 md:space-y-0">
          <BioCard bio={response.data.user_id.bio} />
          <SkillCard skills={response.data.skills} />
        </div>

        {/* Education */}

        {/* Experience */}

        {/* Posts */}
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params: { userId },
}: PageProps): Promise<Metadata> {
  const response = await getProfileById({ userId });

  if (!response.success) {
    return {
      title: 'User not found',
    };
  }

  return {
    title: getFullName(
      response.data.user_id.first_name,
      response.data.user_id.last_name,
    ),
  };
}
