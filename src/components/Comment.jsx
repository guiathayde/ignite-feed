import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ThumbsUp, Trash } from 'phosphor-react';

import { Avatar } from './Avatar';

import styles from './Comment.module.css';

export function Comment({ author, publishedAt, content, onDeleteComment }) {
  const [likes, setLikes] = useState(0);

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

  function handleDeleteComment() {
    onDeleteComment();
  }

  function handleLikeComment() {
    setLikes((prevValue) => prevValue + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelativeFromNow}
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={24} />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
