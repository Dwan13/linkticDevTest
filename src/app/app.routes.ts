import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component'; // Importa el nuevo componente
import { HomeComponent } from './components/home/home.component'; // Importa el HomeComponent

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta principal ahora carga HomeComponent
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductDetailComponent }, // Nueva ruta para el detalle del producto
    // { path: '', redirectTo: '/catalog', pathMatch: 'full' }, // Esta línea ya no es necesaria
    { path: '**', redirectTo: '' } // Redirigir cualquier otra ruta a la raíz (Home)
];
