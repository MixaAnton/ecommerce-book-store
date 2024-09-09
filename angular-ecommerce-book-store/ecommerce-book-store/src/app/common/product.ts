export interface Product {
    id: number;
    category: Category;
    author: Author;
    language: Language;
    isbn: string;
    name: string;
    description: string;
    unitPrice: number;
    image: string | null;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
    numOfPages: number;
    yearOfPublication: number;
  }

export interface ProductCreate{

    id: number;
    categoryId: number;
    authorId: number;
    languageId: number;
    isbn: string;
    name: string;
    description: string;
    unitPrice: number;
    image: string | null;
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