import '../../pages/GuestList.css';

export default function GuestList({ guests, onToggle, onRemove }) {
  if (guests.length === 0) {
    return <p className="guest-list__empty">Nenhum convidado ainda. Adicione o primeiro!</p>;
  }

  return (
    <ul className="guest-list">
      {guests.map((guest) => (
        <li
          key={guest.id}
          className={`guest-list__item ${guest.confirmed ? 'guest-list__item--confirmed' : ''}`}
        >
          <label className="guest-list__info">
            <input
              type="checkbox"
              checked={!!guest.confirmed}
              onChange={() => onToggle(guest)}
            />
            <span className="guest-list__name">{guest.name}</span>
            {guest.companions > 0 && (
              <span className="guest-list__badge">+{guest.companions}</span>
            )}
          </label>
          <button
            className="guest-list__remove"
            onClick={() => onRemove(guest)}
            aria-label={`Remover ${guest.name}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
