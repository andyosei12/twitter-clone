import React from 'react'
import TimeAgo from 'react-timeago'
import { Tweet } from '../typings'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="profile image"
        />
        <div className="">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="text-gray hidden text-sm sm:inline">
              @{tweet.username.replaceAll(' ', '').toLowerCase()}
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet image"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex space-x-5">
        <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
          <ChatAlt2Icon className="h-5 w-5" />
          <p>5</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

export default Tweet
