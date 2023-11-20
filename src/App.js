import './App.css'
import Header from './components/Header';
import Todos from './pages/Todos';

function App() {
  return (
    <main className="App">
      <Header />
      <section className='main'>
        <Todos />
      </section>
    </main>
  );
}

export default App;
