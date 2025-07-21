import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    phone: '',
    images: [] as File[]
  });

  const categories = [
    'Автомобили',
    'Недвижимость', 
    'Электроника',
    'Мода и стиль',
    'Дом и сад',
    'Спорт и отдых',
    'Книги и журналы',
    'Детские товары',
    'Животные',
    'Разное'
  ];

  const conditions = [
    'Новое',
    'Как новое', 
    'Отличное',
    'Хорошее',
    'Удовлетворительное'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 8) // Максимум 8 фото
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки объявления
    console.log('Создание объявления:', formData);
    // Перенаправление на главную страницу
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <Icon name="ArrowLeft" size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-primary">Разместить объявление</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Фотографии */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Camera" size={20} className="mr-2" />
                  Фотографии товара
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Добавьте до 8 фотографий. Первая фотография станет главной.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6"
                        onClick={() => removeImage(index)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                            Главная
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Кнопка добавления фото */}
                  {formData.images.length < 8 && (
                    <label className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                      <Icon name="Plus" size={24} className="text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Добавить фото</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Основная информация */}
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Категория*</Label>
                  <Select value={formData.category} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Название объявления*</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Например: iPhone 13 Pro Max 256GB"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Описание*</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Опишите товар подробно: состояние, комплектация, причина продажи..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Цена*</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="condition">Состояние*</Label>
                    <Select value={formData.condition} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, condition: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите состояние" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Контактная информация */}
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Местоположение*</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Город, район"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Номер телефона*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="flex-1">
                <Icon name="Check" size={20} className="mr-2" />
                Опубликовать объявление
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/')}>
                Отмена
              </Button>
            </div>
          </form>

          {/* Подсказки */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Icon name="Lightbulb" size={20} className="mr-2 text-secondary" />
                Советы для успешной продажи
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 text-secondary mt-0.5" />
                  Добавьте качественные фотографии с разных ракурсов
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 text-secondary mt-0.5" />
                  Укажите честное состояние товара и все дефекты
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 text-secondary mt-0.5" />
                  Напишите подробное описание с характеристиками
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 text-secondary mt-0.5" />
                  Установите справедливую цену, изучив похожие объявления
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;