export const theme = {
  colors: {
    // Identidade Visual
    primary: "#DB6300",      // Laranja principal
    secondary: "#F5A623",    // Amarelo (estrelas/destaques)
    
    // Fundos
    background: "#F2F2F2",   // Fundo de telas (cinza claro)
    surface: "#FFFFFF",      // Fundo de cards/inputs (branco)
    
    // Textos
    textPrimary: "#333333",  // Títulos e textos importantes
    textSecondary: "#666666",// Subtítulos e descrições
    textLight: "#999999",    // Placeholders e textos desabilitados
    textInverse: "#FFFFFF",  // Texto sobre fundo colorido
    
    // Feedback
    success: "#4CAF50",
    error: "#DC1637",
    info: "#007BFF",
    
    // Bordas
    border: "#E0E0E0",
  },
  
  fonts: {
    // Se quiser usar a SpaceMono futuramente, ou a fonte padrão do sistema
    regular: "System",
    bold: "System", 
    // Tamanhos padronizados
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    }
  },
  
  borderRadius: {
    sm: 8,
    md: 15, // Padrão atual dos seus cards
    lg: 30, // Padrão dos seus inputs e botões redondos
    full: 9999,
  },
  
  // Sombras Padronizadas (Card Design)
  shadows: {
    soft: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 8, // Sua sombra atual de cards/avatar
    }
  }
};