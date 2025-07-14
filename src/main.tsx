import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.tsx'
import './index.css'

// Initialize AOS with professional settings
AOS.init({
  duration: 600,
  easing: 'ease-out-cubic',
  once: true,
  offset: 120,
  disable: false,
  anchorPlacement: 'top-bottom',
})

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)