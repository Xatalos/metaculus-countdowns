import { questions } from './data/questions';
import { CountdownCard } from './components/CountdownCard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Metaculus Countdowns</h1>
        <p>Community predictions for when certain important events will occur!</p>
        <p className="updated">Last updated: July 2026</p>
        <br/>
      </header>

      <main className="grid">
        {questions.map((q) => (
          <CountdownCard key={q.id} question={q} />
        ))}
      </main>
      <br/>
    </div>
  );
}

export default App;