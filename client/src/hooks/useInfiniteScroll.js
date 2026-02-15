import { useState, useEffect, useRef, useCallback } from "react"

export function useInfiniteScroll(items, initialCount = 5, increment = 5) {
  const [displayCount, setDisplayCount] = useState(initialCount)
  const loaderRef = useRef(null)

  const displayedItems = items.slice(0, displayCount)
  const hasMore = displayCount < items.length

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount(prev => Math.min(prev + increment, items.length))
    }
  }, [hasMore, increment, items.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore, hasMore])

  useEffect(() => {
    setDisplayCount(initialCount)
  }, [items.length, initialCount])

  return { displayedItems, hasMore, loaderRef }
}
