import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import TrendingSidebar from '@/components/TrendingSidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [sortBy, setSortBy] = useState('hot');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const mockPosts = [
    {
      id: 1,
      title: 'Представили новый квантовый процессор, который работает при комнатной температуре',
      content: 'Команда ученых из MIT разработала революционный квантовый чип, который не требует экстремального охлаждения. Это может стать прорывом в области квантовых вычислений и сделать технологию доступной для массового применения.',
      author: 'TechGuru2024',
      authorRating: 15420,
      community: 'Наука',
      upvotes: 12847,
      downvotes: 234,
      commentCount: 456,
      timeAgo: '4 часа назад',
      isFlagged: false,
    },
    {
      id: 2,
      title: 'Археологи обнаружили древний город под песками Сахары',
      content: 'С помощью спутниковых снимков и лидарного сканирования исследователи нашли руины огромного города возрастом более 3000 лет. Находка может переписать историю древних цивилизаций Африки.',
      author: 'HistoryBuff',
      authorRating: 8940,
      community: 'История',
      upvotes: 9876,
      downvotes: 123,
      commentCount: 234,
      timeAgo: '6 часов назад',
      isFlagged: false,
    },
    {
      id: 3,
      title: 'Утечка: скриншоты Half-Life 3 появились в сети',
      content: 'Анонимный источник из Valve опубликовал материалы, которые якобы являются ранними версиями долгожданной игры. Valve пока не комментирует.',
      author: 'GamerX',
      authorRating: 12300,
      community: 'Игры',
      upvotes: 18234,
      downvotes: 890,
      commentCount: 1234,
      timeAgo: '2 часа назад',
      isFlagged: true,
    },
    {
      id: 4,
      title: 'Нейросеть научили генерировать музыку в стиле любого композитора',
      content: 'Новая модель от OpenAI может создавать симфонии, которые неотличимы от произведений великих композиторов прошлого. Возникают вопросы об авторских правах и будущем музыкальной индустрии.',
      author: 'AIEnthusiast',
      authorRating: 6780,
      community: 'Технологии',
      upvotes: 7654,
      downvotes: 456,
      commentCount: 567,
      timeAgo: '8 часов назад',
      isFlagged: false,
    },
    {
      id: 5,
      title: 'Космический корабль с людьми успешно достиг Марса',
      content: 'SpaceX объявила об успешном завершении первой пилотируемой миссии к Марсу. Экипаж из 6 человек находится в отличном состоянии и готов к началу колонизации.',
      author: 'SpaceExplorer',
      authorRating: 22100,
      community: 'Космос',
      upvotes: 45678,
      downvotes: 234,
      commentCount: 3456,
      timeAgo: '1 час назад',
      isFlagged: false,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
                <TabsList className="bg-background">
                  <TabsTrigger value="hot" className="gap-2">
                    🔥 Горячее
                  </TabsTrigger>
                  <TabsTrigger value="new" className="gap-2">
                    ✨ Новое
                  </TabsTrigger>
                  <TabsTrigger value="top" className="gap-2">
                    📈 Топ
                  </TabsTrigger>
                  <TabsTrigger value="rising" className="gap-2">
                    🚀 Растущее
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm" className="ml-4">
                Фильтры
              </Button>
            </div>

            <div className="space-y-4">
              {mockPosts
                .filter(post => {
                  if (activeTab === 'home') return true;
                  if (activeTab === 'saved') return false;
                  if (activeTab === 'trending') return post.upvotes > 10000;
                  return true;
                })
                .map(post => (
                  <PostCard 
                    key={post.id} 
                    {...post} 
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                ))}
              
              {activeTab === 'saved' && (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Bookmark" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>У вас пока нет сохраненных постов</p>
                </div>
              )}
              
              {activeTab === 'communities' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Популярные сообщества</h2>
                  {['Наука', 'История', 'Игры', 'Технологии', 'Космос'].map((comm, idx) => (
                    <Card key={comm} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                            {['🔬', '📚', '🎮', '💻', '🚀'][idx]}
                          </div>
                          <div>
                            <h3 className="font-semibold">r/{comm}</h3>
                            <p className="text-sm text-muted-foreground">{(idx + 1) * 12500} подписчиков</p>
                          </div>
                        </div>
                        <Button size="sm">Подписаться</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" className="w-full max-w-md">
                Загрузить еще посты
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20">
              <TrendingSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}