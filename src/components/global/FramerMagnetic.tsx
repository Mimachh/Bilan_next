"use client"
import { motion } from "framer-motion"
import React, { useRef, useState } from "react"

const FramerMagnetic = ({
    children
} : {
    children: React.ReactNode

}) => {

    // https://www.youtube.com/watch?v=Sb00VR5N-fw
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        if(ref && ref.current) {
            const { width, height, left, top }  = ref.current.getBoundingClientRect();
            const middleX = clientX - (left + width/2)
            const middleY = clientY - (top + height/2)
            setPosition({x: middleX, y: middleY})
        }
        
    }

    const mouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setPosition({ x: 0, y: 0 });
    }

    const { x, y } = position;
  return (
    <motion.div
    onMouseMove={mouseMove}
    onMouseLeave={mouseLeave}
    ref={ref}
    animate={{ x, y }}
    transition={{
        type: "spring",
        stiffness: 150,
        damping: 5,
        mass: 0.2
    }}
    >
        {
            children
        }
    </motion.div>
  )
}

export default FramerMagnetic