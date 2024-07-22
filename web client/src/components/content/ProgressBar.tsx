import React from 'react'
import './ProgressBar.scss'

interface ProgressBarProps {
  uploadPercentage?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ uploadPercentage }) => {
  return (
    <div className="progress-bar">
      {uploadPercentage != undefined && <p>{uploadPercentage}%</p>}
      <progress></progress>
    </div>
  )
}

export default ProgressBar
