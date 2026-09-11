import { Client } from '@elastic/elasticsearch';

// Initialize the client (ensure your URL and credentials are correct)
const client = new Client({
  node: 'http://localhost:9200', 
});

// Added 'export' to fix TS2305
export const createIndex = async (indexName: string) => {
  try {
    const exists = await client.indices.exists({ index: indexName });

    if (exists) {
      console.log(`Index "${indexName}" already exists.`);
      return;
    }

    await client.indices.create({
      index: indexName,
      // Fixed: mapping properties use 'text'/'keyword' instead of 'string'
      mappings: {
        properties: {
          title: { type: 'text' },
          content: { type: 'text' },
          tags: { type: 'keyword' },
          createdAt: { type: 'date' }
        }
      }
    });

    console.log(`Index "${indexName}" created successfully.`);
  } catch (error) {
    console.error('Error creating index:', error);
    throw error;
  }
};
