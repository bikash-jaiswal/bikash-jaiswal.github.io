import Image from 'next/image'
import IntroWithImage from './Component/whoamI'
import BlogPage from './blog/page'

export default function Home() {
  return (
    <main className="flex flex-col text-xl">
      <IntroWithImage />
      <BlogPage />
    </main>
  )
}
