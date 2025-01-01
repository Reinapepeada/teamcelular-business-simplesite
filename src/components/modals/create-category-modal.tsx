'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCategory } from '@/services/categories'
import { revalidatePathCreateProducts } from '@/services/revalidate'
import { useToast } from "@/hooks/use-toast"

export default function CreateCategoryModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await createCategory({ name: categoryName, description: categoryDescription })
      if (response.id) {
        await revalidatePathCreateProducts()
        setIsOpen(false)
        toast({
          title: "Categoría creada",
          description: `Tu categoría "${categoryName}" ha sido creada exitosamente.`,
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error)
      toast({
        title: "Error",
        description: "No se pudo crear la categoría. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Crea tu Categoría
          </DialogTitle>
          <DialogDescription>
            Ingresa un nombre y descripción para tu nueva categoría.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-sm font-medium">
              Nombre
            </Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full"
              placeholder="Ingresa el nombre de tu categoría"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryDescription" className="text-sm font-medium">
              Descripción
            </Label>
            <Input
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="w-full"
              placeholder="Ingresa la descripción de tu categoría"
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              'Crear Categoría'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

