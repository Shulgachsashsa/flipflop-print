import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Category, Subcategory, Product } from "@shared/schema";

export default function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const openCategory = async (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setProducts([]);
    
    try {
      const response = await fetch(`/api/categories/${category.id}/subcategories`);
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const openSubcategory = async (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    
    try {
      const response = await fetch(`/api/subcategories/${subcategory.id}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const backToSubcategories = () => {
    setSelectedSubcategory(null);
    setProducts([]);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSubcategories([]);
    setProducts([]);
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case "Premium":
        return "bg-blue-100 text-blue-800";
      case "Standard":
        return "bg-gray-100 text-gray-800";
      case "Exclusive":
        return "bg-yellow-100 text-yellow-800";
      case "Durable":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <section id="catalog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Каталог продукции
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Широкий ассортимент полиграфической продукции для оптовых покупателей
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-300" />
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-24" />
                    <div className="h-6 w-6 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Каталог продукции
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Широкий ассортимент полиграфической продукции для оптовых покупателей
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white border-2 border-blue-100 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group cursor-pointer overflow-hidden"
              onClick={() => openCategory(category)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-gradient-to-b from-white to-blue-50">
                <h3 className="text-center text-sm font-bold text-blue-900 mb-2">
                  {category.name}
                </h3>
                <div className="flex justify-center">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    {category.subcategoryCount} видов
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category/Subcategory Modal */}
        <Dialog open={!!selectedCategory} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
                {selectedSubcategory && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={backToSubcategories}
                    className="mr-3"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                {selectedSubcategory ? selectedSubcategory.name : selectedCategory?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[70vh]">
              {!selectedSubcategory ? (
                // Show subcategories
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="bg-white border-2 border-blue-100 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden group"
                      onClick={() => openSubcategory(subcategory)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={subcategory.imageUrl}
                          alt={subcategory.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 bg-gradient-to-b from-white to-blue-50">
                        <h4 className="font-bold text-blue-900 text-center text-sm mb-2">{subcategory.name}</h4>
                        <div className="flex justify-center">
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                            {subcategory.productCount} товаров
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show products
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border-2 border-blue-100 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-b from-white to-blue-50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-blue-900 text-sm">{product.name}</h4>
                          {product.badge && (
                            <Badge className="bg-blue-600 text-white text-xs">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-900">{product.price}</span>
                          <Button
                            onClick={() => window.open(product.wbUrl, "_blank")}
                            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
                            size="sm"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Перейти на WB
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
