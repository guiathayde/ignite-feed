import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

import styles from './App.module.css';

import './global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl:
        'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      name: 'João da Silva',
      role: 'Desenvolvedor',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-04-05 17:47:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-04-07 17:47:30'),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar></Sidebar>
        <main>
          {posts.map(({ id, author, content, publishedAt }) => (
            <Post
              key={id}
              author={author}
              content={content}
              publishedAt={publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
