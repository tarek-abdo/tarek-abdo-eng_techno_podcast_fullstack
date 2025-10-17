import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 text-center">
      <h1 className="text-2xl font-bold mb-2">Episodes Not Found</h1>
      <p className="text-gray-600 mb-6">We couldn’t find any episodes right now.</p>
      <Link href="/" className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg">Go back home</Link>
    </div>
  )
}


