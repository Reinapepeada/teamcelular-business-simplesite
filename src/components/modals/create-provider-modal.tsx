"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { createProvider } from "@/services/providers";
import { revalidatePathCreateProducts } from "@/services/revalidate";

export default function CreateProviderModal({
    isOpen,
    setIsOpen,
}: Readonly<{ isOpen: boolean; setIsOpen: (open: boolean) => void }>) {
    const [providerName, setProviderName] = useState("");
    const [providerEmail, setProviderEmail] = useState("");
    const [providerPhone, setProviderPhone] = useState("");
    const [providerAddress, setProviderAddress] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createProvider({
            name: providerName,
            email: providerEmail,
            phone: providerPhone,
            address: providerAddress,
        });
        if (response.id) {
            revalidatePathCreateProducts();
            setIsOpen(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <AnimatePresence>
                {isOpen && (
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-yellow-400" />
                                    Create Your Provider
                                </DialogTitle>
                                <DialogDescription className="text-indigo-500">
                                    Enter a name for your new provider. Make it
                                    memorable!
                                </DialogDescription>
                            </DialogHeader>
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="providerName"
                                        className="text-sm font-medium text-gray-700">
                                        Provider Name
                                    </Label>
                                    <Input
                                        id="providerName"
                                        value={providerName}
                                        onChange={(e) =>
                                            setProviderName(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your provider name"
                                        required
                                    />
                                    <Label
                                        htmlFor="providerEmail"
                                        className="text-sm font-medium text-gray-700">
                                        Email
                                    </Label>
                                    <Input
                                        id="providerEmail"
                                        value={providerEmail}
                                        onChange={(e) =>
                                            setProviderEmail(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your provider email"
                                    />
                                    <Label
                                        htmlFor="providerPhone"
                                        className="text-sm font-medium text-gray-700">
                                        Phone
                                    </Label>
                                    <Input
                                        id="providerPhone"
                                        value={providerPhone}
                                        onChange={(e) =>
                                            setProviderPhone(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your provider phone"
                                    />
                                    <Label
                                        htmlFor="providerAddress"
                                        className="text-sm font-medium text-gray-700">
                                        Address
                                    </Label>
                                    <Input
                                        id="providerAddress"
                                        value={providerAddress}
                                        onChange={(e) =>
                                            setProviderAddress(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter your provider address"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Create Provider
                                </Button>
                            </motion.form>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}
