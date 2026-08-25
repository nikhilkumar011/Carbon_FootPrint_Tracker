import { Button } from '@/components/ui/button'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B2818] flex items-center justify-center px-6">
      {/* Ambient background texture */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow, top left */}
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#A3E635]/10 blur-3xl" />
        {/* Soft radial glow, bottom right */}
        <div className="absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-[#4ADE80]/10 blur-3xl" />
        {/* Faint grain/vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B2818_75%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="mb-6 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#A3E635]">
          Your everyday impact, visualized
        </span>

        {/* Headline */}
        <h1 className="font-serif text-5xl leading-[1.1] text-[#F3F7F0] sm:text-6xl">
          See your carbon
          <br />
          story unfold.
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-md text-base leading-relaxed text-[#9CB89F] sm:text-lg">
          Track what you drive, eat, and buy — and watch small changes
          add up to a lighter footprint, one day at a time.
        </p>

        {/* CTA with ambient glow */}
        <div className="relative mt-10">
          <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#A3E635]/30 blur-2xl" />
          <Button
            size="lg"
            className="rounded-full cursor-pointer bg-[#A3E635] px-8 py-6 text-base font-semibold text-[#0B2818] hover:bg-[#BEF264] transition-colors"
          >
            Get Started
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-6 text-sm text-[#6B8A6E]">
          Trusted by 12,000+ people cutting emissions every day
        </p>
      </div>
    </div>
  )
}

export default LandingPage