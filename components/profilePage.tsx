"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/config";

interface iOrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

interface iOrder {
  _id: string;
  items: iOrderItem[];
  totalAmount: number;
  placedAt: string;
}

interface iUserProfile {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orders: iOrder[];
}

const fetchProfile = async (): Promise<iUserProfile> => {
  const res = await Api.get("/user/profile");
  return res.data;
};

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    retry: false,
  });

  if (isLoading) return <p className="p-4">Loading profile...</p>;
  if (isError || !profile)
    return (
      <p className="p-4 text-red-500">Unauthorized or error loading profile.</p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Welcome, {profile.user.name}</h1>
      <p className="mb-6">Email: {profile.user.email}</p>

      <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
      {profile.orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul className="space-y-4">
          {profile.orders.map((order) => (
            <li key={order._id} className="border rounded-lg p-4 shadow">
              <p className="font-medium">Order ID: {order._id}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <p>Date: {new Date(order.placedAt).toLocaleDateString()}</p>

              <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-center bg-gray-50 rounded p-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                      {item.color && <p>Color: {item.color}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
