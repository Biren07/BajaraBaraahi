import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
   <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
  

  <h1 className="text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
    404
  </h1>


  <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
    Page not found
  </h2>

 
  <p className="mt-2 text-gray-500 max-w-md">
    The page you are looking for doesn’t exist, has been moved, or is temporarily unavailable.
  </p>


  <a
    href="/"
    className="mt-6 px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-md"
  >
    Go Home
  </a>
</div>
  )
}