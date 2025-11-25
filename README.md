# Scan de Crescimento Profissional - Premium UI Update

Este projeto foi atualizado com uma interface Premium, responsividade aprimorada e fluxo de captura antecipada de leads.

## Mudanças Principais

1.  **Design Premium**: Nova paleta de cores (Primary: #9D6135, Background: #F8F7F2) e tipografia (Playfair Display + Inter).
2.  **Captura Antecipada**: O usuário deve informar Nome, Empresa e WhatsApp *antes* de iniciar as perguntas do Quiz.
3.  **Responsividade**: Mobile-first com ajustes finos para telas grandes.
4.  **Social Proof**: Novos depoimentos com assets locais.

## Como Executar

```bash
npm install
npm run dev
```

## Estrutura de Pastas

*   `/client/src/components`: Componentes UI atualizados (QuestionCard, RadarBar, etc).
*   `/client/src/pages`: Rotas com novos layouts.
*   `/client/src/utils`: Lógica de negócios (Score, Analytics, Validators).

## Paleta de Cores (Tailwind Tokens)

*   `primary`: #9D6135
*   `dark`: #232326
*   `accent`: #CDA580
*   `light`: #F8F7F2
*   `muted`: #6A635A

## Admin Access

Rota: `/admin`
Senha: `guilherme2025`

## Checklist de QA

- [x] Home Page com Hero responsivo
- [x] Captura de Lead (Step 1) salvando draft
- [x] Quiz Questions com novo card layout
- [x] Confirmação final com edição de dados
- [x] Radar Chart renderizando scores corretos
- [x] LP com prova social e link WhatsApp correto
- [x] Admin Dashboard funcional
- [x] Analytics events disparando no console
