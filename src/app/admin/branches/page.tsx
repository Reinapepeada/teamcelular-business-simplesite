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
import CreateBranchModal from "@/components/modals/create-branch-modal";
import { deleteBranch, getbranches, updateBranch } from "@/services/branches";
import { getToken } from "@/services/auth";
import type { Branch } from "@/app/tienda/product";

type BranchEditState = {
    id: number;
    name: string;
    location: string;
};

export default function BranchesPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editState, setEditState] = useState<BranchEditState | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchBranches = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getbranches();
            setBranches(data || []);
        } catch (error) {
            console.error("Error fetching branches:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudieron cargar las sucursales",
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    const handleCreateOpenChange = (open: boolean) => {
        setCreateOpen(open);
        if (!open) {
            fetchBranches();
        }
    };

    const filteredBranches = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return branches;
        return branches.filter((branch) => {
            const nameMatch = branch.name?.toLowerCase().includes(term);
            const locationMatch = branch.location?.toLowerCase().includes(term);
            return nameMatch || locationMatch;
        });
    }, [branches, searchTerm]);

    const handleEditClick = (branch: Branch) => {
        setEditState({
            id: branch.id,
            name: branch.name || "",
            location: branch.location || "",
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
                description: "Debes iniciar sesion para editar sucursales.",
            });
            return;
        }

        setIsSaving(true);
        try {
            await updateBranch(
                editState.id,
                {
                    name: trimmedName,
                    location: editState.location.trim() || null,
                },
                token
            );
            toast({
                title: "Sucursal actualizada",
                description: `Se guardaron los cambios en "${trimmedName}".`,
            });
            setEditOpen(false);
            setEditState(null);
            fetchBranches();
        } catch (error) {
            console.error("Error updating branch:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo actualizar la sucursal",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = (branch: Branch) => {
        setBranchToDelete(branch);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!branchToDelete) return;
        const token = getToken();
        if (!token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes iniciar sesion para eliminar sucursales.",
            });
            return;
        }

        setIsDeleting(true);
        try {
            await deleteBranch(branchToDelete.id, token);
            toast({
                title: "Sucursal eliminada",
                description: `"${branchToDelete.name}" fue eliminada correctamente.`,
            });
            setDeleteOpen(false);
            setBranchToDelete(null);
            fetchBranches();
        } catch (error) {
            console.error("Error deleting branch:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar la sucursal",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {createOpen && (
                <CreateBranchModal isOpen={createOpen} setIsOpen={handleCreateOpenChange} />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Sucursales</h1>
                    <p className="text-muted-foreground">Administra las sucursales disponibles</p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva sucursal
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre o direccion..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de sucursales</CardTitle>
                    <CardDescription>{filteredBranches.length} sucursal(es)</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : filteredBranches.length === 0 ? (
                        <p className="text-center text-muted-foreground py-12">
                            No hay sucursales para mostrar
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Direccion</TableHead>
                                        <TableHead className="w-40">Creado</TableHead>
                                        <TableHead className="w-28 text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBranches.map((branch) => (
                                        <TableRow key={branch.id}>
                                            <TableCell className="font-medium">{branch.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                                                {branch.location || "-"}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {branch.created_at
                                                    ? new Date(branch.created_at).toLocaleDateString()
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEditClick(branch)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(branch)}
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
                        <DialogTitle>Editar sucursal</DialogTitle>
                        <DialogDescription>Actualiza los datos de la sucursal.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-branch-name">Nombre</Label>
                            <Input
                                id="edit-branch-name"
                                value={editState?.name || ""}
                                onChange={(event) =>
                                    setEditState((prev) =>
                                        prev ? { ...prev, name: event.target.value } : prev
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-branch-location">Direccion</Label>
                            <Input
                                id="edit-branch-location"
                                value={editState?.location || ""}
                                onChange={(event) =>
                                    setEditState((prev) =>
                                        prev ? { ...prev, location: event.target.value } : prev
                                    )
                                }
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
                        <AlertDialogTitle>Eliminar sucursal?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no se puede deshacer. Se eliminara permanentemente
                            <span className="font-semibold"> &quot;{branchToDelete?.name}&quot;</span>.
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
