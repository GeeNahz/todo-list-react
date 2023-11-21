import './App.css'
import Header from './components/Header';
import Todo from './pages/Todo';

function App() {
  return (
    <main className="App">
      <Header />
      <section className='main'>
        <Todo />
      </section>
    </main>
  );
}

export default App;
