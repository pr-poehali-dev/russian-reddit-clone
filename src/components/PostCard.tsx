import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  authorRating: number;
  community: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  timeAgo: string;
  isFlagged?: boolean;
}

export default function PostCard({
  title,
  content,
  author,
  authorRating,
  community,
  upvotes,
  downvotes,
  commentCount,
  timeAgo,
  isFlagged = false,
}: PostCardProps) {
  const [votes, setVotes] = useState({ up: upvotes, down: downvotes });
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
      setUserVote(null);
    } else {
      if (userVote) {
        setVotes(prev => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
          [type]: prev[type] + 1,
        }));
      } else {
        setVotes(prev => ({
          ...prev,
          [type]: prev[type] + 1,
        }));
      }
      setUserVote(type);
    }
  };

  const score = votes.up - votes.down;

  return (
    <Card className="p-0 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="flex flex-col items-center bg-secondary p-2 gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 hover:bg-background ${
              userVote === 'up' ? 'text-[hsl(var(--upvote))]' : 'text-muted-foreground'
            }`}
            onClick={() => handleVote('up')}
          >
            <Icon name="ArrowUp" size={20} />
          </Button>
          <span className={`text-sm font-semibold ${score > 0 ? 'text-[hsl(var(--upvote))]' : score < 0 ? 'text-[hsl(var(--downvote))]' : 'text-foreground'}`}>
            {score > 0 ? '+' : ''}{score}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 hover:bg-background ${
              userVote === 'down' ? 'text-[hsl(var(--downvote))]' : 'text-muted-foreground'
            }`}
            onClick={() => handleVote('down')}
          >
            <Icon name="ArrowDown" size={20} />
          </Button>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="font-medium text-foreground hover:underline cursor-pointer">
              r/{community}
            </span>
            <span>•</span>
            <span>
              Опубликовал <span className="hover:underline cursor-pointer">{author}</span>
              {authorRating && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {authorRating} 🔥
                </Badge>
              )}
            </span>
            <span>•</span>
            <span>{timeAgo}</span>
            {isFlagged && (
              <Badge variant="destructive" className="ml-auto">
                <Icon name="Flag" size={12} className="mr-1" />
                Проверяется
              </Badge>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{content}</p>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              {commentCount} комментариев
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary">
              <Icon name="Share2" size={16} className="mr-2" />
              Поделиться
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary">
              <Icon name="Bookmark" size={16} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-secondary ml-auto">
              <Icon name="Flag" size={16} className="mr-2" />
              Пожаловаться
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
