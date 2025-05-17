// scripts/testQuery.ts
import 'dotenv/config'; // ← carrega .env automaticamente

import { generateQuery } from '../lib/llm/generateQuery';


async function main() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY is missing. Add it to your .env file.");
      process.exit(1);
    }

    const tableName = "pedidos_comida";

    const schema = {
      nome_usuario: "Nome do cliente que fez o pedido",
      pedido: "Descrição do pedido realizado, incluindo quantidade",
      categoria: "Categoria da comida pedida (Pizza, Sushi, etc.)",
      preco: "Preço total do pedido em reais",
      meio_pedido: "Meio utilizado para fazer o pedido (App, Site, etc.)",
      data_pedido: "Data e hora em que o pedido foi feito",
      restaurante: "Nome do restaurante onde o pedido foi feito"
    };

    const question = "Quantos pedidos o cliente João fez no restaurante Marmitaria Boa Vida por telefone? quero os pedidos de menos de 30 reais ou maiores que 50";

    const query = await generateQuery({
      tableName,
      schema,
      question
    });

    console.log("\n✅ Query gerada:");
    console.log(query);
  } catch (error) {
    console.error("❌ Erro ao gerar query:");
    console.error(error);
    process.exit(1);
  }
}

main();
