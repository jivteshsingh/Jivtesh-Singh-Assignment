import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChapters } from '../store/chaptersSlice';
import { chaptersData } from '../data/chaptersData';

export const ChaptersInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChapters(chaptersData));
  }, [dispatch]);

  return null;
};

export default ChaptersInitializer; 