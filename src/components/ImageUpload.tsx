import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from 'lucide-react'

interface ImageUploadProps {
  onChange: (files: File[]) => void
}

const MAX_SIZE = 1200;

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [fullSizeIndex, setFullSizeIndex] = useState<number | null>(null)

  const closeFullSizeImage = useCallback(() => {
    setFullSizeIndex(null)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullSizeImage()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeFullSizeImage])

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }
          }, 'image/jpeg', 0.95);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const resizedFiles: File[] = []
    const newPreviews: string[] = []

    for (const file of files) {
      const resizedFile = await resizeImage(file)
      resizedFiles.push(resizedFile)
      newPreviews.push(URL.createObjectURL(resizedFile))
    }

    setPreviews(prev => [...prev, ...newPreviews])
    onChange(resizedFiles)
  }

  const handleRemove = async (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
    const updatedPreviews = previews.filter((_, i) => i !== index)
    const resizedFiles = await Promise.all(updatedPreviews.map(async (url) => {
      const response = await fetch(url)
      const blob = await response.blob()
      return new File([blob], "image.jpg", { type: "image/jpeg" })
    }))
    onChange(resizedFiles)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">Variant Images (Max 1200x1200px)</Label>
      <div className="flex flex-wrap gap-2">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`Variant preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md cursor-pointer"
              onClick={() => setFullSizeIndex(index)}
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1 right-1 rounded-full w-6 h-6 p-0 bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3 text-white" />
            </Button>
          </div>
        ))}
        <label 
          htmlFor="image-upload" 
          className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
        >
          <Plus className="h-6 w-6 text-gray-400" />
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </label>
      </div>
      {fullSizeIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" 
          onClick={closeFullSizeImage}
        >
          <div className="relative max-w-full max-h-full w-full h-full flex items-center justify-center">
            <img
              src={previews[fullSizeIndex]}
              alt={`Full size variant ${fullSizeIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation()
                closeFullSizeImage()
              }}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

