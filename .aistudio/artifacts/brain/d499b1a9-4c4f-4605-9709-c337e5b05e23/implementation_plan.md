# Gerador de Card Oficial do Perfil (9:16 Social Stories)

Substituição completa do gerador de cards antigo por um gerador unificado que replica fielmente a estética premium do Perfil (preto profundo, banner, avatar luminoso, insígnias personalizadas e pódio Top 5 com capas oficiais), compactado proporcionalmente para caber 100% em uma única imagem vertical 9:16 em alta definição para WhatsApp Status e Instagram Stories.

## User Review & Critical Decisions

> [!IMPORTANT]
> As seguintes decisões foram confirmadas com base nas suas respostas de alinhamento:

- **Formato da Imagem**: Formato vertical 9:16 (1080x1920px em alta resolução), ideal para visualização em tela cheia de smartphones, WhatsApp Status e Instagram Stories.
- **Estatísticas Expandidas**: Bloco de métricas rico incluindo Tempo Assistido (dias/horas), Total de Episódios, Nota Média, Animes Concluídos, Animes em Andamento ("Assistindo") e Total da Coleção.
- **Ponto de Acesso**: Disparado exclusivamente a partir da engrenagem de configurações (`SettingsModal`), mantendo a tela inicial e o perfil limpos.
- **Identidade Visual Fiel**: Uso idêntico da paleta preta profunda (`#000000`, fundos translúcidos de vidro fosco `backdrop-blur`), banner oficial do usuário, avatar com anel dourado reluzente, selos de cargo (`DEV / ADMIN`), título otaku, pódio com coroa dourada e as ilustrações ricas das insígnias (`/badges/badge_*.webp`).

---

## 1. Overview & Core Concept

- **O que faz**: Permite ao usuário gerar e baixar em 1 clique uma imagem profissional (estilo "print perfeito") do seu perfil completo do WAnime List, condensando em uma única tela vertical de proporção 9:16 todos os elementos que hoje exigiriam duas capturas de tela com rolagem.
- **Público-alvo**: Usuários que desejam compartilhar suas conquistas, gosto pessoal e progresso de animes com amigos em redes sociais e mensageiros.
- **Valor Principal**: Elimina os cartões genéricos e antiquados estilo dashboard dos anos 90, entregando uma arte moderna, com iluminação ambiente e sem cortes verticais.

---

## 2. User Experience & Visual Design

### Fluxo do Usuário
1. O usuário clica na **Engrenagem de Configurações** (no topo do app).
2. Na seção de Compartilhamento, clica no botão com ícone de câmera/cartão: **"Gerar Card do Perfil (Stories)"**.
3. Abre-se um modal moderno e escuro com a pré-visualização ao vivo do card renderizado em tempo real com todos os seus dados.
4. O usuário visualiza o card exatamente como ele será exportado (com banner, avatar, bio, estatísticas, top 5 com capas e as 5 insígnias).
5. Dois botões de ação na base do modal:
   - **"Baixar Imagem (PNG HD)"**: Exporta a imagem em alta resolução (1080 × 1920px).
   - **"Copiar Imagem"**: Copia o arquivo binário PNG diretamente para a área de transferência para colar no WhatsApp Web ou redes sociais.

