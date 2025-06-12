"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 786): boolean {
    const [isMobile] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return 

        const checkSize = () => {
            console.log("checking size");
        }

        window.addEventListener("resize", checkSize)

        return () => window.removeEventListener("resize", checkSize)
    }, [breakpoint])

    return isMobile
}