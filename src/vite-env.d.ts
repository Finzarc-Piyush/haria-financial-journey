/// <reference types="vite/client" />

// Create empty type definition for testing-library__jest-dom to prevent TypeScript errors
// This satisfies the implicit type library reference without requiring the actual package
declare module 'testing-library__jest-dom' {
  // Empty module - no exports needed for production website
}
