import { useState } from 'react';
import '../../pages/GuestForm.css';

export default function GuestForm({ onAdd }) {
  const [name, setName] = useState('');
  const [companions, setCompanions] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await onAdd({ name, companions });
    setName('');
    setCompanions(0);
    setSaving(false);
  };

  return (
    <form className="guest-form" onSubmit={handleSubmit}>
      <input
        className="guest-form__name"
        type="text"
        placeholder="Nome do convidado"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={80}
        required
      />
      <label className="guest-form__companions">
        Acompanhantes
        <input
          type="number"
          min="0"
          max="20"
          value={companions}
          onChange={(e) => setCompanions(e.target.value)}
        />
      </label>
      <button className="guest-form__submit" type="submit" disabled={saving}>
        {saving ? 'Adicionando...' : 'Adicionar'}
      </button>
    </form>
  );
}
