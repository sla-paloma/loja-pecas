import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  private carrinho = inject(CarrinhoService);
  private router = inject(Router);

  itens$ = this.carrinho.itens$;
  total$ = this.carrinho.total$;
  totalPix$ = this.carrinho.totalPix$;

  alterar(id: number, delta: number): void {
    this.carrinho.alterarQuantidade(id, delta);
  }

  remover(id: number): void {
    this.carrinho.remover(id);
  }

  limpar(): void {
    this.carrinho.limpar();
  }

  finalizar(): void {
    alert('Pedido simulado com sucesso! 🎉');
    this.carrinho.limpar();
    this.router.navigate(['/']);
  }
}
