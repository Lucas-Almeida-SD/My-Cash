import { useContext } from 'react';
import { MyContext } from '../contexts/MyContext';

export default function useMyContext() {
  return (useContext(MyContext));
}
