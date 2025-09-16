import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  theme:{
    fontFamily:{
      Roboto:["roboto","sans-serif"],
      Poppins:["poppins","sans-serif"]
    },
     screens: {
        "1000px" : "1050px",
        "1100px" : "1110px",
        "800px"  : "800px",
        "1300px" : "1300px",
        "400px"  : "400px"
      },
  }
})
  

