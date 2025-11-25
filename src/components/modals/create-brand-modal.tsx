'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBrand } from '@/services/brands'
import { revalidatePathCreateProducts } from '@/services/revalidate'
import { useToast } from "@/hooks/use-toast"
import { getToken } from '@/services/auth'

export default function CreateBrandModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [brandName, setBrandName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const token = getToken()
    if (!token) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una marca.",
        variant: "destructive",
        duration: 5000,
      })
      setIsLoading(false)
      return
    }
    
    try {
      const response = await createBrand({ name: brandName }, token)
      console.log('response:', response)
      
      // Si llegamos aquí, se creó correctamente
      await revalidatePathCreateProducts()
      setIsOpen(false)
      toast({
        title: "Marca creada",
        description: `Tu marca "${brandName}" ha sido creada exitosamente.`,
        duration: 5000,
      })
    } catch (error) {
      console.error('Error al crear la marca:', error)
      toast({
        title: "Error",
        description: "No se pudo crear la marca: " + (error instanceof Error ? error.message : String(error)),
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
            Crea tu Marca
          </DialogTitle>
          <DialogDescription>
            Ingresa un nombre para tu nueva marca.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="brandName" className="text-sm font-medium">
              Nombre de la Marca
            </Label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full"
              placeholder="Ingresa el nombre de tu marca"
              required
              minLength={2}
              maxLength={50}
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
              'Crear Marca'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

