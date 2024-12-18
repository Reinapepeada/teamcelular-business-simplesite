"use client"

import { useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { PlusCircle, Trash2, Edit, X, Loader2, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
// import services
import { uploadImagesToimgBB,createProductVariants } from "@/services/products";

interface Variant {
    tempId: number;
    product_id: string;
    color: string;
    size: string;
    unit:string;
    size_unit:string;
    stock: number;
    branch_id:number;
    min_stock: number;
    images: File[];
}

interface ProductVariantFormProps {
    productId: string;
    productName: string;
}

const emptyVariant = (productId: string): Variant => ({
    tempId: Date.now(),
    product_id: productId,
    color: "",
    size: "",
    unit:"",
    branch_id:5,
    size_unit:"",
    stock: 0,
    min_stock: 0,
    images: [],
});

const colors = [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Naranja",
    "Rosa",
    "Marron",
    "Gris",
    "Blanco",
    "Negro",
    "Bordo",
];
const units = ["kg","g","lb","cm","m","inch","xs","s","l","xl"];
const sizeunits=["clothing","dimensions","weight","other"]

export default function ProductVariantForm({
    productId,
    productName,
}: ProductVariantFormProps) {
    const [variants, setVariants] = useState<Variant[]>([]);
    const [editingVariantId, setEditingVariantId] = useState<number | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        tempId: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.tempId === tempId
                    ? {
                          ...variant,
                          [name]: name.includes("stock")
                              ? parseInt(value) || 0
                              : value,
                      }
                    : variant
            )
        );
    };

    const handleSelectChange = (
        tempId: number,
        name: keyof Variant,
        value: string
    ) => {
        console.log(value.toUpperCase());
        setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.tempId === tempId
                    ? { ...variant, [name]: value.toLocaleUpperCase() }
                    : variant
            )
        );
    };

    const handleImageChange = (tempId: number, files: File[]) => {
        setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.tempId === tempId
                    ? { ...variant, images: [...variant.images, ...files] }
                    : variant
            )
        );
    };

    const addVariant = () => {
        const newVariant = emptyVariant(productId);
        console.log("Adding variant:", newVariant);
        setVariants((prev) => [...prev, newVariant]);
        setEditingVariantId(newVariant.tempId);
    };

    const removeVariant = (tempId: number) => {
        setVariants((prev) =>
            prev.filter((variant) => variant.tempId !== tempId)
        );
        if (editingVariantId === tempId) {
            setEditingVariantId(null);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const variantsToSubmit = variants.map(({ tempId, ...rest }) => rest);
        // por cada variante cambio las imagenes por las urls
        const variantsWithImages = await Promise.all(
            variantsToSubmit.map(async (variant) => {
                const imagesUrls = await uploadImagesToimgBB(variant.images);
                console.log(imagesUrls)
                return { ...variant, images: imagesUrls };
            })
        );
        console.log("Variants with images:", variantsWithImages
        );
        

        try {
            // Simulate an API call
            const response = await createProductVariants({ variants: variantsWithImages})
            console.log("Variants submitted:", variantsWithImages);
            toast({
                title: "Success",
                description: "Variants have been saved successfully.",
            });
        } catch (error) {
            console.error("Error submitting variants:", error);
            toast({
                title: "Error",
                description: "There was a problem saving the variants.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderVariantForm = (variant: Variant) => (
        <motion.div
            key={variant.tempId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-card border rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-card-foreground">
                    Edit Variant
                </h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingVariantId(null)}
                    aria-label="Close edit">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`color-${variant.tempId}`}>Color</Label>
                    <Select
                        onValueChange={(value) =>
                            handleSelectChange(variant.tempId, "color", value)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                            {colors.map((color: any) => (
                                <SelectItem
                                    className="hover:bg-gray-600"
                                    key={color}
                                    value={color}>
                                    {color}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor={`Unit-${variant.tempId}`}>Unit</Label>
                    <Select
                        onValueChange={(value) =>
                            handleSelectChange(variant.tempId, "unit", value)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                            {units.map((unit: any) => (
                                <SelectItem
                                    className="hover:bg-gray-600"
                                    key={unit}
                                    value={unit}>
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor={`SizeUnit-${variant.tempId}`}>Size Unit</Label>
                    <Select
                        onValueChange={(value) =>
                            handleSelectChange(variant.tempId, "size_unit", value)
                        }>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Size Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                            {sizeunits.map((unit: any) => (
                                <SelectItem
                                    className="hover:bg-gray-600"
                                    key={unit}
                                    value={unit}>
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor={`size-${variant.tempId}`}>Size</Label>
                    <Input
                        id={`size-${variant.tempId}`}
                        name="size"
                        value={variant.size}
                        onChange={(e) => handleInputChange(variant.tempId, e)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor={`stock-${variant.tempId}`}>Stock</Label>
                    <Input
                        id={`stock-${variant.tempId}`}
                        name="stock"
                        type="number"
                        value={variant.stock}
                        onChange={(e) => handleInputChange(variant.tempId, e)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor={`min_stock-${variant.tempId}`}>
                        Min Stock
                    </Label>
                    <Input
                        id={`min_stock-${variant.tempId}`}
                        name="min_stock"
                        type="number"
                        value={variant.min_stock}
                        onChange={(e) => handleInputChange(variant.tempId, e)}
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <ImageUpload
                        onChange={(files) =>
                            handleImageChange(variant.tempId, files)
                        }
                    />
                </div>
            </div>
        </motion.div>
    );

    const renderVariantSummary = (variant: Variant) => (
        <motion.div
            key={variant.tempId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-card-foreground">
                    Variant Details
                </h4>
                <div className="flex space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingVariantId(variant.tempId)}
                        aria-label="Edit variant">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariant(variant.tempId)}
                        aria-label="Delete variant">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                Color: {variant.color}
            </p>
            <p className="text-sm text-muted-foreground">
                Size: {variant.size}
            </p>
            <p className="text-sm text-muted-foreground">
                Stock: {variant.stock}
            </p>
            {variant.images.length > 0 && (
                <div className="mt-2">
                    <ImageIcon className="h-4 w-4 inline-block mr-1" />
                    <span className="text-sm text-muted-foreground">
                        {variant.images.length} image(s) uploaded
                    </span>
                </div>
            )}
        </motion.div>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto space-y-6 p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">
                    Product: {productName}
                </h2>
                <p className="text-sm text-muted-foreground">ID: {productId}</p>
            </div>
            <div className="space-y-4">
                <AnimatePresence>
                    {variants.map((variant) =>
                        editingVariantId === variant.tempId
                            ? renderVariantForm(variant)
                            : renderVariantSummary(variant)
                    )}
                </AnimatePresence>
            </div>
            <Button
                type="button"
                variant="outline"
                onClick={addVariant}
                className="w-full">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Variant
            </Button>
            <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    "Save Variants"
                )}
            </Button>
        </form>
    );
}