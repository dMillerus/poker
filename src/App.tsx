import type { FC } from 'react';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-felt-950 text-white">
      <header className="bg-felt-900 border-b border-felt-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-gold-400">Poker Trainer</h1>
        <p className="text-felt-300 text-sm">Hand Analysis & Training Application</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-felt-800 rounded-xl p-8 shadow-felt">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Welcome to Poker Trainer</h2>
            <p className="text-felt-300 mb-6">
              Learn Texas Hold&apos;em through real-time hand analysis, probability calculations,
              and adaptive AI guidance.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gold-500 hover:bg-gold-600 text-felt-950 font-semibold px-6 py-2 rounded-lg transition-colors">
                Start Training
              </button>
              <button className="bg-felt-700 hover:bg-felt-600 text-white px-6 py-2 rounded-lg transition-colors">
                View Statistics
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder for game table */}
        <div className="mt-8 bg-felt-texture rounded-xl p-8 shadow-felt min-h-[400px] flex items-center justify-center">
          <div className="text-center text-felt-300">
            <p className="text-lg">Game Table</p>
            <p className="text-sm opacity-75">Coming in Phase 9</p>
          </div>
        </div>
      </main>

      <footer className="bg-felt-900 border-t border-felt-700 px-6 py-4 text-center text-felt-400 text-sm">
        <p>Poker Trainer &copy; 2024 - Learn. Play. Improve.</p>
      </footer>
    </div>
  );
};

export default App;