### Estrutura Visual do Card Gerado (9:16 Vertical)
```
┌────────────────────────────────────────────────────────┐
│ [ BANNER SUPERIOR HD COM GRADIENTE SUAVE PARA O PRETO ]│
│                                                        │
│   (O) [Avatar circular com anel dourado e brilho]      │
│   @Username   [DEV / ADMIN]                            │
│   👑 Título Otaku (ex: Imperador dos Animes)           │
│   "Bio ou frase personalizada do usuário"              │
│                                                        │
├────────────────────────────────────────────────────────┤
│ 📊 ESTATÍSTICAS DA JORNADA                             │
│ ┌──────────────┬──────────────┬──────────────┐         │
│ │ ⏱️ Tempo     │ 🎬 Episódios │ ⭐ Nota Média│         │
│ │   50d 3h     │    3.072     │     7.5      │         │
│ ├──────────────┼──────────────┼──────────────┤         │
│ │ 🏆 Concluídos│ 📺 Assistindo│ 📚 Coleção   │         │
│ │     28       │      5       │      35      │         │
│ └──────────────┴──────────────┴──────────────┘         │
│                                                        │
├────────────────────────────────────────────────────────┤
│ 🏆 TOP 5 FAVORITOS (PÓDIO OLÍMPICO COM CAPAS HD)       │
│                     👑 (Coroa)                         │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│   │ 4º   │  │ 2º   │  │ 1º   │  │ 3º   │  │ 5º   │     │
│   │ Capa │  │ Capa │  │ Capa │  │ Capa │  │ Capa │     │
│   │ ⭐8.0│  │ ⭐9.2│  │ ⭐9.8│  │ ⭐8.5│  │ ⭐7.9│     │
│   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                                        │
├────────────────────────────────────────────────────────┤
│ 🎖️ 5 INSÍGNIAS EM DESTAQUE (ARTES PERSONALIZADAS)      │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│   │(Wano)│  │(Mult)│  │(Grand│  │(Drag)│  │(Deus)│     │
│   │ Arte │  │ Arte │  │ Arte │  │ Arte │  │ Arte │     │
│   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│   Títulos legíveis abaixo de cada insígnia             │
│                                                        │
├────────────────────────────────────────────────────────┤
│ ⚡ WAnime List · Seu Guia Definitivo de Animes         │
└────────────────────────────────────────────────────────┘
```

---

## 3. Key Product Decisions & Trade-Offs

- **Substituição Completa vs. Manutenção do Gerador Antigo**:
  - *Decisão*: Substituição integral do `SocialCardGeneratorModal` antigo pelo novo `ProfileCardGeneratorModal`.
  - *Por que*: O gerador antigo possuía mais de 1.100 linhas com múltiplos layouts fragmentados que o usuário descreveu como "feios e com cara de dashboard antigo de 1990". Unificar tudo em torno do conceito da "Print Perfeita do Perfil" atende 100% ao desejo estético e funcional expresso.
- **Renderização de Alta Fidelidade (HTML-to-Canvas / DOM Canvas Offscreen)**:
  - *Decisão*: Construir o card em DOM estruturado com Tailwind rigoroso e renderizar para canvas através de desenho nativo em alta densidade (escala 2x para nitidez cristalina de 1080x1920) com suporte a imagens CORS (capas de animes e ilustrações de insígnias locais `/badges/*`).
- **Respeito ao Princípio de Não Modificar Outras Abas**:
  - *Decisão*: Nenhuma outra aba (Lista, Agenda, Notícias, Perfil nativo, filtros, status, lógicas de sincronização de episódios) será alterada. A mudança é cirúrgica no modal de geração de card disparado pela engrenagem.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    SettingsModal.tsx                         │
│           (Botão "Gerar Card do Perfil (Stories)")           │
└──────────────────────────────┬───────────────────────────────┘
                               │ Abre modal
                               ▼
┌──────────────────────────────────────────────────────────────┐
│             ProfileCardGeneratorModal.tsx                     │
│  - Recebe: userProfile, animes, userName, avatarUrl          │
│  - Calcula estatísticas completas:                           │
│    • Tempo total em dias e horas (24 min/ep)                 │
│    • Total de episódios somando todas as temporadas          │
│    • Nota média pessoal dos animes avaliados                 │
│    • Contagem: Concluídos, Assistindo, Total na lista        │
│  - Coleta Top 5 (userProfile.top5AnimeIds -> animes)         │
│  - Coleta 5 Insígnias (userProfile.featuredBadgeIds          │
│    -> BADGE_IMAGE_MAP com fallback dinâmico)                 │
│  - Canvas de Exportação 1080x1920 (PNG)                      │
│  - Botões de Baixar e Copiar para Clipboard                  │
└──────────────────────────────────────────────────────────────┘
```

### Dados Manipulados
- `userProfile`: Banner (`customBannerUrl`), Avatar (`customAvatarUrl`), Apelido (`publicUsername`), Título Otaku (`otakuTitle`), Bio (`bio`), Top 5 IDs (`top5AnimeIds`), Insígnias em destaque (`featuredBadgeIds`).
- `animes`: Coleção do usuário para cálculo de episódios, status e recuperação das capas de alta resolução do Top 5.
- `achievementAssets.ts`: Mapeamento direto de IDs de insígnias para suas imagens WebP correspondentes.
