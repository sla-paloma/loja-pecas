import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, shareReplay } from 'rxjs';
import { DESCONTO_PIX, Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private http = inject(HttpClient);

  // shareReplay(1) guarda a resposta: o JSON é buscado só 1 vez,
  // mesmo que Home e Detalhe peçam os produtos
  private produtos$ = this.http
    .get<Omit<Produto, 'precoPix'>[]>('/data/produtos.json')
    .pipe(
      delay(600), // simula a latência de uma API real
      map(lista => lista.map(p => ({
        ...p,
        precoPix: +(p.preco * (1 - DESCONTO_PIX)).toFixed(2)
      }))),
      shareReplay(1)
    );

  listar(): Observable<Produto[]> {
    return this.produtos$;
  }

  buscarPorId(id: number): Observable<Produto | undefined> {
    return this.produtos$.pipe(map(lista => lista.find(p => p.id === id)));
  }
}
