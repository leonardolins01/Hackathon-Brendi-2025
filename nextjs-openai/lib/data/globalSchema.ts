// lib/data/globalSchema.ts

import { describeCSVSchema } from '../llm/describeCSV';

let cachedSchema: Record<string, Record<string, string>> | null = null;

export async function getCachedSchema() {
  if (cachedSchema) return cachedSchema;

  cachedSchema = await describeCSVSchema();
  return cachedSchema;
}
