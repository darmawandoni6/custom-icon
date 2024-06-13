import { document, favorite, myFiles, recent } from '../assets/svg';

export const overview = [
  {
    name: 'Folders',
    icon: '/folder.svg',
    key: 'folder',
    sum: 300,
    bg: 'bg-[#FFECD9]',
    to: '/folder',
  },
  {
    name: 'PDF',
    icon: '/pdf-02.svg',
    key: 'document',
    sum: 50,
    bg: 'bg-[#FFCCCC]',
    to: '/document',
  },
  {
    name: 'Images',
    icon: '/image.svg',
    key: 'image',
    sum: 240,
    bg: 'bg-[#BFEED4]',
    to: '/image',
  },
  {
    name: 'Videos',
    icon: '/video.svg',
    key: 'video',
    sum: 30,
    bg: 'bg-[#FFCCCC]',
    to: '/video',
  },
  {
    name: 'Audios',
    icon: '/audio.svg',
    key: 'audio',
    sum: 100,
    bg: 'bg-[#FFECD9]',
    to: '/audio',
  },
];

export const listMenu = [
  {
    name: 'My Files',
    icon: myFiles,
    to: '/',
  },
  {
    name: 'Document',
    icon: document,
    to: '/document',
  },
  {
    name: 'Recent',
    icon: recent,
    to: '/recent',
  },
  {
    name: 'Favorites',
    icon: favorite,
    to: '/favorite',
  },
  {
    name: 'Archived',
    icon: <i className="fa-solid fa-box-archive me-2 text-[23px]"></i>,
    to: '/archived',
  },
];
