"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CreateBrandModal from "@/components/modals/create-brand-modal";
import { deleteBrand, getbrands, updateBrand } from "@/services/brands";
import { getToken } from "@/services/auth";
import type { Brand } from "@/app/tienda/product";

type BrandEditState = {
    id: number;
    name: string;
};

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editState, setEditState] = useState<BrandEditState | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchBrands = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getbrands();
            setBrands(data || []);
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudieron cargar las marcas",
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const handleCreateOpenChange = (open: boolean) => {
        setCreateOpen(open);
        if (!open) {
            fetchBrands();
        }
    };

    const filteredBrands = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return brands;
        return brands.filter((brand) => brand.name?.toLowerCase().includes(term));
    }, [brands, searchTerm]);

    const handleEditClick = (brand: Brand) => {
        setEditState({
            id: brand.id,
            name: brand.name || "",
        });
        setEditOpen(true);
    };

    const handleEditSave = async () => {
        if (!editState) return;
        const trimmedName = editState.name.trim();
        if (!trimmedName) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "El nombre es obligatorio",
            });
            return;
        }

        const token = getToken();
        if (!token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes iniciar sesion para editar marcas.",
            });
            return;
        }

        setIsSaving(true);
        try {
            await updateBrand(editState.id, { name: trimmedName }, token);
            toast({
                title: "Marca actualizada",
                description: `Se guardaron los cambios en "${trimmedName}".`,
            });
            setEditOpen(false);
            setEditState(null);
            fetchBrands();
        } catch (error) {
            console.error("Error updating brand:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo actualizar la marca",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = (brand: Brand) => {
        setBrandToDelete(brand);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!brandToDelete) return;
        const token = getToken();
        if (!token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes iniciar sesion para eliminar marcas.",
            });
            return;
        }

        setIsDeleting(true);
        try {
            await deleteBrand(brandToDelete.id, token);
            toast({
                title: "Marca eliminada",
                description: `"${brandToDelete.name}" fue eliminada correctamente.`,
            });
            setDeleteOpen(false);
            setBrandToDelete(null);
            fetchBrands();
        } catch (error) {
            console.error("Error deleting brand:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar la marca",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {createOpen && (
                <CreateBrandModal isOpen={createOpen} setIsOpen={handleCreateOpenChange} />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Marcas</h1>
                    <p className="text-muted-foreground">Administra las marcas disponibles</p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva marca
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de marcas</CardTitle>
                    <CardDescription>{filteredBrands.length} marca(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : filteredBrands.length === 0 ? (
                        <p className="text-center text-muted-foreground py-12">
                            No hay marcas para mostrar
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead className="w-40">Creado</TableHead>
                                        <TableHead className="w-28 text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBrands.map((brand) => (
                                        <TableRow key={brand.id}>
                                            <TableCell className="font-medium">{brand.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {brand.created_at
                                                    ? new Date(brand.created_at).toLocaleDateString()
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEditClick(brand)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(brand)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={editOpen}
                onOpenChange={(open) => {
                    setEditOpen(open);
                    if (!open) setEditState(null);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar marca</DialogTitle>
                        <DialogDescription>Actualiza el nombre de la marca.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="edit-brand-name">Nombre</Label>
                        <Input
                            id="edit-brand-name"
                            value={editState?.name || ""}
                            onChange={(event) =>
                                setEditState((prev) =>
                                    prev ? { ...prev, name: event.target.value } : prev
                                )
                            }
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleEditSave} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                "Guardar"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar marca?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no se puede deshacer. Se eliminara permanentemente
                            <span className="font-semibold"> &quot;{brandToDelete?.name}&quot;</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
