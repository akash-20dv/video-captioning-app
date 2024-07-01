'use client'

export default function CaptionExport({ captions }) {
  const exportSRT = () => {
    let srtContent = ''
    captions.forEach((caption, index) => {
      srtContent += `${index + 1}\n`
      srtContent += `${formatTime(caption.startTime)} --> ${formatTime(caption.endTime)}\n`
      srtContent += `${caption.text}\n\n`
    })
    downloadFile(srtContent, 'captions.srt', 'text/plain')
  }

  const exportVTT = () => {
    let vttContent = 'WEBVTT\n\n'
    captions.forEach((caption) => {
      vttContent += `${formatTime(caption.startTime)} --> ${formatTime(caption.endTime)}\n`
      vttContent += `${caption.text}\n\n`
    })
    downloadFile(vttContent, 'captions.vtt', 'text/vtt')
  }

  const formatTime = (seconds) => {
    const date = new Date(parseFloat(seconds) * 1000)
    return date.toISOString().substr(11, 12)
  }

  const downloadFile = (content, fileName, fileType) => {
    const blob = new Blob([content], { type: fileType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  return (
    <div className="mt-6 space-x-4">
      <button onClick={exportSRT} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Export SRT
      </button>
      <button onClick={exportVTT} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Export VTT
      </button>
    </div>
  )
}