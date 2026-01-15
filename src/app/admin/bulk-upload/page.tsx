"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Upload,
    Download,
    FileSpreadsheet,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Loader2,
    FileText,
    ArrowRight,
    Info,
    RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
    downloadBulkUploadTemplate, 
    exportProducts, 
    uploadBulkProducts,
    type BulkUploadResult 
} from "@/services/products";

interface UploadStats {
    total_rows: number;
    successful: number;
    failed: number;
    skipped: number;
    updated_products: number;
    updated_variants: number;
}

export default function BulkUploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadResult, setUploadResult] = useState<BulkUploadResult | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [skipErrors, setSkipErrors] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDownloadTemplate = async () => {
        try {
            toast({
                title: "Descargando template...",
                description: "El archivo se descargará en breve",
            });
            await downloadBulkUploadTemplate();
            toast({
                title: "Template descargado",
                description: "El archivo template se ha descargado exitosamente",
            });
        } catch (error) {
            console.error("Error downloading template:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo descargar el template",
            });
        }
    };

    const handleExportProducts = async () => {
        try {
            toast({
                title: "Exportando productos...",
                description: "Esto puede tomar unos momentos",
            });
            await exportProducts();
            toast({
                title: "Productos exportados",
                description: "El archivo de productos se ha descargado exitosamente",
            });
        } catch (error) {
            console.error("Error exporting products:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo exportar los productos",
            });
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
                toast({
                    variant: "destructive",
                    title: "Archivo inválido",
                    description: "Por favor selecciona un archivo Excel (.xlsx o .xls)",
                });
                return;
            }
            setSelectedFile(file);
            setUploadResult(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast({
                variant: "destructive",
                title: "No hay archivo",
                description: "Por favor selecciona un archivo Excel primero",
            });
            return;
        }

        try {
            setIsUploading(true);
            setUploadProgress(0);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const result = await uploadBulkProducts(selectedFile, skipErrors);
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadResult(result);

            // Show summary toast
            if (result.failed === 0) {
                toast({
                    title: "✅ Carga completada",
                    description: `${result.successful} productos procesados exitosamente`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "⚠️ Carga completada con errores",
                    description: `${result.successful} exitosos, ${result.failed} fallidos`,
                });
            }
        } catch (error: any) {
            console.error("Error uploading file:", error);
            toast({
                variant: "destructive",
                title: "Error en la carga",
                description: error.message || "No se pudo procesar el archivo",
            });
            setUploadResult(null);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setUploadResult(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getSuccessRate = (): number => {
        if (!uploadResult || uploadResult.total_rows === 0) return 0;
        return (uploadResult.successful / uploadResult.total_rows) * 100;
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Carga Masiva de Productos</h1>
                    <p className="text-muted-foreground">
                        Importa o actualiza productos desde un archivo Excel
                    </p>
                </div>

                {/* Info Alert */}
                <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>¿Cómo funciona?</AlertTitle>
                    <AlertDescription>
                        <ol className="list-decimal list-inside space-y-1 mt-2">
                            <li>Descarga el template vacío o exporta productos existentes</li>
                            <li>Completa o modifica el archivo Excel</li>
                            <li>Sube el archivo para crear o actualizar productos automáticamente</li>
                        </ol>
                    </AlertDescription>
                </Alert>

                {/* Action Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Download Template */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileSpreadsheet className="h-5 w-5" />
                                Template Vacío
                            </CardTitle>
                            <CardDescription>
                                Descarga un archivo Excel vacío con ejemplos para empezar desde cero
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button 
                                onClick={handleDownloadTemplate}
                                variant="outline"
                                className="w-full"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Descargar Template
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Export Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Exportar Productos
                            </CardTitle>
                            <CardDescription>
                                Descarga todos los productos actuales para modificarlos o agregar nuevos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button 
                                onClick={handleExportProducts}
                                variant="outline"
                                className="w-full"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Exportar Productos
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Upload Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Subir Archivo Excel
                        </CardTitle>
                        <CardDescription>
                            Selecciona un archivo Excel (.xlsx) para procesar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* File Input */}
                            <div className="flex items-center gap-4">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" asChild>
                                        <span>
                                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                                            Seleccionar Archivo
                                        </span>
                                    </Button>
                                </label>
                                {selectedFile && (
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary">
                                            {selectedFile.name}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleReset}
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Skip Errors Option */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="skip-errors"
                                    checked={skipErrors}
                                    onChange={(e) => setSkipErrors(e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="skip-errors" className="text-sm text-muted-foreground">
                                    Continuar procesando aunque haya errores
                                </label>
                            </div>

                            {/* Upload Button */}
                            <Button
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                                className="w-full"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Cargar Productos
                                    </>
                                )}
                            </Button>

                            {/* Progress Bar */}
                            {isUploading && (
                                <div className="space-y-2">
                                    <Progress value={uploadProgress} className="w-full" />
                                    <p className="text-sm text-center text-muted-foreground">
                                        {uploadProgress}%
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <AnimatePresence>
                    {uploadResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        Resultados del Procesamiento
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 border rounded-lg">
                                            <p className="text-sm text-muted-foreground">Total Filas</p>
                                            <p className="text-2xl font-bold">{uploadResult.total_rows}</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                                            <p className="text-sm text-muted-foreground">Exitosos</p>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {uploadResult.successful}
                                            </p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950">
                                            <p className="text-sm text-muted-foreground">Fallidos</p>
                                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                {uploadResult.failed}
                                            </p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                                            <p className="text-sm text-muted-foreground">Omitidos</p>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {uploadResult.skipped}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Success Rate */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Tasa de Éxito</span>
                                            <span className="text-sm font-medium">
                                                {getSuccessRate().toFixed(1)}%
                                            </span>
                                        </div>
                                        <Progress value={getSuccessRate()} className="h-2" />
                                    </div>

                                    {/* Updates Summary */}
                                    {(uploadResult.updated_products > 0 || uploadResult.updated_variants > 0) && (
                                        <Alert>
                                            <RefreshCw className="h-4 w-4" />
                                            <AlertTitle>Actualizaciones Realizadas</AlertTitle>
                                            <AlertDescription>
                                                {uploadResult.updated_products > 0 && (
                                                    <p>{uploadResult.updated_products} productos actualizados</p>
                                                )}
                                                {uploadResult.updated_variants > 0 && (
                                                    <p>{uploadResult.updated_variants} variantes actualizadas</p>
                                                )}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Created Items */}
                                    {uploadResult.created_products && uploadResult.created_products.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                Productos Creados ({uploadResult.created_products.length})
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {uploadResult.created_products.slice(0, 10).map((serial, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {serial}
                                                    </Badge>
                                                ))}
                                                {uploadResult.created_products.length > 10 && (
                                                    <Badge variant="outline">
                                                        +{uploadResult.created_products.length - 10} más
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Errors Table */}
                                    {uploadResult.errors && uploadResult.errors.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                                                <XCircle className="h-4 w-4" />
                                                Errores Encontrados ({uploadResult.errors.length})
                                            </h4>
                                            <div className="border rounded-lg overflow-hidden">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-20">Fila</TableHead>
                                                            <TableHead className="w-40">Serial</TableHead>
                                                            <TableHead>Error</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {uploadResult.errors.slice(0, 10).map((error, idx) => (
                                                            <TableRow key={idx}>
                                                                <TableCell className="font-medium">
                                                                    {error.row}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge variant="destructive">
                                                                        {error.serial_number || 'N/A'}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell className="text-sm">
                                                                    {error.error}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            {uploadResult.errors.length > 10 && (
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Mostrando 10 de {uploadResult.errors.length} errores
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Warnings */}
                                    {uploadResult.warnings && uploadResult.warnings.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                                                <AlertCircle className="h-4 w-4" />
                                                Advertencias ({uploadResult.warnings.length})
                                            </h4>
                                            <div className="space-y-2">
                                                {uploadResult.warnings.slice(0, 5).map((warning, idx) => (
                                                    <Alert key={idx} variant="default">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <AlertDescription className="text-sm">
                                                            Fila {warning.row}: {warning.message}
                                                        </AlertDescription>
                                                    </Alert>
                                                ))}
                                                {uploadResult.warnings.length > 5 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        +{uploadResult.warnings.length - 5} advertencias más
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <div className="flex justify-end">
                                        <Button onClick={handleReset} variant="outline">
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Cargar Otro Archivo
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
