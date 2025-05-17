import 'dotenv/config';

import { generateQuery } from '../lib/llm/generateQuery';
import { runQueryOnCSV } from '../lib/data/queryExecutor';
import { generateNaturalAnswer } from '../lib/llm/generateNaturalAnswer';

async function main() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ OPENAI_API_KEY is missing. Add it to your .env file.");
      process.exit(1);
    }

    const tableName = 'pedidos_comida';
    const csvPath = 'datasets/pedidos_comida.csv';

    const schema = {
      nome_usuario: "Nome do cliente que fez o pedido",
      pedido: "Descrição do pedido realizado, incluindo quantidade",
      categoria: "Categoria da comida pedida (Pizza, Sushi, etc.)",
      preco: "Preço total do pedido em reais",
      meio_pedido: "Meio utilizado para fazer o pedido (App, Site, etc.)",
      data_pedido: "Data e hora em que o pedido foi feito",
      restaurante: "Nome do restaurante onde o pedido foi feito"
    };

    const question = "Quais cliente fizeram 2 ou mais pedidos?";

    // 1. Gerar query com LLM
    const query = await generateQuery({
      tableName,
      schema,
      question
    });

    console.log("\n✅ Query gerada:");
    console.log(query);

    // 2. Executar a query no CSV
    const result = await runQueryOnCSV({
      csvPath,
      tableName,
      query
    });

    console.log("\n📊 Resultado da query:");
    console.log(result);

    // 3. Gerar resposta natural com base na pergunta + schema + resultado
    const naturalAnswer = await generateNaturalAnswer({
      schema,
      question,
      queryResult: result
    });

    console.log("\n🗣️ Resposta final ao usuário:");
    console.log(naturalAnswer);
  } catch (error) {
    console.error("❌ Erro durante o processo:");
    console.error(error);
    process.exit(1);
  }
}

main();
