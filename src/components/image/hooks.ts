/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2022-05-14 02:36:01
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-14 02:50:19
 */
import React from 'react'
export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
}: {
  target: React.Ref<HTMLElement>
  onIntersect: (entries: IntersectionObserverEntry[]) => void
  threshold?: number
  rootMargin?: string
}) => {
  console.log('useIntersectionObserver')
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    })
    const current = target?.current
    observer.observe(current)
    return () => {
      observer.unobserve(current)
    }
  })
}
