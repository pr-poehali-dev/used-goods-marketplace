import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FavoriteItem {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  condition: string;
  addedDate: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Загрузка избранного из localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      // Мок данные для демонстрации
      const mockFavorites: FavoriteItem[] = [
        {
          id: '1',
          title: 'iPhone 13 Pro Max 256GB',
          price: '45,000 ₽',
          location: 'Москва',
          image: '/placeholder.svg',
          condition: 'Отличное',
          addedDate: '2024-01-20'
        },
        {
          id: '2',
          title: 'BMW X5 2019',
          price: '2,800,000 ₽',
          location: 'Санкт-Петербург',
          image: '/placeholder.svg',
          condition: 'Хорошее',
          addedDate: '2024-01-19'
        },
        {
          id: '3',
          title: 'MacBook Pro M1 16"',
          price: '95,000 ₽',
          location: 'Екатеринбург',
          image: '/placeholder.svg',
          condition: 'Как новое',
          addedDate: '2024-01-18'
        }
      ];
      setFavorites(mockFavorites);
      localStorage.setItem('favorites', JSON.stringify(mockFavorites));
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-muted-foreground hover:text-primary">
                <Icon name="ArrowLeft" size={24} />
              </Link>
              <h1 className="text-2xl font-bold text-primary">Избранное</h1>
            </div>
            {favorites.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearAllFavorites}
                className="hidden md:flex"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить всё
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          // Пустое состояние
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Heart" size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Избранное пусто</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Добавляйте понравившиеся товары в избранное, чтобы не потерять их
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Search" size={20} className="mr-2" />
                Искать товары
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Статистика */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ваше избранное</h2>
                <p className="text-muted-foreground">
                  {favorites.length} {favorites.length === 1 ? 'товар' : 'товаров'}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={clearAllFavorites}
                className="md:hidden"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>

            {/* Список избранного */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in group">
                  <div className="relative">
                    <Link to={`/product/${item.id}`}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <Icon name="Heart" size={16} className="fill-primary text-primary" />
                    </Button>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <div className="text-2xl font-bold text-primary mb-2">
                      {item.price}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {item.location}
                      </span>
                      <span>
                        {formatDate(item.addedDate)}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link to={`/product/${item.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Подробнее
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFavorite(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Рекомендации */}
            <Card className="mt-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">💡 Совет</h3>
                <p className="text-muted-foreground mb-4">
                  Включите уведомления, чтобы первыми узнавать о снижении цен на товары из избранного
                </p>
                <Button variant="outline">
                  <Icon name="Bell" size={16} className="mr-2" />
                  Настроить уведомления
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;