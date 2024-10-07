import Autocomplete from './components/Autocomplete';
import { fetchSuggestions } from './services/api';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Autocomplete example</h1>
      <Autocomplete fetchSuggestions={fetchSuggestions} />
    </div>
  );
}

export default App;
