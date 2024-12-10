'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Edit, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from "@/components/ui/use-toast"

interface Variant {
  id: number
  product_id: number
  color: string
  size: string
  stock: number
  min_stock: number
}

const emptyVariant: Variant = {
  id: Date.now(),
  product_id: 0,
  color: '',
  size: '',
  stock: 0,
  min_stock: 0
}

export default function ProductVariantForm() {
  const [variants, setVariants] = useState<Variant[]>([{ ...emptyVariant }])
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVariants(prevVariants =>
      prevVariants.map(variant =>
        variant.id === id ? { ...variant, [name]: name.includes('stock') ? parseInt(value) || 0 : value } : variant
      )
    )
  }

  const addVariant = () => {
    const newVariant = { ...emptyVariant, id: Date.now() }
    setVariants(prev => [...prev, newVariant])
    setEditingVariantId(newVariant.id)
  }

  const removeVariant = (id: number) => {
    setVariants(prev => prev.filter(variant => variant.id !== id))
    if (editingVariantId === id) {
      setEditingVariantId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Variantes enviadas:', variants)
      toast({
        title: "Éxito",
        description: "Las variantes se han guardado correctamente.",
      })
    } catch (error) {
      console.error('Error al enviar las variantes:', error)
      toast({
        title: "Error",
        description: "Hubo un problema al guardar las variantes.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderVariantForm = (variant: Variant) => (
    <motion.div
      key={variant.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-card border rounded-lg p-6 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-card-foreground">Editar Variante</h3>
        <Button variant="ghost" size="icon" onClick={() => setEditingVariantId(null)} aria-label="Cerrar edición">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`product_id-${variant.id}`}>ID Producto</Label>
          <Input
            id={`product_id-${variant.id}`}
            name="product_id"
            type="number"
            value={variant.product_id}
            onChange={(e) => handleInputChange(variant.id, e)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`color-${variant.id}`}>Color</Label>
          <Input
            id={`color-${variant.id}`}
            name="color"
            value={variant.color}
            onChange={(e) => handleInputChange(variant.id, e)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`size-${variant.id}`}>Talla</Label>
          <Input
            id={`size-${variant.id}`}
            name="size"
            value={variant.size}
            onChange={(e) => handleInputChange(variant.id, e)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`stock-${variant.id}`}>Stock</Label>
          <Input
            id={`stock-${variant.id}`}
            name="stock"
            type="number"
            value={variant.stock}
            onChange={(e) => handleInputChange(variant.id, e)}
            required
          />
        </div>
        <div>
          <Label htmlFor={`min_stock-${variant.id}`}>Stock Mínimo</Label>
          <Input
            id={`min_stock-${variant.id}`}
            name="min_stock"
            type="number"
            value={variant.min_stock}
            onChange={(e) => handleInputChange(variant.id, e)}
            required
          />
        </div>
      </div>
    </motion.div>
  )

  const renderVariantSummary = (variant: Variant) => (
    <motion.div
      key={variant.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-card-foreground">Variante {variant.id}</h4>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setEditingVariantId(variant.id)} aria-label="Editar variante">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => removeVariant(variant.id)} aria-label="Eliminar variante">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Color: {variant.color}</p>
      <p className="text-sm text-muted-foreground">Talla: {variant.size}</p>
      <p className="text-sm text-muted-foreground">Stock: {variant.stock}</p>
    </motion.div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 p-4">
      <div className="space-y-4">
        <AnimatePresence>
          {variants.map(variant =>
            editingVariantId === variant.id
              ? renderVariantForm(variant)
              : renderVariantSummary(variant)
          )}
        </AnimatePresence>
      </div>
      <Button type="button" variant="outline" onClick={addVariant} className="w-full">
        <PlusCircle className="mr-2 h-5 w-5" />
        Agregar Variante
      </Button>
      <Button type="submit" variant="default" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          'Guardar Variantes'
        )}
      </Button>
    </form>
  )
}
