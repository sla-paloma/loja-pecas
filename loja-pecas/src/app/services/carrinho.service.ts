import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { DESCONTO_PIX, Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private chave = 'bitstore-carrinho';

  // BehaviorSubject guarda o estado atual e avisa todo mundo que assina (Header, Carrinho)
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>(this.carregar());

  itens$ = this.itensSubject.asObservable();
  quantidade$ = this.itens$.pipe(map(itens => itens.reduce((t, i) => t + i.quantidade, 0)));
  total$ = this.itens$.pipe(map(itens => itens.reduce((t, i) => t + i.produto.preco * i.quantidade, 0)));
  totalPix$ = this.total$.pipe(map(total => total * (1 - DESCONTO_PIX)));

  adicionar(produto: Produto, quantidade = 1): void {
    const itens = this.itensSubject.value;
    const existe = itens.some(i => i.produto.id === produto.id);

    // se já está no carrinho soma a quantidade (limitada ao estoque), senão adiciona novo item
    const novos = existe
      ? itens.map(i => i.produto.id === produto.id
          ? { ...i, quantidade: Math.min(i.quantidade + quantidade, produto.estoque) }
          : i)
      : [...itens, { produto, quantidade }];

    this.atualizar(novos);
  }

  alterarQuantidade(id: number, delta: number): void {
    const novos = this.itensSubject.value
      .map(i => i.produto.id === id
        ? { ...i, quantidade: Math.min(i.quantidade + delta, i.produto.estoque) }
        : i)
      .filter(i => i.quantidade > 0); // quantidade 0 remove o item

    this.atualizar(novos);
  }

  remover(id: number): void {
    this.atualizar(this.itensSubject.value.filter(i => i.produto.id !== id));
  }

  limpar(): void {
    this.atualizar([]);
  }

  private atualizar(itens: ItemCarrinho[]): void {
    this.itensSubject.next(itens);
    localStorage.setItem(this.chave, JSON.stringify(itens));
  }

  private carregar(): ItemCarrinho[] {
    try {
      return JSON.parse(localStorage.getItem(this.chave) ?? '[]');
    } catch {
      return [];
    }
  }
}
