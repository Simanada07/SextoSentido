# Sexto Sentido — website

Site de uma página do Sexto Sentido Cabeleireiro, Estética e Bem-Estar (Porto),
feito com React + Vite.

## Correr

```bash
npm install
npm run dev      # ver o site no computador
npm run build    # gerar a pasta /dist para publicar
```

## Mudar o conteúdo

Tudo o que aparece na página — textos, telefone, horário, cores, serviços e fotos —
está num só ficheiro:

```
src/config/business.js
```

| Para…                         | Mudar em `business.js`                       |
| ----------------------------- | -------------------------------------------- |
| Mostrar o WhatsApp            | `contact.whatsapp: '351930553806'`           |
| Mostrar um email              | `contact.email: 'geral@exemplo.pt'`          |
| Mostrar opiniões de clientes  | acrescentar a `testimonials.items`           |
| Mudar o horário               | `locations.items[0].hoursTable` e `hours`    |
| Trocar uma foto               | o `image.src` dessa secção                   |
| Mudar as cores                | `theme`                                      |

O que ficar vazio (`''`) desaparece sozinho do site.

O formulário de marcação não tem servidor: mostra o pedido e pede ao cliente para
ligar. Se preencher WhatsApp ou email, o formulário abre a mensagem pronta a enviar.

## Estrutura

```
src/
  config/business.js   todo o conteúdo
  styles/global.css    letras, cores, espaços (estilo "nude" no fim do ficheiro)
  components/          secções da página
  components/ui/       Button, ServiceCard, Tilt, Reveal…
  utils/links.js       cria os links tel:/wa.me/mailto:/maps a partir do conteúdo
```
