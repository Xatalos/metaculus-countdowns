import { useQuestions } from './hooks/useQuestions';
import { CountdownCard } from './components/CountdownCard';
import './App.css';

function App() {
  const { questions, loading, error, updatedAt } = useQuestions();

  return (
    <div className="app">
      <header className="header">
        <h1>Metaculus Countdowns</h1>
      </header>

      <main className="grid">
        {loading && <p className="status">Loading latest predictions…</p>}
        {error && <p className="status error">Could not load data: {error}</p>}

        {!loading && !error && questions.map((q) => (
          <CountdownCard key={q.id} question={q} />
        ))}
      </main>

      <footer>
        Data from{' '}
        <a href="https://www.metaculus.com" target="_blank" rel="noopener noreferrer">
          Metaculus
        </a>
        . Updated daily via GitHub Actions.
      </footer>
    </div>
  );
}

export default App;