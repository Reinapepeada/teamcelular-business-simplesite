import { Product } from './product';
const generateMockProducts = (count: number): Product[] => {
    const products: Product[] = [];
    const categories = ['Smartphones', 'Tablets', 'Laptops', 'Accessories', 'Repair Tools'];
    const brands = ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'OnePlus'];
    const colors = ['Black', 'White', 'Blue', 'Red', 'Green'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
    for (let i = 1; i <= count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      
      const product: Product = {
        id: i,
        serial_number: `SN${i.toString().padStart(6, '0')}`,
        name: `${brand} ${category} ${i}`,
        description: `High-quality ${category.toLowerCase()} from ${brand}`,
        brand_id: Math.floor(Math.random() * 5) + 1,
        warranty_time: Math.floor(Math.random() * 24) + 12,
        warranty_unit: 'MONTHS',
        cost: Math.floor(Math.random() * 500) + 100,
        wholesale_price: Math.floor(Math.random() * 800) + 200,
        retail_price: Math.floor(Math.random() * 1000) + 300,
        status: 'ACTIVE',
        category: {
          description: `${category} category`,
          created_at: new Date().toISOString(),
          id: Math.floor(Math.random() * 5) + 1,
          name: category,
        },
        provider: {
          id: Math.floor(Math.random() * 5) + 1,
          phone: null,
          address: null,
          name: `${brand} Provider`,
          email: null,
          created_at: new Date().toISOString(),
        },
        brand: {
          id: Math.floor(Math.random() * 5) + 1,
          created_at: new Date().toISOString(),
          name: brand,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        variants: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, index) => ({
          id: i * 100 + index,
          product_id: i,
          sku: `SKU-${i}-${index}`,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: sizes[Math.floor(Math.random() * sizes.length)],
          size_unit: 'STANDARD',
          unit: 'PCS',
          branch_id: Math.floor(Math.random() * 5) + 1,
          stock: Math.floor(Math.random() * 100) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          images: [{
            id: i * 1000 + index,
            variant_id: i * 100 + index,
            image_url: `/placeholder.svg?height=300&width=300&text=${brand}+${category}`,
            created_at: new Date().toISOString(),
          }],
        })),
      };
      products.push(product);
    }
    return products;
  };
  
  export const mockProducts = generateMockProducts(100);
  