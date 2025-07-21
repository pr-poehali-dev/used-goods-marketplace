import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Автомобили', icon: 'Car', count: '12К+' },
    { name: 'Недвижимость', icon: 'Home', count: '8К+' },
    { name: 'Электроника', icon: 'Smartphone', count: '15К+' },
    { name: 'Мода', icon: 'Shirt', count: '6К+' },
    { name: 'Спорт', icon: 'Bike', count: '3К+' },
    { name: 'Книги', icon: 'Book', count: '2К+' },
    { name: 'Мебель', icon: 'Sofa', count: '4К+' },
    { name: 'Разное', icon: 'Package', count: '20К+' },
  ];

  const hotDeals = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max 256GB',
      price: '45,000 ₽',
      location: 'Москва',
      image: '/placeholder.svg',
      isNew: false,
      condition: 'Отличное',
    },
    {
      id: 2,
      title: 'BMW X5 2019',
      price: '2,800,000 ₽',
      location: 'Санкт-Петербург',
      image: '/placeholder.svg',
      isNew: false,
      condition: 'Хорошее',
    },
    {
      id: 3,
      title: 'MacBook Pro M1 16"',
      price: '95,000 ₽',
      location: 'Екатеринбург',
      image: '/placeholder.svg',
      isNew: false,
      condition: 'Как новое',
    },
    {
      id: 4,
      title: '2-комн квартира 65м²',
      price: '6,500,000 ₽',
      location: 'Новосибирск',
      image: '/placeholder.svg',
      isNew: true,
      condition: 'Новая',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">MarketPlace</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Избранное</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Помощь</a>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Разместить
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-accent">
            Найди всё, что нужно
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Покупай и продавай б/у товары безопасно. Тысячи предложений от проверенных продавцов.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Что ищем? Например: iPhone, BMW, квартира..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-14 text-lg border-2 border-primary/20 focus:border-primary"
              />
              <Button 
                size="lg" 
                className="absolute right-1 top-1 bottom-1 px-6 bg-primary hover:bg-primary/90"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">70К+</div>
              <div className="text-sm text-muted-foreground">Объявлений</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">25К+</div>
              <div className="text-sm text-muted-foreground">Пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">99%</div>
              <div className="text-sm text-muted-foreground">Довольных</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-accent">Популярные категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={category.icon} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-accent">🔥 Горячие предложения</h3>
            <Button variant="outline" className="hidden md:flex">
              Смотреть все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {deal.isNew && (
                    <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary/80">
                      Новое
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{deal.title}</h4>
                  <div className="text-2xl font-bold text-primary mb-2">{deal.price}</div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {deal.location}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {deal.condition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Feature Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-accent">
                  💬 Встроенный чат
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Общайтесь с продавцами напрямую, задавайте вопросы и договаривайтесь о встрече безопасно.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm">
                    <Icon name="Shield" size={16} className="text-secondary mr-2" />
                    Безопасно
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Clock" size={16} className="text-secondary mr-2" />
                    24/7
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon name="Users" size={16} className="text-secondary mr-2" />
                    Проверенные пользователи
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[200px]">
                      <p className="text-sm">Товар ещё актуален?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-primary rounded-lg p-3 max-w-[200px]">
                      <p className="text-sm text-white">Да! Можем встретиться завтра</p>
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">MarketPlace</h4>
              <p className="text-white/80">
                Лучшая площадка для покупки и продажи б/у товаров в России.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Категории</h5>
              <ul className="space-y-2 text-white/80">
                <li>Автомобили</li>
                <li>Недвижимость</li>
                <li>Электроника</li>
                <li>Мода и стиль</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-white/80">
                <li>Помощь</li>
                <li>Безопасность</li>
                <li>Контакты</li>
                <li>Отзывы</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  8-800-123-45-67
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2" />
                  help@marketplace.ru
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2024 MarketPlace. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;