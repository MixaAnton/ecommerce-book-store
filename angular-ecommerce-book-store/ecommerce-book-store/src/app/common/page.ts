export interface Page<T> {
    content: T[];            
    totalElements: number;       
    totalPages: number;          
    last: boolean;               
    size: number;                
    number: number;              
    sort: Sort;                  
    first: boolean;              
    numberOfElements: number;   
    pageable: Pageable;          
    empty: boolean;              
  }
  
  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
  
  export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  }