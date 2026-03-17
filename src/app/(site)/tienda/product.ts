// Enums matching API
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
export type Color = 'ROJO' | 'AZUL' | 'VERDE' | 'AMARILLO' | 'NARANJA' | 'VIOLETA' | 'ROSADO' | 'MARRON' | 'GRIS' | 'BLANCO' | 'NEGRO' | 'BORDO';
export type SizeUnit = 'CLOTHING' | 'DIMENSIONS' | 'WEIGHT' | 'OTHER';
export type Unit = 'KG' | 'G' | 'LB' | 'CM' | 'M' | 'INCH' | 'XS' | 'S' | 'L' | 'XL' | 'XXL';
export type WarrantyUnit = 'DAYS' | 'MONTHS' | 'YEARS';

export interface ProductImage {
  id: number;
  variant_id: number;
  image_url: string;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  color: Color | null;
  size: string | null;
  size_unit: SizeUnit | null;
  unit: Unit | null;
  branch_id: number | null;
  stock: number;
  min_stock?: number;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Brand {
  id: number;
  name: string;
  created_at: string;
}

export interface Branch {
  id: number;
  name: string;
  location: string | null;
  created_at: string;
}

export interface Product {
  id: number;
  serial_number: string;
  name: string;
  description: string | null;
  brand_id: number | null;
  category_id?: number | null;
  warranty_time: number | null;
  warranty_unit: WarrantyUnit | null;
  cost: number;
  retail_price: number;
  status: ProductStatus;
  category: Category | null;
  brand: Brand | null;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
}

// Paginated response from API
export interface ProductsPaginatedResponse {
  products: Product[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Price range response
export interface PriceRangeResponse {
  min: string;
  max: string;
}

// Create/Update DTOs
export interface CreateProductDTO {
  serial_number: string;
  name: string;
  description?: string | null;
  brand_id?: number | null;
  category_id?: number | null;
  warranty_time?: number | null;
  warranty_unit?: WarrantyUnit | null;
  cost: number;
  retail_price: number;
  status?: ProductStatus;
}

export interface UpdateProductDTO {
  serial_number?: string | null;
  name?: string | null;
  description?: string | null;
  brand_id?: number | null;
  category_id?: number | null;
  warranty_time?: number | null;
  warranty_unit?: WarrantyUnit | null;
  cost?: number | null;
  retail_price?: number | null;
  status?: ProductStatus | null;
}

export interface CreateVariantDTO {
  product_id: number;
  color?: Color | null;
  size?: string | null;
  size_unit?: SizeUnit | null;
  unit?: Unit | null;
  branch_id?: number | null;
  stock?: number;
  min_stock?: number;
  images?: string[];
}

export interface UpdateVariantDTO {
  color?: Color | null;
  size?: string | null;
  size_unit?: SizeUnit | null;
  unit?: Unit | null;
  branch_id?: number | null;
  stock?: number | null;
}

// Filter params for products
export interface ProductFiltersParams {
  page?: number;
  size?: number;
  categories?: string;
  brands?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Legacy aliases for backward compatibility
export type Image = ProductImage;
export type Variant = ProductVariant;
  
  