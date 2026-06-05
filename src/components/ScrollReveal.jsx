import { useScrollReveal } from '../hooks/useScrollReveal'

const VARIANTS = new Set(['up', 'fade', 'left', 'right', 'scale'])

const ScrollReveal = ({
    children,
    as: Tag = 'div',
    className = '',
    variant = 'up',
    delay = 0,
    once = true,
    threshold,
    rootMargin,
    disabled = false,
    style,
    ...props
}) => {
    const safeVariant = VARIANTS.has(variant) ? variant : 'up'
    const { ref, visible } = useScrollReveal({ once, threshold, rootMargin, disabled })

    const delayClass = delay > 0 && delay <= 8 ? `reveal-delay-${delay}` : ''
    const delayStyle = delay > 8 ? { transitionDelay: `${delay}ms` } : undefined

    return (
        <Tag
            ref={ref}
            className={[
                'reveal',
                `reveal--${safeVariant}`,
                visible ? 'reveal--visible' : '',
                delayClass,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            style={{ ...delayStyle, ...style }}
            {...props}
        >
            {children}
        </Tag>
    )
}

export default ScrollReveal
