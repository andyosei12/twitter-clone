import { useState, useRef } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'
import Image from 'next/image'

type TweetBoxProps = {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: TweetBoxProps) {
  const [input, setInput] = useState<string>('')
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<Boolean>(false)
  const [image, setImage] = useState<string>('')

  const imageInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch('/api/addTweet', {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    })

    const json = await result.json()
    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted', {
      icon: '🚀',
    })

    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <div className="mt-4">
        <Image
          width="56px"
          height="56px"
          className="rounded-full object-cover"
          src={session?.user?.image || 'https://links.papareact.com/gll'}
          alt="profile image"
        />
      </div>
      {/* <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt="profile image"
      /> */}
      <div className="flex flex-1 items-center pl-2">
        <form action="" className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="">
            <div className="flex items-center">
              <div className="flex flex-1 space-x-2 text-twitter">
                <PhotographIcon
                  onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
                <SearchCircleIcon className="h-5 w-5" />
                <EmojiHappyIcon className="h-5 w-5" />
                <CalendarIcon className="h-5 w-5" />
                <LocationMarkerIcon className="h-5 w-5" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input || !session}
                className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              >
                Tweet
              </button>
            </div>

            {imageUrlBoxIsOpen && (
              <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                <input
                  ref={imageInputRef}
                  className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Image Url"
                />
                <button
                  type="submit"
                  onClick={addImageToTweet}
                  className="font-bold text-white"
                >
                  Add Image
                </button>
              </form>
            )}
          </div>

          {image && (
            <div className="mt-10">
              <Image
                height="160px"
                width="400px"
                src={image}
                className="rounded-xl object-contain shadow-lg"
                alt="Tweet image"
              />
            </div>
            // <img
            //   className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            //   src={image}
            // />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
