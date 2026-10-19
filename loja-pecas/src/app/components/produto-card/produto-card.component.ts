import { Component, Input, inject, signal } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-produto-card',
  imports: [RouterLink, CurrencyPipe, NgIf],
  templateUrl: './produto-card.component.html',
  styleUrl: './produto-card.component.css'
})
export class ProdutoCardComponent {
  @Input({ required: true }) produto!: Produto;

  private carrinho = inject(CarrinhoService);
  adicionado = signal(false);

  adicionar(): void {
    this.carrinho.adicionar(this.produto);
    this.adicionado.set(true);
    setTimeout(() => this.adicionado.set(false), 1500);
  }
}
