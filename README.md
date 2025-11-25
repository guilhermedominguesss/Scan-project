# Scan de Crescimento Profissional

Este projeto é uma Single Page Application (SPA) desenvolvida em React + TailwindCSS (Vite) para realizar um diagnóstico de crescimento profissional.

## Como Executar

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse `http://localhost:5000` (ou a porta indicada).

## Estrutura do Projeto

*   `/client/src/pages`: Contém as rotas principais (Home, Quiz, Radar, LP, Admin).
*   `/client/src/components`: Componentes reutilizáveis (Header, QuestionCard, RadarBar, etc).
*   `/client/src/contexts`: Gerenciamento de estado do Quiz.
*   `/client/src/utils`: Lógica de cálculo de score, storage e analytics.

## Funcionalidades

*   **Quiz Interativo**: Perguntas passo a passo com barra de progresso.
*   **Radar de Crescimento**: Visualização gráfica dos 3 pilares (Potencial, Captação, Eficiência).
*   **Captura de Leads**: Salva nome/whatsapp antes de iniciar.
*   **Admin Dashboard**: Painel protegido (senha: `guilherme2025`) para ver leads e exportar CSV.
*   **Persistência**: Salva progresso no localStorage para evitar perda de dados.

## Checklist de QA

- [x] Responsividade Mobile (testado em breakpoints sm/md)
- [x] Cores e Fontes conforme Brand Guide
- [x] Fluxo de Captura Antecipada funcionando
- [x] Cálculo de Score correto
- [x] Admin Page protegido por senha
- [x] Exportação de CSV funcionando
- [x] Tracking de eventos (Analytics)

## Tecnologias

- React 18
- TailwindCSS v4
- Framer Motion
- Recharts
- Wouter (Routing)
