'use client';

import { useState } from 'react';
import { HambergerMenu } from 'iconsax-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { LeftSidebar } from '../left-sidebar';

export function MenuMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} direction="left" onOpenChange={setOpen}>
      <DrawerTrigger asChild className="xl:hidden">
        <HambergerMenu variant="TwoTone" size={24} />
      </DrawerTrigger>

      <DrawerContent className="h-screen w-80">
        <LeftSidebar
          className="top-0 max-xl:block"
          onNavItemClick={() => setOpen(!open)}
        />
      </DrawerContent>
    </Drawer>
  );
}
