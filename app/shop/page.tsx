"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Filter,
  Heart,
  ShoppingBag,
  Star,
  X,
  Plus,
  Minus,
  Check,
} from "lucide-react";

// Sample clothing data
const clothingItems = [
  {
    id: 1,
    name: "Prism Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "/cloths/gsap cloth 1.jpg",
    category: "T-Shirts",
    isNew: true,
    rating: 4.5,
    colors: ["Black", "White", "Gray"],
  },
  {
    id: 2,
    name: "Leather Jacket Classic",
    price: 89.99,
    originalPrice: 119.99,
    image: "/cloths/gsap cloth 2.webp",
    category: "Jackets",
    isNew: false,
    rating: 4.8,
    colors: ["Blue", "Black"],
  },
  {
    id: 3,
    name: "Chrome Hoodies",
    price: 59.99,
    originalPrice: 79.99,
    image: "/cloths/gsap cloth 3.jpg",
    category: "Jeans",
    isNew: true,
    rating: 4.3,
    colors: ["Blue", "Black", "Gray"],
  },
  {
    id: 4,
    name: "Experimental Denim",
    price: 49.99,
    originalPrice: 69.99,
    image: "/cloths/gsap cloth 4.jpg",
    category: "Hoodies",
    isNew: false,
    rating: 4.6,
    colors: ["Black", "Gray", "Navy"],
  },
  {
    id: 5,
    name: "Crazy Sneakers",
    price: 129,
    originalPrice: 159.99,
    image: "/cloths/gsap cloth 5.jpg",
    category: "Shoes",
    isNew: true,
    rating: 4.7,
    colors: ["Brown", "Black"],
  },
  {
    id: 6,
    name: "Sports Jacket",
    price: 99.99,
    originalPrice: 139.99,
    image: "/cloths/gsap cloth 6.jpg",
    category: "Blazers",
    isNew: false,
    rating: 4.4,
    colors: ["Navy", "Gray", "Black"],
  },
  {
    id: 7,
    name: "Tank Top",
    price: 69.99,
    originalPrice: 89.99,
    image: "/cloths/gsap cloth 7.jpg",
    category: "Dresses",
    isNew: true,
    rating: 4.5,
    colors: ["Floral", "Black", "White"],
  },
  {
    id: 8,
    name: "Leather Pants",
    price: 24.99,
    originalPrice: 34.99,
    image: "/cloths/gsap cloth 8.jpg",
    category: "Shorts",
    isNew: false,
    rating: 4.2,
    colors: ["Black", "Gray", "Navy"],
  },
];

const categories = [
  "All",
  "T-Shirts",
  "Jackets",
  "Jeans",
  "Hoodies",
  "Shoes",
  "Blazers",
  "Dresses",
  "Shorts",
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "confirmed" | "processing" | "shipped";
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [, setOrders] = useState<Order[]>([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const filteredItems =
    selectedCategory === "All"
      ? clothingItems
      : clothingItems.filter((item) => item.category === selectedCategory);

  const addToCart = (
    item: (typeof clothingItems)[0],
    selectedColor: string
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedColor === selectedColor
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedColor === selectedColor
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          selectedColor,
        },
      ];
    });
  };

  const updateQuantity = (
    id: number,
    selectedColor: string,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      setCartItems((prev) =>
        prev.filter(
          (item) => !(item.id === id && item.selectedColor === selectedColor)
        )
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.selectedColor === selectedColor
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      total: getTotalPrice(),
      date: new Date().toLocaleDateString(),
      status: "confirmed",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrderId(orderId);
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
    setShowOrderConfirmation(true);

    // Reset customer info
    setCustomerInfo({
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/shop"
                className="text-xl font-bold text-black hover:text-gray-600 transition-colors"
              >
                X-LABS
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/shop" className="text-black font-medium">
                  SHOP
                </Link>
                <Link
                  href="/new-arrivals"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  NEW ARRIVALS
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Heart className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-black" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors md:hidden">
                <Menu className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            SHOP COLLECTION
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest fashion pieces designed for the modern
            individual. Quality meets style in every piece.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center text-black"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <div className="hidden md:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm px-4 py-2 rounded-md transition-colors text-black ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-800">
            {filteredItems.length} items
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm px-4 py-2 rounded-md transition-colors text-black ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-opacity-30"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-black">
                  Shopping Cart ({getTotalItems()})
                </h2>
                <button onClick={() => setShowCart(false)}>
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedColor}`}
                        className="flex gap-4 p-4 border rounded-lg"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-black">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Color: {item.selectedColor}
                          </p>
                          <p className="font-semibold text-black">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4 text-black" />
                            </button>
                            <span className="w-8 text-center text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4 text-black" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4 text-black">
                    <span className="text-lg font-semibold text-black">
                      Total: ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-black text-white k py-3 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCheckout(false)}
          />
          <div className="absolute inset-4 bg-white text-black rounded-lg shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">Checkout</h2>
                <button onClick={() => setShowCheckout(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-black">
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded-md text-black"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded-md text-black"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="w-full p-3 border rounded-md text-black"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        className="w-full p-3 border rounded-md text-black"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={customerInfo.zipCode}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            zipCode: e.target.value,
                          }))
                        }
                        className="w-full p-3 border rounded-md text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-black">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedColor}`}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name} ({item.selectedColor}) x{item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-black">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={placeOrder}
                    disabled={
                      !customerInfo.name ||
                      !customerInfo.email ||
                      !customerInfo.address
                    }
                    className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-opacity-50"
            onClick={() => setShowOrderConfirmation(false)}
          />
          <div className="absolute inset-4 bg-white rounded-lg shadow-xl flex items-center justify-center">
            <div className="text-center p-8 text-black">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-black">Order Confirmed!</h2>
              <p className="text-gray-600 mb-4 text-black">
                Your order #{lastOrderId} has been placed successfully.
              </p>
              <p className="text-sm text-gray-500 mb-6 text-black">
                You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => setShowOrderConfirmation(false)}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">X-LABS</h3>
              <p className="text-gray-400">
                Fashion forward clothing for the modern individual.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals"
                    className="hover:text-white transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=sale"
                    className="hover:text-white transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 X-LABS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({
  item,
  onAddToCart,
}: {
  item: (typeof clothingItems)[0];
  onAddToCart: (item: (typeof clothingItems)[0], color: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);

  return (
    <div className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg">
      <div className="p-3">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors absolute top-2 right-2 z-10 bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4 text-red-800" />
          </button>
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={300}
            height={400}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-black group-hover:text-gray-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{item.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">
                ${item.price}
              </span>
              {item.originalPrice > item.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${item.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            {item.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{
                  backgroundColor:
                    color.toLowerCase() === "floral"
                      ? "#f3f4f6"
                      : color.toLowerCase(),
                }}
              />
            ))}
          </div>
          <button
            onClick={() => onAddToCart(item, selectedColor)}
            className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
