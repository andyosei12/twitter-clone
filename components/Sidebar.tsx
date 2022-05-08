import React from 'react'
import Image from 'next/image'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

export default function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        src="https://links.papareact.com/drq"
        alt="twitter icon"
        className="m-3 h-10 w-10"
      />

      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}
