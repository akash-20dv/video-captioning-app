'use client'

import { useRef, useEffect, useState } from 'react'

export default function VideoPlayer({ url, captions, currentTime, onTimeUpdate }) {
  const videoRef = useRef(null)
  const [videoKey, setVideoKey] = useState(0)

  useEffect(() => {
    // Force re-render of video element when URL changes
    setVideoKey(prevKey => prevKey + 1)
  }, [url])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleTimeUpdate = () => {
        onTimeUpdate(video.currentTime)
      }
      video.addEventListener('timeupdate', handleTimeUpdate)
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [onTimeUpdate])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && videoRef.current) {
        e.preventDefault()
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const currentCaption = captions.find(
    caption => currentTime >= parseFloat(caption.startTime) && currentTime <= parseFloat(caption.endTime)
  )

  return (
    <div className="relative ">
      {url ? (
        <video 
          key={videoKey}
          ref={videoRef} 
          controls 
          className="w-full rounded-md"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-72 bg-[#333] drop-shadow-lg shadow-[#f6f6f661] opacity-90 rounded flex items-center justify-center">
          <p>Enter a video URL to load a video</p>
        </div>
      )}
      {currentCaption && (
        <div className="absolute bottom-8 left-0 right-0 text-center text-white text-shadow">
          <div>{currentCaption.text}</div>
        </div>
      )}
    </div>
  )
}