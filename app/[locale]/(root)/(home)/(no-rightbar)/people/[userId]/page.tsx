import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import BasicInfoCard from '@/components/people/basic-info-card';
import BioCard from '@/components/people/bio-card';
import EducationCard from '@/components/people/education-card';
import ExperienceCard from '@/components/people/experience-card';
import SkillCard from '@/components/people/skills-card';
import { ProfileCardLoadingSkeleton } from '@/components/post/loading';
import PeoplesPost from '@/components/post/people-posts';
import { getPostsByUserId } from '@/lib/actions/post';
import {
  getMyFollowings,
  getMyFriendsList,
  getProfileById,
} from '@/lib/actions/profile';
import { UserBasic } from '@/lib/definitions';
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

  const [
    profileResponse,
    postsResponse,
    myFollowingsResponse,
    myFriendsReponse,
  ] = await Promise.all([
    getProfileById({ userId }),
    getPostsByUserId({ userId }),
    getMyFollowings(),
    getMyFriendsList(),
  ]);

  if (!profileResponse.success) {
    return <ErrorStage stage={ErrorStageType.PageNotFound} />;
  }

  if (!postsResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  if (!myFollowingsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!myFriendsReponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const myFollowings: UserBasic[] = myFollowingsResponse.listFollowingUser.map(
    (item) => item.user_id,
  );

  const myFriends: UserBasic[] = myFriendsReponse.listFriend.map(
    (item) => item.user_id,
  );

  const posts = postsResponse.data;

  if (session.user._id === profileResponse.data.user_id._id) {
    return redirect('/profile');
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <Suspense fallback={<ProfileCardLoadingSkeleton />}>
        <BasicInfoCard
          profile={profileResponse.data}
          myFollowings={myFollowings}
          myFriends={myFriends}
        />

        {/* Bio & Skill */}
        <div className="space-y-4 md:flex md:justify-between md:gap-4 md:space-y-0">
          <BioCard bio={profileResponse.data.user_id.bio} />
          <SkillCard skills={profileResponse.data.skills} />
        </div>

        {/* Education */}
        <EducationCard education={profileResponse.data.education} />

        {/* Experience */}
        <ExperienceCard experience={profileResponse.data.experience} />

        {/* Posts */}
        <PeoplesPost posts={posts} currentUserId={session.user._id} />
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
