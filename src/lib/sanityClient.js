// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'g88p7aul',    // ← Tu project ID real
  dataset: 'production',    // Dataset
  apiVersion: '2023-01-01', // API version estable
  useCdn: true,             // Usa CDN para datos públicos
});

export default client;
