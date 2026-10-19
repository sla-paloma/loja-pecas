export interface Produto {
  id: number;
  nome: string;
  marca: string;
  categoria: string;
  preco: number;
  precoPix: number;
  estoque: number;
  icone: string;
  descricao: string;
  especificacoes: string[];
}

export const DESCONTO_PIX = 0.1;
