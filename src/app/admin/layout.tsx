import { Toaster } from "@/components/ui/toaster"
 
export default function RootLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
  return (
    <>
    {children}
    <Toaster />
    </>
      
  )
}