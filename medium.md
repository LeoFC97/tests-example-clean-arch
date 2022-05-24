Testes automatizados em camadas

Todo mundo já sabe a importancia de fazer testes automatizados e os ganhos que essa prática pode trazer, o desafio é escrever um código que possa executar testes automatizados de forma rápida e eficiente, principalmente quando o código é grande e/ou quando o código é complexo. 
Por isso é extremamente importante usar uma arquitetura que mantém as suas camadas desacopladas, ou seja, que possam ser testadas de forma independente.

O objetivo desse artigo não é falar sobre tipos de arquitetura e seus benefícios, mas sim sobre a importância de testar aplicações de forma independente. Dito isto, vamos utilizar uma arquitetura limpa em camadas. No final do artigo deixei alguns links que falam mais sobre a arquitetura escolhida e como ela funciona.


# Quais são as nossas principais camadas?

A arquitetura escolhida divide o código em camadas, ou seja, cada camada é responsável por uma única parte do código. As camadas são divididas em três principais grupos:

Controladores: responsável por receber o input, validar se o input está de acordo com o esperado, e e passar para a camada de casos de uso.

Casos de uso: responsável por definir o comportamento da aplicação, ou seja, implementar as regras de negócio que foram definidas e passar para a camada de respositórios.

Repositorios: responsável por lidar com o armazenamento os dados da aplicação, ou seja, implementar as regras de persistência.

Existem outras camadas que também podem ser consideradas, mas não estão abordadas aqui.

# O desfio de testar nessa arquitetura

O maior desafio de testar nessa arquitetura é que a camada de Controladores depende da camada de Casos de Uso, e a camada de Casos de Uso depende da camada de Repositorios. Temos dois desafios com isso:

1) Precisamos injetar essa dependencia na camada de Controladores, para que ela possa chamar os métodos da camada de Casos de Uso sem criar dependencia cíclica.

2) Nos testes teremos que mockar essa dependencia injetada. Isso significa que não queremos que a camada de Controladores chame os métodos da camada de Casos de Uso, mas sim que ela chame os métodos da camada de Casos de Uso que foram mockados.

# O projeto

Agora que já falamos sobre a importância de testar aplicações de forma independente, vamos começar a fazer um projeto para exemplificar isso.
O projeto para exemplificar esse artigo é bem simples, é um CRUD de listas de tarefas. O usuário pode criar, editar, excluir e listar listas de tarefas.

# Mão na massa

Esse é o nosso primeiro controller, create-list. A responsabilidade dele é criar uma nova lista de tarefas.



