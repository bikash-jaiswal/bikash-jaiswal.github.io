import IntroWithImage from './Component/whoamI'
import BlogPage from './blog/page'

export default function Home() {
  return (
    <main className="flex flex-col text-xl">
      <IntroWithImage />
      <BlogPage blogNum="3"/>
    </main>
  )
}
