// import { SectionContainer } from '@/components/onboarding/container/section-container';
// import { Logo } from '@/components/ui/logo/logo';
// import { useTranslations } from 'next-intl';
// import { Link } from '@/navigation';
// import type { FC } from 'react';

// export const EmployerOnboardingWelcome: FC = () => {
//   const t = useTranslations('Index');

//   return (
//     <SectionContainer
//       noPadding
//       gridClassName="grid-cols-1 lg:grid-cols-[1fr_400px]"
//     >
//       <div className="order-last grid place-items-center p-7.5 lg:order-first">
//         <div className="px-4 md:py-10 lg:py-16">
//           <h1 className="text-3xl font-bold text-neutral-800">{t('T_0192')}</h1>

//           <p className="mt-5 text-sm text-neutral-500">{t('T_0223')}</p>

//           <h2 className="mt-10 text-lg font-bold text-neutral-800">
//             {t('T_0194')}
//           </h2>

//           <p className="mt-5 text-sm text-neutral-500">{t('T_0224')}</p>
//         </div>
//       </div>

//       <div className="order-first h-full overflow-hidden rounded-t-3xl lg:order-last lg:rounded-r-3xl lg:rounded-tl-none">
//         <div className="bg-primary-500 relative flex h-full flex-col gap-5 p-8">
//           <div className="absolute inset-0 bg-[url('/img/hero-3-pattern.svg')] bg-center opacity-20"></div>
//           <Logo className="z-10 text-white" href="/" />
//           <div className="z-10 flex-grow text-2xl font-bold leading-none text-white lg:mt-12 lg:text-5xl">
//             {t('T_0225')}
//           </div>
//           <Link
//             href="/company/profile"
//             className="z-10 w-full rounded-xl bg-white py-3.5 text-center font-bold text-neutral-800"
//           >
//             {t('T_0226')}
//           </Link>
//         </div>
//       </div>
//     </SectionContainer>
//   );
// };
