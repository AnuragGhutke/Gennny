import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing publishable Key!')
}

createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl={'/'}
          appearance={{
                        variables: {
                            colorPrimary: "#240062",
                            colorText: "#240062"
                        },
                        elements: {
                            pricingTable: {
                                backgroundColor: "#00000000",
                            },
                            pricingTableCard: {
                                backgroundColor: "#320089",
                                border: "1px solid #7c3aed",
                                borderRadius: "16px",
                            },
                            pricingTablePlan: {
                                backgroundColor: "#320089",
                            },
                        },
                    }}
  >

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </ClerkProvider>
)
