'use client'

import { useState } from 'react'

export default function CaptionInput({ onSubmit }) {
  const [text, setText] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValidTimestamp(startTime) && isValidTimestamp(endTime)) {
      onSubmit({ text, startTime, endTime })
      setText('')
      setStartTime('')
      setEndTime('')
    } else {
      alert('Please enter valid timestamps in the format ss.ms')
    }
  }

  const isValidTimestamp = (time) => {
    return /^\d+(\.\d{1,3})?$/.test(time)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter caption text"
        required
        className="w-full text-black p-2 border rounded shadow-md shadow-[0px_0px_10px_0px_#f6f6f6] focus:shadow-[0px_0px_10px_0px_#99f6e4] focus-within:shadow-[0px_0px_8px_0px_#99f6e4] focus-within:outline-none  focus:otline-none rounded"
      />
      <input
        type="text"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start time (ss.ms)"
        required
        className="w-full text-black p-2 border rounded shadow-md shadow-[0px_0px_10px_0px_#f6f6f6] focus:shadow-[0px_0px_10px_0px_#99f6e4] focus-within:shadow-[0px_0px_8px_0px_#99f6e4] focus-within:outline-none  focus:otline-none rounded"
      />
      <input
        type="text"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End time (ss.ms)"
        required
        className="w-full text-black p-2 border rounded shadow-md shadow-[0px_0px_10px_0px_#f6f6f6] focus:shadow-[0px_0px_10px_0px_#99f6e4] focus-within:shadow-[0px_0px_8px_0px_#99f6e4] focus-within:outline-none  focus:otline-none rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Caption
      </button>
    </form>
  )
}