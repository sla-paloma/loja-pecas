import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoCardComponent } from '../produto-card/produto-card.component';

@Component({
  selector: 'app-lista-produtos',
  imports: [NgFor, NgIf, FormsModule, ProdutoCardComponent],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css'
})
export class ListaProdutosComponent implements OnInit {
  private produtoService = inject(ProdutoService);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal(false);
  categoriaAtiva = signal('Todas');
  busca = signal('');

  categorias = computed(() => ['Todas', ...new Set(this.produtos().map(p => p.categoria))]);

  // recalcula sozinho quando produtos, categoria ou busca mudam
  produtosFiltrados = computed(() => {
    const termo = this.busca().toLowerCase().trim();
    return this.produtos().filter(p =>
      (this.categoriaAtiva() === 'Todas' || p.categoria === this.categoriaAtiva()) &&
      `${p.nome} ${p.marca}`.toLowerCase().includes(termo)
    );
  });

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: lista => {
        this.produtos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      }
    });
  }

  porId(_: number, produto: Produto): number {
    return produto.id;
  }
}
