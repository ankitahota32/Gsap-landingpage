"use client";

import { Api } from "@/services/config";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Calendar, Mail, Package, ShoppingBag, User } from "lucide-react";

// Mock API service - replace with your actual API
// const Api = {
//   get: async (url: string) => {
//     // Mock implementation - replace with your actual API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return {
//       data: {
//         user: {
//           _id: userId,
//           name: user.name,
//           email: user.email,
//         },
//         orders: [],
//       },
//     };
//   },
// };

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
  const res = await Api.get("/user/profile", {withCredentials:true});
  return res.data.data;
};

function ProfilePageContent() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Access Denied
              </h3>
              <p className="text-gray-600">
                Unable to load your profile. Please check your authentication or
                try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-700">
                    {getInitials(profile.user.name)}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back, {profile.user.name}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{profile.user.email}</span>
                  </div>
                </div>
                <div className="text-right">
                  {/* Badge */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    {profile.orders.length} Orders
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order History
            </h2>
          </div>
          <div className="p-6">
            {profile.orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600">
                  When you place your first order, it will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {profile.orders.map((order, index) => (
                  <div key={order._id}>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-500">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(order.placedAt)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white border border-gray-300 text-gray-700 mt-1">
                              {order.items.length} item
                              {order.items.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {order.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-md border"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                  <span>Qty: {item.quantity}</span>
                                  <span className="font-medium">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                                {item.color && (
                                  <div className="flex items-center mt-1">
                                    <div
                                      className="w-3 h-3 rounded-full border mr-1"
                                      style={{
                                        backgroundColor:
                                          item.color.toLowerCase(),
                                      }}
                                    />
                                    <span className="text-xs text-gray-500">
                                      {item.color}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < profile.orders.length - 1 && (
                      <hr className="my-6 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Export the wrapped component
export default function ProfilePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfilePageContent />
    </QueryClientProvider>
  );
}
