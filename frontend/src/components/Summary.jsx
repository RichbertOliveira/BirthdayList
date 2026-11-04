import '../../pages/Summary.css';

export default function Summary({ guests }) {
  const total = guests.reduce((sum, g) => sum + 1 + (g.companions || 0), 0);
  const confirmed = guests
    .filter((g) => g.confirmed)
    .reduce((sum, g) => sum + 1 + (g.companions || 0), 0);

  return (
    <div className="summary">
      <div className="summary__item">
        <span className="summary__value">{guests.length}</span>
        <span className="summary__label">Convites</span>
      </div>
      <div className="summary__item">
        <span className="summary__value">{total}</span>
        <span className="summary__label">Pessoas no total</span>
      </div>
      <div className="summary__item summary__item--confirmed">
        <span className="summary__value">{confirmed}</span>
        <span className="summary__label">Confirmadas</span>
      </div>
    </div>
  );
}
