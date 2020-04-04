import React from 'react';
//components
import Carousel from './components/Carousel';

export default function App() {
  const images = [
    {
      url: 'https://picsum.photos/id/1/960/700',
      title: 'First Title',
      subtitle: 'First subtitle',
    },
    {
      url: 'https://picsum.photos/id/234/960/700',
      title: 'Second Title',
      subtitle: 'Second subtitle',
    },
    {
      url: 'https://picsum.photos/id/790/960/700',
      title: 'Third Title',
      subtitle: 'Third subtitle',
    },
  ];

  return <Carousel images={images} />;
}
