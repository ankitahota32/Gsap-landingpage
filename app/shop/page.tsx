"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Filter, Heart, ShoppingBag, Star } from "lucide-react";

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
    name: "Slim Fit Jeans",
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
    name: "Oversized Hoodie",
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
    name: "Leather Boots",
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
    name: "Casual Blazer",
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
    name: "Summer Dress",
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
    name: "Athletic Shorts",
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

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? clothingItems
      : clothingItems.filter((item) => item.category === selectedCategory);

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
                  href="/shop?filter=new"
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
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <ShoppingBag className="w-5 h-5 text-black" />
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
            <div
              key={item.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
            >
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
                  <div className="flex gap-25">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
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
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "floral"
                              ? "#f3f4f6"
                              : color.toLowerCase(),
                        }}
                      />
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    href="/shop?filter=new"
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
