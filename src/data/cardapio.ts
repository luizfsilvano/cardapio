export type Alimento = {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
  };
  
  export const cardapio: Alimento[] = [
    {
      id: '1',
      nome: 'X-Burguer',
      descricao: 'Hambúrguer com queijo, alface e tomate.',
      preco: 18.5,
      imagem: 'https://sachefmio.blob.core.windows.net/fotos/x-burguer-73517.jpg', // substitua por URL real ou local
    },
    {
      id: '2',
      nome: 'Batata Frita',
      descricao: 'Porção média de batatas crocantes.',
      preco: 10.0,
      imagem: 'https://images.tcdn.com.br/img/img_prod/341142/caixinha_embalagem_para_batata_frita_kraft_100_unidades_344_1_20201029091056.jpg',
    },
    {
      id: '3',
      nome: 'Refrigerante',
      descricao: 'Copo de 500ml.',
      preco: 5.0,
      imagem: 'https://cdnv2.moovin.com.br/lojasplasutil/imagens/produtos/lista/PRD007981_007107_0512242328371926.jpg',
    },
  ];
  