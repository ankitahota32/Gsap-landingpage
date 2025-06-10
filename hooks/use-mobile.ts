"use client"

import { usestate, useEffect } from "react"

export function useMobile(breakpoint = 786): boolean {
    const [isMobile, setIsMobile] = usestate(false)

    useEffect(() => {
        if (typeof window === "undefined") return 

        const checkSize()

        window.addEventListener("resize", checkSize)

        return () => window.removeEventListener("resize", checkSize)
    }, [breakpoint])

    return isMobile
}