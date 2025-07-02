import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <button
          className="p-2 bg-slate-400 rounded-lg shadow-slate-500"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
