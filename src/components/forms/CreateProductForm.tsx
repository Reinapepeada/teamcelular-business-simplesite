'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// creaters modals
import CreateBrandModal from "@/components/modals/create-brand-modal"
import CreateCategoryModal from "@/components/modals/create-category-modal"

// server actions
import { useEffect, useState } from 'react'
import { getbrands } from '@/services/brands';
import { getcategories } from '@/services/categories';
import { createProduct } from '@/services/products'
import { useRouter } from 'next/navigation'
import type { Brand, Category } from '@/app/tienda/product';

const formSchema = z.object({
  serial_number: z.string()
  .min(5,{
    message: 'Serial number debe ser de al menos 5 caracteres'
  }),

  name: z.string().min(5,{
    message: 'Nombre debe ser de al menos 5 caracteres'
  })
  .max(100,{
    message: 'Nombre debe ser de menos de 100 caracteres'
  })
  .transform(val => val.toLowerCase()),

  description: z.string()
  .min(10,{
    message: 'Description debe ser de al menos 10 caracteres'
  })
  .max(500,{
    message: 'Description debe ser de menos de 500 caracteres'
  })
  .transform(val => val.toLowerCase()),

  brand_id: z.number().gte(1,{
    message: 'Debe seleccionar una marca'
  }),

  warranty_time: z.number(),
  warranty_unit: z.enum(['DAYS', 'MONTHS', 'YEARS']),
  cost: z.number()
  .gte(1,{
    message: 'Debes indicar el costo del producto'
    }),
  retail_price: z.number().gte(1,{
    message: 'Debes indicar el precio de venta al por menor'
  }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  category_id: z.number().gte(1,{ 
    message: 'Debes seleccionar una categoria'
  }),
})

export default function ProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdProductId, setCreatedProductId] = useState<number | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial_number: '',
      name: '',
      description: '',
      brand_id: 0,
      warranty_time: 0,
      warranty_unit: 'DAYS',
      cost: 0,
      retail_price: 0,
      status: 'ACTIVE',
      category_id: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await createProduct(values)
      setCreatedProductId(response.id)
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el producto",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleAddVariants = () => {
    if (createdProductId) {
      router.push(`/admin/create-variants/${createdProductId}`)
    }
  }

  const handleCreateAnother = () => {
    form.reset()
    setCreatedProductId(null)
    setShowSuccessDialog(false)
  }

  const handleGoToList = () => {
    router.push("/admin/products")
  }
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showNewBrandForm, setShowNewBrandForm] = useState(false);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  async function fetchBrands() {
      const brands_server  = await getbrands();
      setBrands(brands_server || []);
  }
  
  async function fetchCategories() {
      const categories_server  = await getcategories();
      setCategories(categories_server || []);
  }
  
    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, [showNewBrandForm, showNewCategoryForm]);


  return (
    <div className='w-full max-w-4xl mx-auto p-4'>
    {showNewBrandForm && <CreateBrandModal isOpen={showNewBrandForm} setIsOpen={setShowNewBrandForm} />}
    {showNewCategoryForm && <CreateCategoryModal isOpen={showNewCategoryForm} setIsOpen={setShowNewCategoryForm} />}
    
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¡Producto creado exitosamente!</DialogTitle>
          <DialogDescription>
            El producto se ha guardado correctamente. ¿Qué deseas hacer ahora?
            <br /><br />
            <strong>Nota:</strong> Para agregar imágenes al producto, debes crear al menos una variante.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleAddVariants} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Variantes e Imágenes
          </Button>
          <Button onClick={handleCreateAnother} variant="outline" className="w-full">
            Crear otro producto
          </Button>
          <Button onClick={handleGoToList} variant="ghost" className="w-full">
            Ir a la lista de productos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Card className="">
      <CardHeader>
        <CardTitle>Información del Producto</CardTitle>
      </CardHeader>
      <CardContent className='gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serial_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={100} />
                    </FormControl>
                    <FormDescription>Max 100 chars, lowercase</FormDescription>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-20" />
                  </FormControl>
                  <FormDescription>Will be converted to lowercase</FormDescription>
                  <FormMessage className='text-red-700' />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="brand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl className="flex-grow">
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-background'>
                            {brands.map((brand: Brand) => (
                              <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button type="button" size="icon" onClick={()=>setShowNewBrandForm(true)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warranty_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Time</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warranty_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-background'>
                        <SelectItem value="DAYS">Days</SelectItem>
                        <SelectItem value="MONTHS">Months</SelectItem>
                        <SelectItem value="YEARS">Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo (interno)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retail_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de Venta</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-background'>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl className="flex-grow">
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-background'>
                            {categories.map((category: Category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button type="button" size="icon" onClick={()=>setShowNewCategoryForm(true)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full lg:w-32 flex justify-center" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Crear Producto"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  )
}
