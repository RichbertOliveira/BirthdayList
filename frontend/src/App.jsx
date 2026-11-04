import { useEffect, useState } from 'react';
import {
  subscribeToGuests,
  addGuest,
  setGuestConfirmed,
  removeGuest,
} from '../../backend/guestService';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';
import Summary from './components/Summary';
import '../pages/App.css';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToGuests(
      (list) => {
        setGuests(list);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError('Não foi possível carregar a lista de convidados.');
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const handleAction = async (action) => {
    try {
      setError(null);
      await action();
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao salvar. Tente novamente.');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎉 Lista de Convidados</h1>
        <p>Gerencie quem vem para a festa</p>
      </header>

      <main className="app-main">
        <GuestForm onAdd={(guest) => handleAction(() => addGuest(guest))} />

        {error && <div className="app-error">{error}</div>}

        <Summary guests={guests} />

        {loading ? (
          <p className="app-loading">Carregando...</p>
        ) : (
          <GuestList
            guests={guests}
            onToggle={(g) => handleAction(() => setGuestConfirmed(g.id, !g.confirmed))}
            onRemove={(g) => {
              if (window.confirm(`Remover ${g.name} da lista?`)) {
                handleAction(() => removeGuest(g.id));
              }
            }}
          />
        )}
      </main>
    </div>
  );
}
