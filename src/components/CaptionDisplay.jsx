'use client'

import { useState } from 'react'

export default function CaptionDisplay({ captions, onEdit, onDelete, currentTime }) {
  const [editIndex, setEditIndex] = useState(null)

  const handleEdit = (index) => {
    setEditIndex(index)
  }

  const handleSave = (index, updatedCaption) => {
    onEdit(index, updatedCaption)
    setEditIndex(null)
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Captions:</h2>
      <ul className="space-y-4">
        {captions.map((caption, index) => (
          <li
            key={index}
            className={`p-4 bg-gray-100 text-black rounded ${
              currentTime >= parseFloat(caption.startTime) && currentTime <= parseFloat(caption.endTime)
                ? 'bg-blue-100'
                : ''
            }`}
          >
            {editIndex === index ? (
              <CaptionEditForm
                caption={caption}
                onSave={(updatedCaption) => handleSave(index, updatedCaption)}
                onCancel={() => setEditIndex(null)}
              />
            ) : (
              <>
                <p>{caption.text}</p>
                <p className="text-sm text-gray-600">
                  ({caption.startTime} - {caption.endTime})
                </p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CaptionEditForm({ caption, onSave, onCancel }) {
  const [text, setText] = useState(caption.text)
  const [startTime, setStartTime] = useState(caption.startTime)
  const [endTime, setEndTime] = useState(caption.endTime)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ text, startTime, endTime })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 border rounded "
      />
      <input
        type="text"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <div className="space-x-2">
        <button type="submit" className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}