import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted font-mono text-sm">Building...</p>
      </div>
    </main>
  )
}