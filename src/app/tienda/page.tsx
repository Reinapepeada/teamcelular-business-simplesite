'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, X, ChevronDown, Plus, Minus, Search, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import debounce from 'lodash/debounce';



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simulating a large number of products
const generateProducts = (count: number) => {
  const categories = ["Smartphones", "Tablets", "Laptops", "Accessories", "Repair Tools"]
  const products = []
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: `Tech Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 1000) + 50,
      image: "/placeholder.svg",
      rating: (Math.random() * 2 + 3).toFixed(1),
      sales: Math.floor(Math.random() * 5000),
    })
  }
  return products
}

const products = generateProducts(1000) // Generating 1000 products for this example

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  "All",
  "Smartphones",
  "Tablets",
  "Laptops",
  "Accessories",
  "Repair Tools"
]

export default function TechShop() {
  const [currentCategory, setCurrentCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [ratingFilter, setRatingFilter] = useState<number>(0)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const itemsPerPage = 12

  const filteredProducts = products.filter(product => 
    (currentCategory === "All" || product.category === currentCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1] &&
    parseFloat(product.rating) >= ratingFilter
  ).sort((a, b) => b.sales - a.sales)

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)
      setCurrentPage(1)
    }, 300),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const pageNumbers = []
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-10 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">TechShop</h1>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="mr-2"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    You have {totalItems} item(s) in your cart
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <Button className="w-full mt-6">
                    Proceed to Checkout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6 sticky top-24 transition-colors duration-300`}>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={currentCategory === category ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setCurrentCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                  <AccordionTrigger>Minimum Rating</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      min={0}
                      max={5}
                      step={0.1}
                      value={[ratingFilter]}
                      onValueChange={(value) => setRatingFilter(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2">
                      <span>{ratingFilter.toFixed(1)}</span>
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          <div className="w-full md:w-3/4">
            <div className="mb-6 relative">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full' : 'w-2/3'}`}>
                <Input
                  type="text"
                  placeholder="Search products..."
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg overflow-hidden transition-colors duration-300 flex flex-col h-full group`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      {index === 0 && (
                        <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">
                          Best Seller
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">{product.name}</h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{product.category}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold">${product.price}</span>
                          <div className="flex items-center">
                            <Star className="text-yellow-400 w-5 h-5 mr-1" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedProduct(product)} 
                            className="flex-1 mr-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                          >
                            Details
                          </Button>
                          <Button 
                            onClick={() => addToCart(product)} 
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  First
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {pageNumbers.map(number => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-2xl w-full transition-colors duration-300`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <Button variant="ghost" onClick={() => setSelectedProduct(null)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{selectedProduct.category}</p>
              <p className="text-3xl font-bold mb-4">${selectedProduct.price}</p>
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-5 h-5 mr-1" />
                <span className="text-lg">{selectedProduct.rating}</span>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>Experience cutting-edge technology with the {selectedProduct.name}. This device offers unparalleled performance and features to meet all your tech needs.</p>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300" 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
              >
                Add to Cart
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}