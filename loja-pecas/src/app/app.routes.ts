import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'BitStore | Início' },
  // ":id" é o parâmetro de rota, lido no detalhe com ActivatedRoute
  { path: 'produto/:id', component: ProdutoDetalheComponent, title: 'BitStore | Detalhes' },
  { path: 'carrinho', component: CarrinhoComponent, title: 'BitStore | Carrinho' },
  { path: '**', redirectTo: '' }
];
