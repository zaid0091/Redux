import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal({
    threshold = 0.12,
    rootMargin = '0px 0px -6% 0px',
    once = true,
    disabled = false,
} = {}) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (disabled || prefersReducedMotion()) {
            setVisible(true)
            return
        }

        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    if (once) observer.unobserve(el)
                } else if (!once) {
                    setVisible(false)
                }
            },
            { threshold, rootMargin },
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, rootMargin, once, disabled])

    return { ref, visible }
}
