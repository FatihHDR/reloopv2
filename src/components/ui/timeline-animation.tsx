'use client'

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, type RefObject, type ElementType } from "react"
import { cn } from "@/lib/utils"

interface TimelineContentProps {
    children: React.ReactNode
    animationNum: number
    timelineRef?: RefObject<HTMLElement | null>
    customVariants?: Variants
    className?: string
    as?: ElementType
    [key: string]: any
}

export function TimelineContent({
    children,
    animationNum,
    timelineRef,
    customVariants,
    className,
    as: Component = "div",
    ...props
}: TimelineContentProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
    })

    const defaultVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
        },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    }

    const variants = customVariants || defaultVariants

    const MotionComponent = motion(Component)

    return (
        <MotionComponent
            ref={ref}
            custom={animationNum}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={cn(className)}
            {...props}
        >
            {children}
        </MotionComponent>
    )
}
