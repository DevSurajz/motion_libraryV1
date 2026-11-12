"use client";
import dynamic from "next/dynamic";
export const HeroLazy = dynamic(() => import("./hero-shader"), { ssr: false });
