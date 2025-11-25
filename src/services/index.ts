// Export all services for easy importing
// Usage: import { getbrands, getcategories, getAllProductsPaginated } from '@/services'

// Products
export {
    createProduct,
    getProductById,
    getAllProducts,
    getAllProductsPaginated,
    getMinMaxPrice,
    updateProduct,
    deleteProduct,
    createProductVariants,
    getVariantsByProductId,
    updateProductVariant,
    deleteProductVariant,
    uploadImagesToimgBB,
    calculateTotalStock,
    getPrimaryImage,
    getAllProductImages,
    formatPrice,
    getAvailableColors,
    getAvailableSizes,
    apiUrl,
    imgBBKey,
} from './products';

// Categories
export {
    getcategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from './categories';

// Brands
export {
    getbrands,
    createBrand,
    updateBrand,
    deleteBrand,
} from './brands';

// Branches
export {
    getbranches,
    createBranch,
    updateBranch,
    deleteBranch,
} from './branches';
