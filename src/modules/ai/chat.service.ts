import ollama from 'ollama';
import { searchSimilarChunks } from './search.service';

export async function askQuestion(question: string) {
  const chunks = await searchSimilarChunks(question);

  const context = chunks.map((chunk) => chunk.content).join('\n\n');

  const messages = [
    {
      role: 'system' as const,
      content: `You are KnowledgeVault AI.

Answer ONLY from the provided context.

Rules:
-If the answer cannot be found in the context, reply exactly:
 "I couldn't find that information in the uploaded documents."

- Do not use outside knowledge.
- Do not make up facts.
- If the context contains the answer, summarize it naturally instead of copying it verbatim."
- Keep the answer clear and concise.`,
    },
    {
      role: 'user' as const,
      content: `Context:
${context}

Question:
${question}`,
    },
  ];

  const response = await ollama.chat({
    model: 'llama3.2',
    messages,
  });

  return {
    answer: response.message.content,
    sources: chunks,
  };
}
