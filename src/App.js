import React, { useState, useEffect } from "react";
import { auth, provider, db } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchOrders(currentUser.uid);
      else setOrders([]);
    });
  }, []);

  const fetchOrders = (uid) => {
    const q = query(collection(db, "orders"), where("userId", "==", uid));
    return onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setOrders(list);
    });
  };

  const login = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  const logout = () => {
    signOut(auth);
  };

  const createOrder = async () => {
    if (!pickupAddress || !deliveryAddress) {
      alert("Please fill both addresses");
      return;
    }
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      pickupAddress,
      deliveryAddress,
      status: "Requested",
      createdAt: new Date(),
    });
    setPickupAddress("");
    setDeliveryAddress("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      {!user ? (
        <>
          <h2>LaundryDash Login</h2>
          <button onClick={login}>Login with Google</button>
        </>
      ) : (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={logout}>Logout</button>

          <h3>Schedule Laundry Pickup</h3>
          <input
            type="text"
            placeholder="Pickup Address"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
          <button onClick={createOrder} style={{ width: "100%" }}>
            Request Pickup
          </button>

          <h3>Your Orders</h3>
          {orders.length === 0 && <p>No orders yet.</p>}
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Pickup: {order.pickupAddress} | Delivery: {order.deliveryAddress} | Status:{" "}
                {order.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
