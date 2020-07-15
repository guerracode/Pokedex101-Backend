# Pokedex 101 API

## **GraphQL API**

#### API Endpoint: https://heroku.com/api

---

- **Schema**:
  This is the data you can get form a query response.

```GraphQL
type Card {
  _id: ID!
  pokemon_number: Int!
  icon_url: String
  english_name: String
  type: [String!]
  abilities: [String!]
  experience: String
  generation: String
  attack: String
  special_attack: String
  defense: String
  special_defense: String
  speed: String
  hp: String
  image_url: String
  weight_kg: String
  height_m: String
  percentage_male: String
  percentage_female: String
}
```

---

### Get Cards 👇🏼

- Get Cards by page ranges:
  - **\$page:** It's the page number you want to get (1, 2, 3, 4).
  - **\$nuberOfPages:** It's the number of pages that you want to get (10, 20, 25, etc).

```GraphQL
  query GetCards ($page: Int!, $numberOfPages: Int) {
    getCards(page: $page, numberOfPages: $numberOfPages){
    	_id
      pokemon_number
      icon_url
      english_name
      type
      abilities
      experience
      generation
      attack
      special_attack
      defense
      special_defense
      speed
      hp
      image_url
      weight_kg
      height_m
      percentage_male
      percentage_female
    }
  }
```

- Variables:

```JSON
  {
    "page": 1,
    "numberOfPages": 20
  }
```

---

### Search Cards 👇🏼

- Search Cards by:
  - type
  - experience
  - attack
  - name

Just send what wou want to search for in the query parameters, you can put them or not:

```GraphQL
{
  searchCards(type: "fire", attack: "50", experience: "1059860") {
    	_id
      pokemon_number
      icon_url
      english_name
      type
      abilities
      experience
      generation
      attack
      special_attack
      defense
      special_defense
      speed
      hp
      image_url
      weight_kg
      height_m
      percentage_male
      percentage_female
  }
}
```
