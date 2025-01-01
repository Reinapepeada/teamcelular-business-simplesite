'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProvider } from '@/services/providers'
import { revalidatePathCreateProducts } from '@/services/revalidate'
import { useToast } from "@/hooks/use-toast"

export default function CreateProviderModal({ isOpen, setIsOpen }: Readonly<{ isOpen: boolean, setIsOpen: (open: boolean) => void }>) {
  const [providerName, setProviderName] = useState('')
  const [providerEmail, setProviderEmail] = useState('')
  const [providerPhone, setProviderPhone] = useState('')
  const [providerAddress, setProviderAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await createProvider({
        name: providerName,
        email: providerEmail,
        phone: providerPhone,
        address: providerAddress,
      })
      if (response.id) {
        await revalidatePathCreateProducts()
        setIsOpen(false)
        toast({
          title: "Proveedor creado",
          description: `El proveedor "${providerName}" ha sido creado exitosamente.`,
          duration: 5000,
        })
      }else{
        throw response.detail
      }
    } catch (error) {
      console.error('Error al crear el proveedor:', error)
      toast({
        title: "Error",
        description: error + ", por favor, intenta de nuevo.",
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
            Crear Nuevo Proveedor
          </DialogTitle>
          <DialogDescription>
            Ingresa los datos del nuevo proveedor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="providerName" className="text-sm font-medium">
              Nombre del Proveedor
            </Label>
            <Input
              id="providerName"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              className="w-full"
              placeholder="Ingresa el nombre del proveedor"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="providerEmail" className="text-sm font-medium">
              Correo Electrónico
            </Label>
            <Input
              id="providerEmail"
              type="email"
              value={providerEmail}
              onChange={(e) => setProviderEmail(e.target.value)}
              className="w-full"
              placeholder="Ingresa el correo electrónico"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="providerPhone" className="text-sm font-medium">
              Teléfono
            </Label>
            <Input
              id="providerPhone"
              type="tel"
              value={providerPhone}
              onChange={(e) => setProviderPhone(e.target.value)}
              className="w-full"
              placeholder="Ingresa el número de teléfono"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="providerAddress" className="text-sm font-medium">
              Dirección
            </Label>
            <Input
              id="providerAddress"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
              className="w-full"
              placeholder="Ingresa la dirección"
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
              'Crear Proveedor'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

