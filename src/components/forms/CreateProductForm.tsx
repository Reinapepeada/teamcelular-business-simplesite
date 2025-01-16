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
import { PlusCircle } from 'lucide-react'
// creaters modals
import CreateBrandModal from "@/components/modals/create-brand-modal"
import CreateCategoryModal from "@/components/modals/create-category-modal"
import CreateProviderModal from "@/components/modals/create-provider-modal"


// server actions
import { useEffect, useState } from 'react'
import { getbrands } from '@/services/brands';
import { getcategories } from '@/services/categories';
import { getproviders } from '@/services/providers';
import { createProduct } from '@/services/products'
import { redirect } from 'next/navigation'

// interfaces
interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Provider {
  id: number;
  name: string;
}

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
  warranty_unit: z.enum(['DAYS', 'WEEKS', 'MONTHS', 'YEARS']),
  cost: z.number()
  .gte(1,{
    message: 'Debes indicar el costo del producto'
    }),
  wholesale_price: z.number().gte(1,{
    message: 'Debes indicar el precio de venta al por mayor'
  }),
  retail_price: z.number().gte(1,{
    message: 'Debes indicar el precio de venta al por menor'
  }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  category_id: z.number().gte(1,{ 
    message: 'Debes seleccionar una categoria'
  }),
  provider_id: z.number().gte(1,{
    message: 'Debes seleccionar un proveedor'
  }),
})

export default function ProductForm() {
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
      wholesale_price: 0,
      retail_price: 0,
      status: 'ACTIVE',
      category_id: 0,
      provider_id: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createProduct(values)
    console.log(response)
    if (response.status_code) {
      alert(response.detail)

    } else {
      const variantOption = confirm("¿deseas agregar variantes al producto?")
      if (variantOption) {
        redirect(`/admin/create-variants/${response.id}`)
      }
      else {
        redirect("/admin")
      }

    }
  }
  
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const [showNewBrandForm, setShowNewBrandForm] = useState(false);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showNewProviderForm, setShowNewProviderForm] = useState(false);

  async function fetchBrands() {
      const brands_server  = await getbrands();
      setBrands(brands_server);
  }
  
  async function fetchCategories() {
      const categories_server  = await getcategories();
      setCategories(categories_server);
  }
  async function fetchProviders() {
      const providers_server  = await getproviders();
      setProviders(providers_server);
  }
  
    useEffect(() => {
        fetchCategories();
        fetchProviders();
        fetchBrands();
    }, [showNewBrandForm, showNewCategoryForm, showNewProviderForm]);


  return (
    <div className='w-1/2 h-full m-3'>
    {showNewBrandForm && <CreateBrandModal isOpen={showNewBrandForm} setIsOpen={setShowNewBrandForm} />}
    {showNewCategoryForm && <CreateCategoryModal isOpen={showNewCategoryForm} setIsOpen={setShowNewCategoryForm} />}
    {showNewProviderForm && <CreateProviderModal isOpen={showNewProviderForm} setIsOpen={setShowNewProviderForm} />}
    <Card className="">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
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
                        <SelectItem value="WEEKS">Weeks</SelectItem>
                        <SelectItem value="MONTHS">Months</SelectItem>
                        <SelectItem value="YEARS">Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wholesale_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wholesale Price</FormLabel>
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
                    <FormLabel>Retail Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <FormField
                control={form.control}
                name="provider_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl className="flex-grow">
                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-background'>
                            {providers.map((provider: Provider) => (
                              <SelectItem key={provider.id} value={provider.id.toString()}>{provider.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <Button type="button" size="icon" onClick={()=>setShowNewProviderForm(true)}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full lg:w-32 flex justify-center ">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  )
}
