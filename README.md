# Pokedex 101 API

## GraphQL API

### Get Cards

- Get Cards by page ranges:
  - **\$page:** It's the page number you want to get (1, 2, 3, 4).
  - **\$nuberOfPages:** It's the number of pages that you want to get (10, 20, 25, etc).

```GraphQL
  query GetCards ($page: Int!, $numberOfPages: Int) {
    getCards(page: $p, numberOfPages: $np) {
      Number
      image_url
      icon_url
      name
      type
      abilities
      experience_growth
      generation
      attack
      special_attack
      defense
      special_defense
      speed
      weight_kg
      height_m
      percentage_male
      percentage_female
      hp
    }
  }
```

Variables:

```JSON
  {
    "page": 3,
    "numberOfPages": 5
  }
```

Cards Schema:

```GraphQL
type Card {
    Number: ID!
    image_url: String!
    icon_url: String!
    name: String!
    type: String!
    abilities: String!
    experience_growth: String!
    generation: String!
    attack: Int!
    special_attack: Int!
    defense: Int!
    special_defense: Int!
    speed: Int!
    weight_kg: Int!
    height_m: Int!
    percentage_male: Int!
    percentage_female: Int!
    hp: Int!
}
```
