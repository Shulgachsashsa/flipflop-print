import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import CategoryManagement from "@/components/admin/category-management";
import SubcategoryManagement from "@/components/admin/subcategory-management";
import ProductDetailManagement from "@/components/admin/product-detail-management";
import SimpleTestimonialManagement from "@/components/admin/simple-testimonial-management";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на сайт
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600">Управление содержимым сайта FlipFlop Print</p>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="subcategories">Подкатегории</TabsTrigger>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="testimonials">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Управление категориями</CardTitle>
                <CardDescription>
                  Добавляйте, редактируйте и удаляйте категории каталога
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subcategories">
            <Card>
              <CardHeader>
                <CardTitle>Управление подкатегориями</CardTitle>
                <CardDescription>
                  Добавляйте и редактируйте подкатегории в категориях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubcategoryManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Управление товарами</CardTitle>
                <CardDescription>
                  Добавляйте и редактируйте товары в подкатегориях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductDetailManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Управление отзывами</CardTitle>
                <CardDescription>
                  Добавляйте и редактируйте отзывы клиентов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleTestimonialManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
