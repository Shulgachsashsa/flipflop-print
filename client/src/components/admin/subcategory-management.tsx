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
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, apiGet, queryClient } from "@/lib/queryClient";
import { insertSubcategorySchema } from "@shared/schema";
import type { Category, Subcategory, InsertSubcategory } from "@shared/schema";

export default function SubcategoryManagement() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: subcategories, isLoading } = useQuery({
    queryKey: ["/api/categories", selectedCategoryId, "subcategories"],
    queryFn: () => apiGet<Subcategory[]>(`/api/categories/${selectedCategoryId}/subcategories`),
    enabled: !!selectedCategoryId,
  });

  const form = useForm<InsertSubcategory>({
    resolver: zodResolver(insertSubcategorySchema),
    defaultValues: {
      categoryId: 0,
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertSubcategory) => apiRequest("POST", "/api/subcategories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories", selectedCategoryId, "subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Подкатегория создана успешно" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Ошибка создания подкатегории", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertSubcategory> }) =>
      apiRequest("PUT", `/api/subcategories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories", selectedCategoryId, "subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Подкатегория обновлена успешно" });
      setIsDialogOpen(false);
      setEditingSubcategory(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Ошибка обновления подкатегории", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/subcategories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories", selectedCategoryId, "subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Подкатегория удалена успешно" });
    },
    onError: () => {
      toast({ title: "Ошибка удаления подкатегории", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertSubcategory) => {
    if (editingSubcategory) {
      updateMutation.mutate({ id: editingSubcategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    form.setValue("categoryId", subcategory.categoryId);
    form.setValue("name", subcategory.name);
    form.setValue("description", subcategory.description);
    form.setValue("imageUrl", subcategory.imageUrl);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    if (!selectedCategoryId) return;
    setEditingSubcategory(null);
    form.reset();
    form.setValue("categoryId", selectedCategoryId);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту подкатегорию?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Выберите категорию</label>
          <Select value={selectedCategoryId?.toString() || ""} onValueChange={(value) => setSelectedCategoryId(parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию для управления подкатегориями" />
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
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Подкатегории в категории</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить подкатегорию
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingSubcategory ? "Редактировать подкатегорию" : "Создать подкатегорию"}
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
                            <Input placeholder="Введите название подкатегории" {...field} />
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
                            <Textarea placeholder="Введите описание подкатегории" {...field} />
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
                          <FormLabel>URL изображения</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
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
                        {editingSubcategory ? "Обновить" : "Создать"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {selectedCategoryId && (
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
          ) : subcategories && subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <Card key={subcategory.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{subcategory.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-2">{subcategory.description}</p>
                      <p className="text-xs text-gray-500 mb-2">
                        Товаров: {subcategory.productCount}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(subcategory)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(subcategory.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {subcategory.imageUrl && (
                  <CardContent className="pt-0">
                    <img
                      src={subcategory.imageUrl}
                      alt={subcategory.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Подкатегории в этой категории не найдены
            </p>
          )}
        </div>
      )}

      {!selectedCategoryId && (
        <p className="text-center text-gray-500 py-8">
          Выберите категорию для управления подкатегориями
        </p>
      )}
    </div>
  );
}