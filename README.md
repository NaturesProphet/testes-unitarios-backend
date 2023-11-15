# REFERÊNCIAS PARA TESTES UNITÁRIOS

[![Github Actions](https://github.com/naturesprophet/testes-unitarios-backend/actions/workflows/main.yml/badge.svg)](https://github.com/NaturesProphet/testes-unitarios-backend/actions)
[![codecov](https://codecov.io/gh/naturesProphet/testes-unitarios-backend/branch/main/graph/badge.svg?token=0160b944-1190-4f63-8b44-08a133faaa52)](https://codecov.io/gh/naturesProphet/testes-unitarios-backend)

Esse repositório tem o propósito de demonstrar algumas formas aceitáveis de utilizar mocks para testes unitários para o backend, envolvendo os tipos de implementações mais comuns do nosso dia a dia, como integrações de API, redis, rabbitmq e banco de dados.

Os exemplos contidos nesse repositório são apenas referências e não precisam ser seguidos a risca. O mais importante é sempre lembrar que não devemos mockar lógica. Mocks devem ser usados somente em dados que venham de fora do código em sí (consultas a bancos de dados, redis, APIs, etc).
