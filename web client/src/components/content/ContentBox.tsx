import React, { ReactNode } from 'react'
import './ContentBox.scss'

interface ContentBoxProps {
  title: string
  children: ReactNode
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, children }) => {
  return (
    <div className="content-box">
      <h1 className="content-box__title">{title}</h1>
      <div className="content-box__content">{children}</div>
    </div>
  )
}

export default ContentBox
