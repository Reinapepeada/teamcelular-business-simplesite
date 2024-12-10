'use server'
import { getbrands } from "@/services/brands";
import {
    SelectContent,
    SelectItem,
} from "@radix-ui/react-select";

export default function SelectBrand() {
    const brands = await getbrands();
    return (
        <SelectContent>
            {brands.map((brand: any) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                </SelectItem>
            ))}
        </SelectContent>
    );
}
