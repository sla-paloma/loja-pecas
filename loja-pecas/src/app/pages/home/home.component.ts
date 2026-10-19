import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ListaProdutosComponent } from '../../components/lista-produtos/lista-produtos.component';

@Component({
  selector: 'app-home',
  imports: [NgFor, ListaProdutosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  beneficios = [
    { icone: '🚚', titulo: 'Frete grátis', texto: 'Em compras acima de R$ 999' },
    { icone: '💸', titulo: '10% OFF no PIX', texto: 'Desconto à vista em todo o site' },
    { icone: '💳', titulo: '10x sem juros', texto: 'No cartão de crédito' },
    { icone: '🛡️', titulo: 'Garantia', texto: 'Compra segura e suporte' }
  ];
}
