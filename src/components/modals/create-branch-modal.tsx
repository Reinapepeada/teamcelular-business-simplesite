'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBranch } from '@/services/branches'
import { revalidatePathCreateVariants } from '@/services/revalidate'
import { useToast } from "@/hooks/use-toast"

export default function CreateBranchModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [branchName, setBranchName] = useState('')
  const [branchAddress, setBranchAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await createBranch({ name: branchName, location: branchAddress })
      console.log('response:', response)
      if (!response.detail) {
        await revalidatePathCreateVariants()
        setIsOpen(false)
        toast({
          title: "Almacen creada",
          description: `Tu almacen "${branchName}" ha sido creada exitosamente.`,
          duration: 5000,
        })
      }else{
        throw response.detail
      }
    } catch (error) {
      console.error('Error al crear la almacen:', error)
      toast({
        title: "Error",
        description: "No se pudo crear la almacen."+ error,
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
            Crea tu Almacen
          </DialogTitle>
          <DialogDescription>
            Ingresa un nombre y direccion para tu nueva Almacen.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="branchName" className="text-sm font-medium">
              Nombre
            </Label>
            <Input
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="w-full"
              placeholder="Ingresa el nombre de tu categoría"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branchAddress" className="text-sm font-medium">
              Direccion
            </Label>
            <Input
              id="branchAddress"
              value={branchAddress}
              onChange={(e) => setBranchAddress(e.target.value)}
              className="w-full"
              placeholder="Ingresa la direccion de tu categoría"
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
              'Crear Almacen'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

