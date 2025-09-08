import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config"; // Update this path
import { collection, getDocs } from "firebase/firestore";
import "./Wishes.css";

interface Wish {
  id: string;
  name: string;
  wishes: string;
  words: string;
}

const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const wishesCollectionRef = collection(db, "wedding");

  useEffect(() => {
    const getWishes = async () => {
      try {
        const data = await getDocs(wishesCollectionRef);
        const fetchedWishes: Wish[] = data.docs.map((doc) => ({
          ...(doc.data() as Omit<Wish, "id">),
          id: doc.id,
        }));
        setWishes(fetchedWishes);
      } catch (e) {
        console.error("Error fetching wishes:", e);
      }
    };
    getWishes();
  }, []);

  return (
    <div>
      <center>
        <h1>Wishes</h1>
      </center>
      {wishes.length > 0 ? (
        <ol>
          {wishes.map((wish) => (
            <li key={wish.id}>
              <strong>{wish.name}</strong>
              <p>Wishes: {wish.wishes}</p>
              <p>Words: {wish.words}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No wishes found.</p>
      )}
    </div>
  );
};

export default Wishes;
