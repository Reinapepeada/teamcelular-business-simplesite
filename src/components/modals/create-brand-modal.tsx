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

export default function CreateBrandModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [brandName, setBrandName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await createBrand({ name: brandName })
      if (!response.detail) {
        await revalidatePathCreateProducts()
        setIsOpen(false)
        toast({
          title: "Marca creada",
          description: `Tu marca "${brandName}" ha sido creada exitosamente.`,
          duration: 5000,
        })
      }else{
        throw response.detail
      }
    } catch (error) {
      console.error('Error al crear la marca:', error)
      toast({
        title: "Error",
        description: "No se pudo crear la marca: "+error,
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

