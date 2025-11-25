# User Flow & Story

## Mapa Mental do Fluxo

1.  **Visitante** chega na Home (`/`).
2.  Clica em "Iniciar Scan".
3.  **Modal/Form de Captura** aparece:
    *   Preenche Nome, Empresa, WhatsApp.
    *   Sistema cria `leadId` e salva no localStorage.
4.  Redireciona para Quiz (`/scan-growth`).
5.  **Quiz**:
    *   Responde 6 perguntas estratégicas.
    *   Progresso salvo a cada passo.
6.  **Conclusão**:
    *   Sistema calcula scores.
    *   Marca lead como `completed`.
7.  Redireciona para Radar (`/radar`).
    *   Vê gráfico de teia com 3 pilares.
    *   Vê breakdown dos scores.
8.  Clica em "Ver pontos de crescimento" -> LP (`/lp`).
9.  **Landing Page Final**:
    *   Vê diagnóstico detalhado.
    *   Vê prova social.
    *   Clica em "Falar com equipe" -> Abre WhatsApp.

## Admin Flow

1.  Acessa `/admin`.
2.  Digita senha `guilherme2025`.
3.  Vê tabela de leads (Rascunhos e Completos).
4.  Pode filtrar, ver detalhes ou exportar CSV.
5.  Pode clicar no ícone de WhatsApp para iniciar conversa ativa.
