import { Component } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  selectedOption = null;
  categories =[ {
              id:1,name:'Romance'
            },
            {
              id:2,name:'Comedy'
            },
            {
              id:3,name:'SiFi'
            },
            {
              id:4,name:'Drama'
            }
          ];

          validationMessage :any;
          selectedFile: File | null = null;
          onFileSelected(event: any) {
            const file: File = event.target.files[0];
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
        
            if (file) {
              const fileExtension = file.name.split('.').pop()?.toLowerCase();
              if (!allowedExtensions.includes('.' + fileExtension)) {
                console.error(
                  'Nedozvoljena ekstenzija fajla. Dozvoljene ekstenzije su: ' +
                    allowedExtensions.join(', ')
                );
                this.validationMessage = true;
                event.target.value = null;
                return;
              } else {
                this.validationMessage = false;
              }
              this.selectedFile = file;
            }
          }
}
