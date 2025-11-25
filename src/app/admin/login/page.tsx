"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, User, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { login, getCurrentAdmin, saveSession, AuthError } from "@/services/auth";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Intentar login con la API
            const response = await login(credentials.username, credentials.password);
            
            // Obtener información del usuario
            let user = null;
            try {
                user = await getCurrentAdmin(response.access_token);
            } catch (userError) {
                console.warn('No se pudo obtener información del usuario:', userError);
            }

            // Guardar sesión
            saveSession(response.access_token, user);
            
            toast({
                title: "¡Bienvenido!",
                description: user 
                    ? `Inicio de sesión exitoso como ${user.username} (${user.role})`
                    : "Inicio de sesión exitoso",
            });
            
            router.push("/admin");
            router.refresh();
            
        } catch (err) {
            console.error('Error de login:', err);
            
            let errorMessage = "Error al iniciar sesión";
            
            if (err instanceof AuthError) {
                switch (err.status) {
                    case 401:
                        errorMessage = "Usuario o contraseña incorrectos";
                        break;
                    case 403:
                        errorMessage = "Cuenta deshabilitada. Contacta al administrador.";
                        break;
                    case 422:
                        errorMessage = "Por favor completa todos los campos";
                        break;
                    case 500:
                        errorMessage = "Error del servidor. Intenta más tarde.";
                        break;
                    default:
                        errorMessage = err.message;
                }
            } else if (err instanceof TypeError && err.message.includes('fetch')) {
                errorMessage = "No se puede conectar al servidor. Verifica tu conexión.";
            }
            
            setError(errorMessage);
            
            toast({
                variant: "destructive",
                title: "Error de autenticación",
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card>
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <motion.div 
                                className="p-3 rounded-full bg-primary/10"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </motion.div>
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            Panel de Administración
                        </CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder al sistema
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                            
                            <div className="space-y-2">
                                <Label htmlFor="username">Usuario</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Ingresa tu usuario"
                                        className="pl-10"
                                        value={credentials.username}
                                        onChange={(e) => {
                                            setError(null);
                                            setCredentials(prev => ({
                                                ...prev,
                                                username: e.target.value
                                            }));
                                        }}
                                        disabled={isLoading}
                                        required
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu contraseña"
                                        className="pl-10 pr-10"
                                        value={credentials.password}
                                        onChange={(e) => {
                                            setError(null);
                                            setCredentials(prev => ({
                                                ...prev,
                                                password: e.target.value
                                            }));
                                        }}
                                        disabled={isLoading}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verificando...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Ingresar
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                        <p>Sistema seguro de administración</p>
                        <p className="text-xs">
                            Solo personal autorizado
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
