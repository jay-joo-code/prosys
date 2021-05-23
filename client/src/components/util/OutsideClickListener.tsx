import React, { useEffect, useRef } from 'react'

const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement>, onOutsideClick: () => void, isListening: boolean) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target) && event.target.tagName.toLowerCase() !== 'button') {
      onOutsideClick()
    } else {
      return false
    }
  }

  useEffect(() => {
    if (isListening) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutsideClick, isListening])
}

interface OutsideClickListenerProps {
  onOutsideClick: () => void
  children: React.ReactNode
  isListening: boolean
}

const OutsideClickListener = ({ onOutsideClick, children, isListening }: OutsideClickListenerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideAlerter(ref, onOutsideClick, isListening)

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default OutsideClickListener
