import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProductsPage from './pages/productsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsPage />
  </StrictMode>,
)
