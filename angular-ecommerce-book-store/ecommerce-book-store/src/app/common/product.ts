export interface Product {
    id: number;
    category: Category;
    author: Author;
    language: Language;
    isbn: string;
    name: string;
    description: string;
    unitPrice: number;
    image: string | null;  // `null` is possible, so we add it as a type
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
    numOfPages: number;
    yearOfPublication: number;
  }

  export interface Category {
    id: number;
    categoryName: string;
  }
  
  export interface Author {
    id: number;
    firstName: string;
    lastName: string;
  }
  
  export interface Language {
    id: number;
    name: string;
    designation: string;
  }