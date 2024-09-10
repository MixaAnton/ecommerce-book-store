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

export class ProductEdit{

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

  constructor(product:Product){
      this.id = product.id;
      this.categoryId = product.category.id;
      this.authorId = product.author.id;
      this.languageId = product.language.id;
      this.isbn = product.isbn;
      this.name = product.name;
      this.description = product.description;
      this.unitPrice = product.unitPrice;
      this.image = product.image;
      this.active = product.active;
      this.unitsInStock = product.unitsInStock;
      this.dateCreated = product.dateCreated;
      this.lastUpdated = product.lastUpdated;
      this.numOfPages =product.numOfPages;
      this.yearOfPublication = product.yearOfPublication;
  }
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