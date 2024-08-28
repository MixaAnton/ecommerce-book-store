export class ProductCategory{

    constructor(public id: number,
        public categoryName: string,
        ) {

    }
}

export class ProductCategoryCheck extends ProductCategory {
    checked: boolean = false;
  
    constructor(id: number, categoryName: string, checked?: boolean) {
      super(id, categoryName);
      if (checked !== undefined) {
        this.checked = checked;
      }
    }
  }