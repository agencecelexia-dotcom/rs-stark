'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`
      requestAnimationFrame(animate)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        cursor.style.width = '60px'
        cursor.style.height = '60px'
        cursor.style.borderColor = '#C9A84C'
        cursor.style.backgroundColor = 'rgba(201,168,76,0.1)'
      }
    }
    const onMouseOut = () => {
      cursor.style.width = '40px'
      cursor.style.height = '40px'
      cursor.style.borderColor = 'rgba(201,168,76,0.6)'
      cursor.style.backgroundColor = 'transparent'
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)
    animate()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border transition-all duration-200"
        style={{
          width: 40,
          height: 40,
          borderColor: 'rgba(201,168,76,0.6)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{ width: 8, height: 8, backgroundColor: '#C9A84C' }}
      />
    </>
  )
}
