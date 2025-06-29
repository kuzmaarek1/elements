import { PeriodicElement } from '../store/periodic-table.state';

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    category: 'nonmetal',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    category: 'noble gas',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    category: 'alkali metal',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    category: 'alkaline earth metal',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    category: 'metalloid',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    category: 'nonmetal',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    category: 'nonmetal',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    category: 'nonmetal',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    category: 'halogen',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    category: 'noble gas',
  },
  {
    position: 11,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    category: 'noble gas',
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'alkali metal': '#1565c0',
  'alkaline earth metal': '#1e88e5',
  'transition metal': '#0d47a1',
  'post-transition metal': '#42a5f5',
  'metalloid': '#26a69a',
  'nonmetal': '#d32f2f',
  'halogen': '#7b1fa2',
  'noble gas': '#4fc3f7',
  'lanthanide': '#b71c1c',
  'actinide': '#880e4f',
};
