import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Мок данные товара (в реальном приложении будет загрузка с сервера)
  const product = {
    id: id || '1',
    title: 'iPhone 13 Pro Max 256GB Синий',
    price: '45,000 ₽',
    originalPrice: '52,000 ₽',
    location: 'Москва, Центральный район',
    condition: 'Отличное',
    description: `Продаю iPhone 13 Pro Max 256GB в синем цвете. Телефон в отличном состоянии, покупался в официальном магазине Apple. 

Комплектация:
• Оригинальная коробка
• Кабель Lightning-USB-C
• Документы, чеки

Особенности:
• Никогда не падал, всегда в чехле и с защитным стеклом
• Батарея держит весь день активного использования
• Все функции работают исправно
• Face ID работает отлично

Причина продажи: переход на Android. Торг возможен при личной встрече.`,
    images: [
      '/placeholder.svg',
      '/placeholder.svg', 
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    seller: {
      name: 'Алексей К.',
      rating: 4.8,
      reviewsCount: 23,
      joinedDate: 'На сайте с 2022',
      isVerified: true
    },
    specs: [
      { label: 'Объем памяти', value: '256 ГБ' },
      { label: 'Цвет', value: 'Синий' },
      { label: 'Состояние', value: 'Отличное' },
      { label: 'Гарантия', value: 'Не действует' },
    ],
    views: 847,
    publishedDate: '3 дня назад'
  };

  const similarProducts = [
    { id: 2, title: 'iPhone 13 128GB', price: '38,000 ₽', image: '/placeholder.svg' },
    { id: 3, title: 'iPhone 14 256GB', price: '58,000 ₽', image: '/placeholder.svg' },
    { id: 4, title: 'iPhone 13 Pro 512GB', price: '52,000 ₽', image: '/placeholder.svg' },
  ];

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Здесь будет сохранение в localStorage
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
            <h1 className="text-2xl font-bold text-primary">MarketPlace</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка - Изображения */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                {/* Основное изображение */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={handleFavoriteToggle}
                  >
                    <Icon 
                      name="Heart" 
                      size={24} 
                      className={isFavorite ? 'fill-primary text-primary' : ''} 
                    />
                  </Button>
                </div>

                {/* Миниатюры */}
                <div className="flex space-x-2 px-4 pb-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Описание */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Описание</h3>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - Информация о товаре */}
          <div className="space-y-6">
            {/* Цена и основная информация */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{product.condition}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Eye" size={16} className="mr-1" />
                    {product.views}
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                </div>

                <div className="flex items-center text-muted-foreground mb-6">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  {product.location}
                </div>

                <div className="space-y-3 mb-6">
                  <Button size="lg" className="w-full">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать продавцу
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Опубликовано {product.publishedDate}
                </p>
              </CardContent>
            </Card>

            {/* Характеристики */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Информация о продавце */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Продавец</h3>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{product.seller.name}</h4>
                      {product.seller.isVerified && (
                        <Icon name="BadgeCheck" size={16} className="text-secondary" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{product.seller.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({product.seller.reviewsCount} отзывов)
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.seller.joinedDate}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Профиль продавца
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Похожие товары */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Похожие объявления</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-xl font-bold text-primary">{item.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;