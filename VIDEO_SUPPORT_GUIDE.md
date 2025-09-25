# 🎬 Video Support Guide - Medina Tech Imports

## Overview

Este guia garante que todos os vídeos nos produtos funcionem corretamente na galeria. Após resolver o problema inicial com o produto Akko TAC75 HE, implementamos melhorias preventivas.

## 🔧 Implementações de Segurança

### 1. Utilitário de Mídia (`utils/mediaUtils.ts`)

Criamos funções robustas para detecção de mídia:

```typescript
import { isVideo, getMediaType } from '../utils/mediaUtils';

// Detecta vídeos com precisão
const videoFile = isVideo("https://example.com/video.mp4?token=123"); // true
const imageFile = isVideo("https://example.com/image.jpg"); // false
```

**Formatos de vídeo suportados:**
- `.mp4` ✅ (mais comum)
- `.webm` ✅ 
- `.ogg` ✅
- `.mov` ✅
- `.avi` ✅
- `.mkv` ✅
- `.m4v` ✅

### 2. Componente ProductDetailPage Aprimorado

- ✅ **Detecção automática**: Identifica vídeos automaticamente
- ✅ **Thumbnails com play icon**: Vídeos mostram ícone de play
- ✅ **Controles nativos**: Player HTML5 com controles
- ✅ **Preload metadata**: Carrega thumbnail sem baixar vídeo completo
- ✅ **Query parameters**: Funciona com URLs do Firebase Storage

### 3. Script de Validação

Execute para verificar todos os produtos:

```bash
npm run validate-videos
```

**O que o script faz:**
- 📊 Conta produtos com vídeos
- 🔍 Identifica todos os arquivos de vídeo
- ✅ Valida detecção por formato
- 📈 Gera relatório de cobertura

## 🛠️ Como Adicionar Novos Produtos com Vídeos

### 1. Upload no Firebase Storage

Organize os arquivos por produto:
```
/produtos/produto-nome/
  ├── imagem1.jpg
  ├── imagem2.webp  
  └── video-demo.mp4  ← Vídeo aqui
```

### 2. Atualize product-images.json

```json
{
  "id": "novo-produto",
  "imageUrl": "https://firebase.../imagem-principal.jpg",
  "galleryImages": [
    "https://firebase.../imagem1.jpg",
    "https://firebase.../imagem2.webp",
    "https://firebase.../video-demo.mp4"  ← URL do vídeo
  ]
}
```

### 3. Execute a Validação

```bash
npm run validate-videos
```

### 4. Atualize o Firestore

```bash
node scripts/update-product-images.mjs
```

## 🚀 Processo de Deploy

### 1. Deploy Local → Produção
```bash
# 1. Teste local
npm run dev

# 2. Valide vídeos  
npm run validate-videos

# 3. Build de produção
npm run build

# 4. Deploy (automático via GitHub)
git add .
git commit -m "Add video support for [produto]"
git push origin main
```

### 2. Verificação Pós-Deploy
- ✅ Acesse o produto no site de produção
- ✅ Verifique se o thumbnail do vídeo aparece
- ✅ Teste se o vídeo reproduz no player principal
- ✅ Confirme controles de reprodução funcionam

## 🔍 Troubleshooting

### Vídeo não aparece como thumbnail?
```bash
# Verifique se o arquivo é detectado
npm run validate-videos
```

Se não aparecer na validação:
- ✅ Confirme extensão (.mp4, .webm, etc.)
- ✅ Verifique URL no product-images.json
- ✅ Teste URL diretamente no navegador

### Thumbnail aparece mas não reproduz?
1. **Verifique a URL**: Cole diretamente no navegador
2. **CORS**: Firebase Storage pode ter restrições
3. **Formato**: MP4 é mais compatível que outros formatos
4. **Tamanho**: Vídeos muito grandes podem falhar

### Vídeo funciona local mas não em produção?
1. **Variáveis de ambiente**: Confirme Firebase config
2. **Deploy**: Aguarde build completo (~2-3 minutos)  
3. **Cache**: Limpe cache do navegador (Ctrl+F5)

## 📋 Checklist para Novos Produtos

- [ ] Upload do vídeo no Firebase Storage
- [ ] URL adicionada ao product-images.json
- [ ] Executado `npm run validate-videos` 
- [ ] Vídeo aparece no relatório de validação
- [ ] Testado localmente (`npm run dev`)
- [ ] Atualizado Firestore (`update-product-images.mjs`)
- [ ] Feito deploy para produção
- [ ] Testado em produção

## 💡 Dicas de Otimização

### Tamanhos de Vídeo Recomendados
- **Duração**: 15-30 segundos máximo
- **Resolução**: 1080p ou 720p  
- **Formato**: MP4 (H.264 codec)
- **Tamanho**: < 10MB ideal, < 50MB máximo

### Nomenclatura de Arquivos
```
produto-nome-demo.mp4        ✅ Bom
produto-nome-unboxing.mp4    ✅ Bom
produto-nome.mp4             ✅ OK
video.mp4                    ❌ Muito genérico
```

## 🎯 Monitoramento Contínuo

Execute mensalmente:
```bash
npm run validate-videos
```

**Métricas para acompanhar:**
- 📊 Cobertura de vídeos (% produtos com vídeo)
- 🎬 Total de vídeos no catálogo  
- ✅ Taxa de detecção de vídeos (deve ser 100%)

Com essas implementações, todos os vídeos futuros devem funcionar automaticamente! 🎉