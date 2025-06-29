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
  'alkali metal': 'linear-gradient(45deg, #5c8ee8, #82aaff)',           
  'alkaline earth metal': 'linear-gradient(45deg, #82aaff, #a0c4ff)',  
  'transition metal': 'linear-gradient(45deg, #4c6ef5, #74a9f7)',       
  'post-transition metal': 'linear-gradient(45deg, #84b9f3, #a6cef8)', 
  'metalloid': 'linear-gradient(45deg, #4db6ac, #81cfcf)',              
  'nonmetal': 'linear-gradient(45deg, #ef5350, #f58a8a)',               
  'halogen': 'linear-gradient(45deg, #a084c9, #b9a4d9)',                
  'noble gas': 'linear-gradient(45deg, #81d4fa, #a4e4ff)',             
  'lanthanide': 'linear-gradient(45deg, #e57373, #f2a5a5)',            
  'actinide': 'linear-gradient(45deg, #b39ddb, #c4b3e0)',               
};