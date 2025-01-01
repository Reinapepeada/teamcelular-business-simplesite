'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from 'lucide-react'
import { createBrand } from '@/services/brands'
import { revalidatePathCreateProducts } from '@/services/revalidate'


export default function CreateBrandModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [brandName, setBrandName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response= await createBrand({ name: brandName })
    console.log(response)
    if (response.id) {
      revalidatePathCreateProducts()
      setIsOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  Create Your Brand
                </DialogTitle>
                <DialogDescription className="text-indigo-500">
                  Enter a name for your new brand. Make it memorable!
                </DialogDescription>
              </DialogHeader>
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 mt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="brandName" className="text-sm font-medium text-gray-700">
                    Brand Name
                  </Label>
                  <Input
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your brand name"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Create Brand
                </Button>
              </motion.form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
