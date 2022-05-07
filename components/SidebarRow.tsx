import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
}

function SidebarRow({ Icon, title }: Props) {
  return (
    <div className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full py-3 px-4 transition-all duration-200 hover:bg-gray-100">
      <Icon className="m6 w-6" />
      <p className="group-hover:text-twitter">{title}</p>
    </div>
  )
}

export default SidebarRow
