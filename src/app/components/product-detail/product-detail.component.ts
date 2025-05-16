import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para formularios
import Swal from 'sweetalert2'; // Si usas SweetAlert2

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa CommonModule y FormsModule
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetails(+productId); // El '+' convierte el string a number
      } else {
        this.errorMessage = 'ID de producto no proporcionado.';
        this.isLoading = false;
      }
    });
  }

  getProductDetails(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los detalles del producto.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onUpdateProduct(): void {
    if (this.product) {
      // Aquí podrías obtener los datos actualizados de un formulario si tuvieras uno
      // Por ahora, usamos los datos actuales del objeto product
      this.productService.updateProduct(this.product).subscribe({
        next: (updatedProduct) => {
          this.product = updatedProduct; // Actualiza el producto con la respuesta del API
          Swal.fire('Actualizado!', 'El producto ha sido actualizado.', 'success');
        },
        error: (error) => {
          Swal.fire('Error!', 'Hubo un problema al actualizar el producto.', 'error');
          console.error(error);
        }
      });
    }
  }

  onDeleteProduct(): void {
    if (this.product) {
      Swal.fire({
        title: '¿Está seguro?',
        text: `¿Desea eliminar el producto "${this.product.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(this.product!.id).subscribe({
            next: () => {
              Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
              this.router.navigate(['/catalog']); // Navegar de vuelta al catálogo
            },
            error: (error) => {
              Swal.fire('Error!', 'Hubo un problema al eliminar el producto.', 'error');
              console.error(error);
            }
          });
        }
      });
    }
  }
}
