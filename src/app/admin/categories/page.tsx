"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import CreateCategoryModal from "@/components/modals/create-category-modal";
import { deleteCategory, getcategories, updateCategory } from "@/services/categories";
import { getToken } from "@/services/auth";
import type { Category } from "@/app/tienda/product";

type CategoryEditState = {
    id: number;
    name: string;
    description: string;
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editState, setEditState] = useState<CategoryEditState | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getcategories();
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudieron cargar las categorias",
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCreateOpenChange = (open: boolean) => {
        setCreateOpen(open);
        if (!open) {
            fetchCategories();
        }
    };

    const filteredCategories = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return categories;
        return categories.filter((category) => {
            const nameMatch = category.name?.toLowerCase().includes(term);
            const descriptionMatch = category.description?.toLowerCase().includes(term);
            return nameMatch || descriptionMatch;
        });
    }, [categories, searchTerm]);

    const handleEditClick = (category: Category) => {
        setEditState({
            id: category.id,
            name: category.name || "",
            description: category.description || "",
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
                description: "Debes iniciar sesion para editar categorias.",
            });
            return;
        }

        setIsSaving(true);
        try {
            await updateCategory(
                editState.id,
                {
                    name: trimmedName,
                    description: editState.description.trim() || null,
                },
                token
            );
            toast({
                title: "Categoria actualizada",
                description: `Se guardaron los cambios en "${trimmedName}".`,
            });
            setEditOpen(false);
            setEditState(null);
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo actualizar la categoria",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return;
        const token = getToken();
        if (!token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes iniciar sesion para eliminar categorias.",
            });
            return;
        }

        setIsDeleting(true);
        try {
            await deleteCategory(categoryToDelete.id, token);
            toast({
                title: "Categoria eliminada",
                description: `"${categoryToDelete.name}" fue eliminada correctamente.`,
            });
            setDeleteOpen(false);
            setCategoryToDelete(null);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar la categoria",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {createOpen && (
                <CreateCategoryModal isOpen={createOpen} setIsOpen={handleCreateOpenChange} />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Categorias</h1>
                    <p className="text-muted-foreground">
                        Administra las categorias de productos
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva categoria
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o descripcion..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de categorias</CardTitle>
                    <CardDescription>
                        {filteredCategories.length} categoria(s)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <p className="text-center text-muted-foreground py-12">
                            No hay categorias para mostrar
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Descripcion</TableHead>
                                        <TableHead className="w-40">Creado</TableHead>
                                        <TableHead className="w-28 text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                                                {category.description || "-"}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {category.created_at
                                                    ? new Date(category.created_at).toLocaleDateString()
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEditClick(category)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(category)}
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
                        <DialogTitle>Editar categoria</DialogTitle>
                        <DialogDescription>Actualiza los datos de la categoria.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-category-name">Nombre</Label>
                            <Input
                                id="edit-category-name"
                                value={editState?.name || ""}
                                onChange={(event) =>
                                    setEditState((prev) =>
                                        prev
                                            ? { ...prev, name: event.target.value }
                                            : prev
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-category-description">Descripcion</Label>
                            <Textarea
                                id="edit-category-description"
                                value={editState?.description || ""}
                                onChange={(event) =>
                                    setEditState((prev) =>
                                        prev
                                            ? { ...prev, description: event.target.value }
                                            : prev
                                    )
                                }
                                rows={4}
                            />
                        </div>
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
                        <AlertDialogTitle>Eliminar categoria?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no se puede deshacer. Se eliminara permanentemente
                            <span className="font-semibold"> &quot;{categoryToDelete?.name}&quot;</span>.
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
