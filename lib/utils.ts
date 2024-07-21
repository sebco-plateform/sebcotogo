import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//search function
export function searchFunction (setQuery: any, data: any[], element: any, setResults: any ,e: React.ChangeEvent<HTMLInputElement>): any {
  const searchTerm = e.target.value;
  if (searchTerm.trim() !== '') {
      setQuery(searchTerm);
      // Simulation d'une recherche avec un tableau de données statique
      const filteredResults = data.filter(item =>
          item[element].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
  }
  else {
      setQuery('');
      setResults([]);
  }

}