import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

const Header = (): JSX.Element => {
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const router = useRouter();
  return (
    <header className="border-b-1 relative z-20 w-full">
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-white"
          role="navigation"
        >
          <Link
            aria-label="Joel Mercier logo"
            aria-current="page"
            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            href="/"
            scroll={false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.03 54" width="64" height="64">
              <g>
                <polygon points="56.03 54 46.97 54 40 18 49.25 18 56.03 54" fill="#673a5d" />
                <polygon points="27 54 36 54 49.25 18 40 18 27 54" fill="#fff" />
                <polygon points="76.03 36 66.97 36 60 18 69.25 18 76.03 36" fill="#673a5d" />
                <polygon points="47 54 56 54 69.25 18 60 18 47 54" fill="#fff" />
              </g>
              <g>
                <polygon points="16.03 54 6.97 54 0 36 9.25 36 16.03 54" fill="#673a5d" />
                <polygon points="7 54 16 54 29.25 18 20 18 7 54" fill="#fff" />
                <polygon points="23.25 9 32.5 9 35.75 0 26.5 0 23.25 9" fill="#fff" />
              </g>
            </svg>
          </Link>
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                  : ""
              }
            `}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
              isToggleOpen
                ? "visible opacity-100 backdrop-blur-sm"
                : "invisible opacity-0"
            }`}
          >
            <li role="none" className="flex items-stretch">
              <Link
                role="menuitem"
                aria-haspopup="false"
                tabIndex={0}
                className={classNames("flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:outline-none focus-visible:outline-none lg:px-8", {"text-emerald-500": router.pathname === '/'})}
                href="/"
                scroll={false}
              >
                <span>Home</span>
              </Link>
            </li>
            <li role="none" className="flex items-stretch">
              <Link
                role="menuitem"
                aria-current="page"
                aria-haspopup="false"
                tabIndex={0}
                className={classNames("flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:outline-none focus-visible:outline-none lg:px-8", {"text-emerald-500": router.pathname === '/about'})}
                href="/about"
                scroll={false}
              >
                <span>About</span>
              </Link>
            </li>
            <li role="none" className="flex items-stretch">
              <Link
                role="menuitem"
                aria-current="page"
                aria-haspopup="false"
                tabIndex={0}
                className={classNames("flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:outline-none focus-visible:outline-none lg:px-8", {"text-emerald-500": router.pathname === '/blog'})}
                href="/blog"
                scroll={false}
              >
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header