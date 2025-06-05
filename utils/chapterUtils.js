import { 
  Atom, 
  Calculator, 
  Function, 
  Lightning, 
  Waves, 
  Leaf, 
  Lightbulb,
  Thermometer,
  Flask
} from 'phosphor-react';

const chapterIcons = {
  'Gravitation': Atom,
  'Math in Physics': Calculator,
  'Units and Dimensions': Function,
  'Motion in One Dimension': Lightning,
  'Motion in Two Dimensions': Waves,
  'Laws of Motion': Leaf,
  'Centre of Mass Equilibrium and Momentum': Lightbulb,
  'Thermodynamics': Thermometer,
  'Chemical Reactions': Flask
};

export const getChapterIcon = (chapterName) => {
  const Icon = chapterIcons[chapterName] || Atom;
  return <Icon weight="bold" />;
};