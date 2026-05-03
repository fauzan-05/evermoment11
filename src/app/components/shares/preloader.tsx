"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 4200);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">

            {/* TIGHT CONTAINER */}
            <div className="flex flex-col items-center leading-tight">

                {/* SVG LOGO */}
                <svg
                    width="260"
                    height="110"
                    viewBox="0 0 200 100"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c5a46d" />
                            <stop offset="50%" stopColor="#fff3c4" />
                            <stop offset="100%" stopColor="#c5a46d" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M20,50 
               C40,10 80,10 100,50 
               C120,90 160,90 180,50 
               C160,10 120,10 100,50 
               C80,90 40,90 20,50"
                        stroke="url(#goldShine)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="500"
                        strokeDashoffset="500"
                        className="draw"
                    />

                    {/* MOVING SPARKLE */}
                    <circle r="3" fill="#fff3c4">
                        <animateMotion
                            dur="2s"
                            fill="freeze"
                            keyPoints="0;0.78"
                            keyTimes="0;1"
                            calcMode="linear"
                            path="M20,50 
                    C40,10 80,10 100,50 
                    C120,90 160,90 180,50 
                    C160,10 120,10 100,50 
                    C80,90 40,90 20,50"
                        />
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            keyTimes="0;0.8;1"
                            dur="2s"
                            fill="freeze"
                        />
                    </circle>

                    {/* FINAL SPARKLE */}
                    <g className="finalSparkle">
                        <circle cx="172" cy="18" r="3" fill="#fff3c4" />
                        <circle cx="172" cy="18" r="6" fill="#fff3c4" opacity="0.2" />
                    </g>
                </svg>

                {/* TEXT (closer now) */}
                <h1 className="text-white text-xl mt-2 tracking-wide opacity-0 animate-fadeIn">
                    ever moment
                </h1>

                <p className="text-gray-400 text-xs mt-1 opacity-0 animate-fadeIn delay-300">
                    eyewear styling experience
                </p>
            </div>

            {/* ANIMATION */}
            <style jsx>{`
        .draw {
          animation: drawLine 2s ease forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
          animation-delay: 2.2s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .finalSparkle {
          opacity: 0;
          animation: sparklePop 0.5s ease forwards;
          animation-delay: 2s;
          transform-origin: center;
        }

        @keyframes sparklePop {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
        </div>
    );
}
