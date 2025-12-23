import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'communities', label: 'Сообщества', icon: 'Users' },
    { id: 'trending', label: 'Тренды', icon: 'TrendingUp' },
    { id: 'saved', label: 'Сохраненные', icon: 'Bookmark' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">П</span>
              </div>
              <span className="font-bold text-xl">Поговорим</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="gap-2"
                >
                  <Icon name={tab.icon as any} size={16} />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden lg:block">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по постам, сообществам..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Icon name="MessageSquare" size={20} />
            </Button>
            <Button variant="default" size="sm" className="hidden md:flex">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать пост
            </Button>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-white text-sm">А</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-1 pb-2 overflow-x-auto">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="gap-2 whitespace-nowrap"
            >
              <Icon name={tab.icon as any} size={16} />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
