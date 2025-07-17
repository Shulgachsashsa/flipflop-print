import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, apiGet, queryClient } from "@/lib/queryClient";
import { insertProductSchema } from "@shared/schema";
import type { Category, Subcategory, Product, InsertProduct } from "@shared/schema";

export default function ProductDetailManagement() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: subcategories } = useQuery({
    queryKey: ["/api/categories", selectedCategoryId, "subcategories"],
    queryFn: () => apiGet<Subcategory[]>(`/api/categories/${selectedCategoryId}/subcategories`),
    enabled: !!selectedCategoryId,
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/subcategories", selectedSubcategoryId, "products"],
    queryFn: () => apiGet<Product[]>(`/api/subcategories/${selectedSubcategoryId}/products`),
    enabled: !!selectedSubcategoryId,
  });

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      subcategoryId: 0,
      name: "",
      description: "",
      price: "",
      badge: "",
      wbUrl: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertProduct) => apiRequest("POST", "/api/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subcategories", selectedSubcategoryId, "products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Товар создан успешно" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Ошибка создания товара", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertProduct> }) =>
      apiRequest("PUT", `/api/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subcategories", selectedSubcategoryId, "products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Товар обновлен успешно" });
      setIsDialogOpen(false);
      setEditingProduct(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Ошибка обновления товара", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subcategories", selectedSubcategoryId, "products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Товар удален успешно" });
    },
    onError: () => {
      toast({ title: "Ошибка удаления товара", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertProduct) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    form.setValue("subcategoryId", product.subcategoryId);
    form.setValue("name", product.name);
    form.setValue("description", product.description);
    form.setValue("price", product.price);
    form.setValue("badge", product.badge || "");
    form.setValue("wbUrl", product.wbUrl);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    if (!selectedSubcategoryId) return;
    setEditingProduct(null);
    form.reset();
    form.setValue("subcategoryId", selectedSubcategoryId);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот товар?")) {
      deleteMutation.mutate(id);
    }
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Выберите категорию</label>
          <Select value={selectedCategoryId?.toString() || ""} onValueChange={(value) => {
            setSelectedCategoryId(parseInt(value));
            setSelectedSubcategoryId(null);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategoryId && (
          <div>
            <label className="block text-sm font-medium mb-2">Выберите подкатегорию</label>
            <Select value={selectedSubcategoryId?.toString() || ""} onValueChange={(value) => setSelectedSubcategoryId(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите подкатегорию" />
              </SelectTrigger>
              <SelectContent>
                {subcategories?.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedSubcategoryId && (
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Товары в подкатегории</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto pb-20">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Редактировать товар" : "Создать товар"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите название товара" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Описание</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Введите описание товара" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Цена</FormLabel>
                          <FormControl>
                            <Input placeholder="от 1,50 руб." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="badge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Метка (необязательно)</FormLabel>
                          <FormControl>
                            <Select value={field.value || ""} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите метку" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Без метки</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Exclusive">Exclusive</SelectItem>
                                <SelectItem value="Durable">Durable</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wbUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ссылка на WB</FormLabel>
                          <FormControl>
                            <Input placeholder="https://wildberries.by/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL фотографии</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/product.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        {editingProduct ? "Обновить" : "Создать"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {selectedSubcategoryId && (
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-20" />
                    <div className="flex space-x-2">
                      <div className="h-8 w-16 bg-gray-300 rounded" />
                      <div className="h-8 w-16 bg-gray-300 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        {product.badge && (
                          <Badge className={getBadgeColor(product.badge)}>
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <a
                          href={product.wbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          WB ссылка
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Товары в этой подкатегории не найдены
            </p>
          )}
        </div>
      )}

      {!selectedSubcategoryId && selectedCategoryId && (
        <p className="text-center text-gray-500 py-8">
          Выберите подкатегорию для управления товарами
        </p>
      )}

      {!selectedCategoryId && (
        <p className="text-center text-gray-500 py-8">
          Выберите категорию и подкатегорию для управления товарами
        </p>
      )}
    </div>
  );
}