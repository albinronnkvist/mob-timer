import Timer from './components/Timer';

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <Timer />
        </div>
      </div>
    </main>
  )
}
