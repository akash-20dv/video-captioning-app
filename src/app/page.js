'use client'

import { useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import CaptionInput from '@/components/CaptionInput'
import CaptionDisplay from '@/components/CaptionDisplay'
import CaptionExport from '@/components/CaptionExport'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [captions, setCaptions] = useState([])
  const [currentTime, setCurrentTime] = useState(0)

  const handleVideoUrlSubmit = (url) => {
    const trimmedUrl = url.trim()
    if (isValidUrl(trimmedUrl)) {
      setVideoUrl(trimmedUrl)
    } 
  }
  const handleCaptionSubmit = (caption) => {
    setCaptions([...captions, caption])
  }

  const handleCaptionEdit = (index, updatedCaption) => {
    const newCaptions = [...captions]
    newCaptions[index] = updatedCaption
    setCaptions(newCaptions)
  }

  const handleCaptionDelete = (index) => {
    const newCaptions = captions.filter((_, i) => i !== index)
    setCaptions(newCaptions)
  }

  const handleTimeUpdate = (time) => {
    setCurrentTime(time)
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  return (<>
    <h1 className="text-5xl text-center font-bold my-[5%]">Video Caption App</h1>
    <main className="container card-layout  rounded-lg my-[5%] mx-auto px-8 py-10">
     
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter video URL"
          onChange={(e) => handleVideoUrlSubmit(e.target.value)}
          className="w-full text-black p-2 shadow-md shadow-[0px_0px_10px_0px_#f6f6f6] focus:shadow-[0px_0px_10px_0px_#99f6e4] focus-within:shadow-[0px_0px_8px_0px_#99f6e4] focus-within:outline-none  focus:otline-none rounded"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <VideoPlayer
            url={videoUrl}
            captions={captions}
            currentTime={currentTime}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        <div>
          <CaptionInput onSubmit={handleCaptionSubmit} />
          <CaptionDisplay
            captions={captions}
            onEdit={handleCaptionEdit}
            onDelete={handleCaptionDelete}
            currentTime={currentTime}
          />
          <CaptionExport captions={captions} />
        </div>
      </div>
    </main>
    </>
  )
}