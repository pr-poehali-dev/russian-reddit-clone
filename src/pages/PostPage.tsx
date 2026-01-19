import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  authorRating: number;
  content: string;
  upvotes: number;
  downvotes: number;
  timeAgo: string;
  replies?: Comment[];
}

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const mockPosts = [
    {
      id: 1,
      title: 'Новый алгоритм модерации: как это работает?',
      content: 'Привет всем! Хочу рассказать о новом подходе к модерации контента, который мы разработали. Основная идея заключается в использовании комбинации машинного обучения и краудсорсинга.\n\nОсновные принципы:\n1. Автоматическое обнаружение потенциально проблемного контента\n2. Распределенная проверка сообществом\n3. Прозрачность решений\n\nЧто думаете о таком подходе?',
      author: 'tech_moderator',
      authorRating: 8950,
      community: 'Технологии',
      upvotes: 1542,
      downvotes: 89,
      commentCount: 234,
      timeAgo: '2 часа назад',
      isFlagged: false,
    },
    {
      id: 2,
      title: 'Обсуждение: Нужна ли карма на платформе?',
      content: 'Давайте обсудим систему кармы. С одной стороны, она мотивирует создавать качественный контент. С другой — может приводить к погоне за лайками вместо содержательных дискуссий.',
      author: 'community_lead',
      authorRating: 12450,
      community: 'Мета',
      upvotes: 2891,
      downvotes: 456,
      commentCount: 567,
      timeAgo: '5 часов назад',
      isFlagged: false,
    },
  ];

  const post = mockPosts.find(p => p.id === Number(id)) || mockPosts[0];

  const mockComments: Comment[] = [
    {
      id: 1,
      author: 'data_scientist',
      authorRating: 5420,
      content: 'Отличная идея! Мы пробовали похожий подход в нашем проекте. Главное — правильно настроить пороги срабатывания алгоритма, чтобы минимизировать ложные срабатывания.',
      upvotes: 234,
      downvotes: 12,
      timeAgo: '1 час назад',
      replies: [
        {
          id: 2,
          author: 'tech_moderator',
          authorRating: 8950,
          content: 'Да, именно! Мы используем динамические пороги в зависимости от контекста сообщества. Можете поделиться опытом?',
          upvotes: 89,
          downvotes: 3,
          timeAgo: '45 минут назад',
        },
      ],
    },
    {
      id: 3,
      author: 'skeptic_user',
      authorRating: 1250,
      content: 'А как быть с предвзятостью алгоритмов? История показывает, что ML-модели часто воспроизводят существующие предрассудки.',
      upvotes: 567,
      downvotes: 45,
      timeAgo: '1 час назад',
      replies: [
        {
          id: 4,
          author: 'ml_expert',
          authorRating: 9870,
          content: 'Важный вопрос! Необходим постоянный аудит моделей и разнообразный датасет для обучения. Плюс прозрачность решений позволяет сообществу выявлять проблемы.',
          upvotes: 423,
          downvotes: 8,
          timeAgo: '30 минут назад',
        },
      ],
    },
    {
      id: 5,
      author: 'privacy_advocate',
      authorRating: 3420,
      content: 'Интересно, но меня беспокоит вопрос приватности. Какие данные собираются для обучения модели?',
      upvotes: 156,
      downvotes: 23,
      timeAgo: '30 минут назад',
    },
  ];

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('Новый комментарий:', commentText);
      setCommentText('');
    }
  };

  const handleSubmitReply = (commentId: number) => {
    if (replyText.trim()) {
      console.log('Ответ на комментарий', commentId, ':', replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className={depth > 0 ? 'ml-8 mt-4' : 'mt-4'}>
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="ChevronUp" size={18} />
            </Button>
            <span className="text-sm font-semibold">
              {(comment.upvotes - comment.downvotes).toLocaleString()}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="ChevronDown" size={18} />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm hover:underline cursor-pointer">
                u/{comment.author}
              </span>
              <Badge variant="secondary" className="text-xs">
                {comment.authorRating.toLocaleString()}
              </Badge>
              <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
            </div>

            <p className="text-sm mb-3 whitespace-pre-wrap">{comment.content}</p>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Icon name="MessageSquare" size={14} />
                Ответить
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <Icon name="Share2" size={14} />
                Поделиться
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <Icon name="Bookmark" size={14} />
                Сохранить
              </Button>
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Ваш ответ..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                    Ответить
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-4 pt-20">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 gap-2"
          onClick={() => navigate('/')}
        >
          <Icon name="ArrowLeft" size={16} />
          Назад к ленте
        </Button>

        <Card className="p-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="ChevronUp" size={20} />
              </Button>
              <span className="text-lg font-bold">
                {(post.upvotes - post.downvotes).toLocaleString()}
              </span>
              <Button variant="ghost" size="icon">
                <Icon name="ChevronDown" size={20} />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="cursor-pointer hover:bg-primary/80">
                  r/{post.community}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Опубликовал{' '}
                  <span className="font-semibold hover:underline cursor-pointer">
                    u/{post.author}
                  </span>
                </span>
                <Badge variant="secondary" className="text-xs">
                  {post.authorRating.toLocaleString()}
                </Badge>
                <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
              </div>

              <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

              <p className="text-base whitespace-pre-wrap leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="MessageSquare" size={16} />
                  {post.commentCount} комментариев
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Share2" size={16} />
                  Поделиться
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Bookmark" size={16} />
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Что вы думаете?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-24"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setCommentText('')}
                  disabled={!commentText.trim()}
                >
                  Отмена
                </Button>
                <Button onClick={handleSubmitComment} disabled={!commentText.trim()}>
                  Комментировать
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Комментарии ({mockComments.length})
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Лучшие
              </Button>
              <Button variant="ghost" size="sm">
                Новые
              </Button>
              <Button variant="ghost" size="sm">
                Старые
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {mockComments.map(comment => renderComment(comment))}
          </div>
        </div>
      </div>
    </div>
  );
}
