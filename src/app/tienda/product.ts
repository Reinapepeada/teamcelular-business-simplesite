export interface Image {
    id: number;
    variant_id: number;
    image_url: string;
    created_at: string;
  }
  
  export interface Variant {
    id: number;
    product_id: number;
    sku: string;
    color: string;
    size: string;
    size_unit: string;
    unit: string;
    branch_id: number;
    stock: number;
    created_at: string;
    updated_at: string;
    images: Image[];
  }
  
  export interface Product {
    id: number;
    serial_number: string;
    name: string;
    description: string;
    brand_id: number;
    warranty_time: number;
    warranty_unit: string;
    cost: number;
    wholesale_price: number;
    retail_price: number;
    status: string;
    category: {
      description: string;
      created_at: string;
      id: number;
      name: string;
    };
    provider: {
      id: number;
      phone: string | null;
      address: string | null;
      name: string;
      email: string | null;
      created_at: string;
    };
    brand: {
      id: number;
      created_at: string;
      name: string;
    };
    created_at: string;
    updated_at: string;
    variants: Variant[];
  }
  
  