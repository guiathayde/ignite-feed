import { useState, InvalidEvent, FormEvent, ChangeEvent } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

export interface PostProps {
  id?: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  publishedAt: Date;
  content: {
    type: 'paragraph' | 'link';
    content: string;
  }[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        avatarUrl:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
        name: 'João da Silva',
        role: 'Desenvolvedor',
      },
      content: 'Muito bom Devon, parabéns!! 👏👏',
      publishedAt: new Date('2023-04-05 20:47:30'),
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeFromNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments((prevValue) => [
      ...prevValue,
      {
        id: prevValue.length + 1,
        author,
        content: newCommentText,
        publishedAt: new Date(),
      },
    ]);

    setNewCommentText('');
  }

  function handleNewCommentTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(
      'O campo de comentário não pode ficar vazio'
    );
  }

  function deleteComment(id: number) {
    setComments((prevValue) =>
      prevValue.filter((comment) => comment.id !== id)
    );
  }

  const isNewCommentEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeFromNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(({ type, content }) => {
          if (type === 'paragraph') {
            return <p key={content}>{content}</p>;
          } else if (type === 'link') {
            return (
              <p key={content}>
                <a href="#">{content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe seu comentario"
          value={newCommentText}
          onChange={handleNewCommentTextChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({ id, author, publishedAt, content }) => (
          <Comment
            key={id}
            author={author}
            publishedAt={publishedAt}
            content={content}
            onDeleteComment={() => deleteComment(id)}
          />
        ))}
      </div>
    </article>
  );
}
