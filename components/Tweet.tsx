import React, { useEffect, useState, useCallback } from 'react'
import TimeAgo from 'react-timeago'
import { Comment, CommentBody, Tweet } from '../typings'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<Boolean>(false)
  const [input, setInput] = useState<string>('')
  const { data: session } = useSession()

  const refreshComments = useCallback(async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }, [tweet._id])

  useEffect(() => {
    refreshComments()
  }, [refreshComments])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting comment...')
    const commentBody: CommentBody = {
      comment: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      tweetId: tweet._id,
    }

    const result = await fetch('/api/addComment', {
      body: JSON.stringify(commentBody),
      method: 'POST',
    })

    // const json = await result.json()
    toast.success('Comment Posted', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
    // return json
  }

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <div className="items-start">
          <Image
            width="40px"
            height="40px"
            src={tweet.profileImg}
            alt="profile image"
            className="rounded-full"
          />
        </div>
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
            <div className="m-5 ml-0 mb-1">
              <Image
                width="400px"
                height="240px"
                src={tweet.image}
                alt="tweet image"
                className="rounded-lg object-cover shadow-sm"
              />
              {/* <img
                className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
                src={tweet.image}
                alt="tweet image"
              /> */}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex space-x-5">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-2 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
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

      {/* Comment box logic */}
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment"
          />
          <button
            type="submit"
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <div>
                <Image
                  width="28px"
                  height="28px"
                  src={comment.profileImg}
                  className="rounded-full"
                  alt="profile image"
                />
              </div>
              {/* <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt="profile image"
              /> */}

              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replaceAll(' ', '').toLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
