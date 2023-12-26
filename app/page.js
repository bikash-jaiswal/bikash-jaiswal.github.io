import Image from 'next/image'
import IntroWithImage from './Component/whoamI'
import BlogPage from './blog/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <IntroWithImage />
      <BlogPage />
    </main>
  )
}
