import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-produto-detalhe',
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.css'
})
export class ProdutoDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  private carrinho = inject(CarrinhoService);

  produto = signal<Produto | undefined>(undefined);
  carregando = signal(true);
  adicionado = signal(false);

  ngOnInit(): void {
    // paramMap emite de novo se o :id mudar, e o switchMap cancela a busca anterior
    this.route.paramMap.pipe(
      tap(() => this.carregando.set(true)),
      switchMap(params =>
        this.produtoService.buscarPorId(Number(params.get('id'))).pipe(
          catchError(() => of(undefined))
        )
      )
    ).subscribe(produto => {
      this.produto.set(produto);
      this.carregando.set(false);
    });
  }

  adicionar(): void {
    const p = this.produto();
    if (!p) return;
    this.carrinho.adicionar(p);
    this.adicionado.set(true);
    setTimeout(() => this.adicionado.set(false), 1500);
  }

  comprarAgora(): void {
    const p = this.produto();
    if (!p) return;
    this.carrinho.adicionar(p);
    this.router.navigate(['/carrinho']);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
