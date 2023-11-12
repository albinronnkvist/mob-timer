import Timer from './components/Timer';
import Settings from './components/settings/Settings';
import { SignalRProvider } from './contexts/SignalRContext';

export default function Home() {
  return (
    <SignalRProvider endpoints={['/timer']}>
      <main>
        <div className="flex items-center justify-center h-screen bg-background">
          <div className="text-center">
            <Timer />
            <Settings />
          </div>
        </div>
      </main>
    </SignalRProvider>
  )
}
