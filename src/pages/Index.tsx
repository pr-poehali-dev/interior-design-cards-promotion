import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Открытка "Пион"',
    price: 850,
    image: 'https://cdn.poehali.dev/files/672fd281-fed2-4926-8701-66ba1e95e09a.jpg',
    description: 'Нежная открытка с вышивкой розового пиона на изумрудном фоне'
  },
  {
    id: 2,
    name: 'Открытка "Скорпион"',
    price: 950,
    image: 'https://cdn.poehali.dev/files/ed76217a-855a-4612-b216-ecf4675c0e43.jpg',
    description: 'Яркая открытка с вышитым золотым скорпионом в стиле знаков зодиака'
  },
  {
    id: 3,
    name: 'Открытка "Пион"',
    price: 850,
    image: 'https://cdn.poehali.dev/files/672fd281-fed2-4926-8701-66ba1e95e09a.jpg',
    description: 'Элегантная открытка с пышным цветком пиона'
  },
  {
    id: 4,
    name: 'Открытка "Скорпион"',
    price: 950,
    image: 'https://cdn.poehali.dev/files/ed76217a-855a-4612-b216-ecf4675c0e43.jpg',
    description: 'Стильная открытка со знаком зодиака Скорпион'
  },
  {
    id: 5,
    name: 'Открытка "Пион"',
    price: 850,
    image: 'https://cdn.poehali.dev/files/672fd281-fed2-4926-8701-66ba1e95e09a.jpg',
    description: 'Ароматная открытка с изысканным пионом'
  },
  {
    id: 6,
    name: 'Открытка "Скорпион"',
    price: 950,
    image: 'https://cdn.poehali.dev/files/ed76217a-855a-4612-b216-ecf4675c0e43.jpg',
    description: 'Волшебная открытка с мистическим скорпионом'
  }
];

const faqs = [
  {
    question: 'Как осуществляется доставка?',
    answer: 'Доставка осуществляется Почтой России и СДЭК. По Москве возможна курьерская доставка в течение 1-2 дней. В регионы доставка занимает 3-7 дней.'
  },
  {
    question: 'Как ухаживать за открытками?',
    answer: 'Открытки с вышивкой не требуют особого ухода. Храните в сухом месте, избегайте попадания прямых солнечных лучей. При необходимости протирайте сухой мягкой тканью.'
  },
  {
    question: 'Можно ли сделать индивидуальный заказ?',
    answer: 'Конечно! Мы с радостью создадим открытку по вашему эскизу или пожеланию. Срок изготовления индивидуального заказа — 7-14 дней.'
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Принимаем оплату картой на сайте, переводом на карту, наложенным платежом при получении.'
  }
];

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину');
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCustomOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Заказ отправлен! Мы свяжемся с вами в ближайшее время.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={28} className="text-primary-foreground" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Атрибутика уюта</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#gallery" className="story-link text-foreground hover:text-primary-foreground transition-colors">Галерея</a>
            <a href="#custom" className="story-link text-foreground hover:text-primary-foreground transition-colors">Заказать</a>
            <a href="#faq" className="story-link text-foreground hover:text-primary-foreground transition-colors">FAQ</a>
            <a href="#contact" className="story-link text-foreground hover:text-primary-foreground transition-colors">Контакты</a>
          </nav>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cartCount === 0 ? 'Ваша корзина пуста' : `Товаров: ${cartCount}`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Icon name="Plus" size={18} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 ml-auto"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Итого:</span>
                    <span className="font-bold text-lg">{totalPrice} ₽</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      toast.success('Спасибо за заказ! Мы свяжемся с вами для подтверждения.');
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                  >
                    Оформить заказ
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">Ручная работа</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Открытки с душой и теплом
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Каждая открытка создается вручную с любовью и вниманием к деталям. 
              Уникальные дизайны с авторской вышивкой для особенных моментов.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="hover-scale" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Sparkles" size={18} className="mr-2" />
                Смотреть коллекцию
              </Button>
              <Button size="lg" variant="outline" className="hover-scale" onClick={() => document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="PenTool" size={18} className="mr-2" />
                Индивидуальный заказ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша коллекция</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Эксклюзивные открытки с авторской вышивкой. Каждая работа уникальна.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover-scale border-2 hover:border-primary transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                  <p className="text-2xl font-bold mt-4 text-primary-foreground">{product.price} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full hover-scale" 
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="custom" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Icon name="PenTool" size={48} className="mx-auto mb-4 text-primary-foreground" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Индивидуальный заказ</h2>
              <p className="text-muted-foreground">
                Создадим открытку специально для вас по вашему эскизу или идее
              </p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleCustomOrder} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Как к вам обращаться?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Контакт для связи</Label>
                    <Input id="contact" type="tel" placeholder="Телефон или email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание желаемой открытки</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Расскажите, какую открытку вы хотите: тематика, цвета, размер, особые пожелания..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full hover-scale">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить заявку
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Срок изготовления индивидуального заказа: 7-14 дней
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground">
                Ответы на популярные вопросы о доставке и уходе
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-muted-foreground">
                Мы всегда рады ответить на ваши вопросы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover-scale">
                <CardContent className="p-6">
                  <Icon name="Mail" size={32} className="mx-auto mb-4 text-primary-foreground" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:info@cards.ru" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                    info@cards.ru
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover-scale">
                <CardContent className="p-6">
                  <Icon name="Phone" size={32} className="mx-auto mb-4 text-primary-foreground" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href="tel:+79001234567" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                    +7 (900) 123-45-67
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover-scale">
                <CardContent className="p-6">
                  <Icon name="MessageCircle" size={32} className="mx-auto mb-4 text-primary-foreground" />
                  <h3 className="font-semibold mb-2">Telegram</h3>
                  <a href="https://t.me/cards" className="text-muted-foreground hover:text-primary-foreground transition-colors">
                    @embroidered_cards
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Heart" size={16} className="text-accent-foreground" />
            Сделано с любовью © 2024 Атрибутика уюта
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;