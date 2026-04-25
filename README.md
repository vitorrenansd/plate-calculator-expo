# Plate Calc

Calculadora de anilhas para powerlifting. Digite o peso total desejado na barra e o app informa exatamente quais anilhas colocar em cada lado.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Expo Go](https://expo.dev/go) instalado no celular Android

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/plate-calc.git
cd plate-calc

# Instale as dependências
npx expo install
```

## Rodando o app

```bash
npx expo start
```

Vai abrir um QR code no terminal. Abra o **Expo Go** no celular e escaneie.

## Regras de cálculo

- Barra olímpica padrão: **20kg**
- O peso digitado inclui a barra
- Anilhas disponíveis: 25 / 20 / 15 / 10 / 5 / 2.5 / 1.25 kg
- Sempre prioriza as anilhas maiores primeiro
- Se o peso exato não for possível, informa o mais próximo abaixo e a diferença

## Estrutura

```
├── App.tsx                        # Tela principal
└── src/
    ├── constants/plates.ts        # Definição das anilhas e cores
    ├── logic/calculatePlates.ts   # Lógica de cálculo (sem React)
    └── components/
        ├── BarVisual.tsx          # Representação visual da barra
        └── PlateResult.tsx        # Resultado textual
```