import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'guests';
const guestsRef = collection(db, COLLECTION);

/**
 * Escuta a lista de convidados em tempo real.
 * Retorna a função para cancelar a inscrição.
 */
export function subscribeToGuests(onChange, onError) {
  const q = query(guestsRef, orderBy('createdAt', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const guests = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(guests);
    },
    onError
  );
}

export function addGuest({ name, companions = 0 }) {
  return addDoc(guestsRef, {
    name: name.trim(),
    companions: Number(companions) || 0,
    confirmed: false,
    createdAt: serverTimestamp(),
  });
}

export function setGuestConfirmed(id, confirmed) {
  return updateDoc(doc(db, COLLECTION, id), { confirmed });
}

export function removeGuest(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
