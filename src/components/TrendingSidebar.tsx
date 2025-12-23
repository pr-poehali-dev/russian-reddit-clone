import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TrendingCommunity {
  name: string;
  members: string;
  trending: boolean;
}

interface TrendingPost {
  title: string;
  score: number;
  community: string;
}

export default function TrendingSidebar() {
  const trendingCommunities: TrendingCommunity[] = [
    { name: 'Технологии', members: '2.5M', trending: true },
    { name: 'Игры', members: '1.8M', trending: true },
    { name: 'Наука', members: '1.2M', trending: false },
    { name: 'Юмор', members: '3.1M', trending: false },
    { name: 'Новости', members: '2.9M', trending: true },
  ];

  const topPosts: TrendingPost[] = [
    { title: 'Новый ИИ от Google превзошел все ожидания', score: 12500, community: 'Технологии' },
    { title: 'Открытие года в космологии', score: 9800, community: 'Наука' },
    { title: 'Геймплей новой части Half-Life', score: 8900, community: 'Игры' },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-semibold">Популярные сообщества</h3>
        </div>
        <div className="space-y-3">
          {trendingCommunities.map((community, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-5">{index + 1}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hover:underline cursor-pointer">
                      r/{community.name}
                    </span>
                    {community.trending && (
                      <Icon name="TrendingUp" size={12} className="text-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{community.members} участников</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Подписаться
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4">
          Показать больше
        </Button>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Flame" size={20} className="text-primary" />
          <h3 className="font-semibold">Горячие посты</h3>
        </div>
        <div className="space-y-3">
          {topPosts.map((post, index) => (
            <div key={index} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <p className="text-sm font-medium hover:text-primary cursor-pointer transition-colors line-clamp-2 mb-1">
                {post.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {post.score.toLocaleString()}
                </Badge>
                <span>r/{post.community}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="font-semibold">Правила сообщества</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Соблюдайте правила приличия, уважайте других участников
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Подробнее
        </Button>
      </Card>
    </div>
  );
}
