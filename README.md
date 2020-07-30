# Pokedex 101 API Doc

# **GraphQL API Documentation**

---

### **API Endpoint**:

API:   
https://pokedexapi.guerracode.com   
Documentation:    
https://pokedexapi.guerracode.com/api-docs

---

# Get Cards 👇🏼

- Get Cards by page ranges:

  - **\$page:** It’s the page number you want to get (1, 2, 3, 4).
  - **\$nuberOfPages:** It’s the number of pages that you want to get (10, 20, 25, etc).

- Fields:

```graphql
getCards(page: Int, numberOfPages: Int): [Card]Ï
```

- Schema **Card:**

```graphql
type Card {
  _id: ID!
  pokemon_number: Int!
  icon_url: String
  english_name: String
  type: [String]
  abilities: [String]
  experience: String
  generation: String
  attack: Int
  special_attack: Int
  defense: Int
  special_defense: Int
  speed: Int
  hp: Int
  image_url: String
  weight_kg: String
  height_m: String
  percentage_male: String
  percentage_female: String
  group_by_force: Int
}
```

- Example **Query**:

```graphql
query GetCards($page: Int!, $numberOfPages: Int) {
  getCards(page: $page, numberOfPages: $numberOfPages) {
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
    group_by_force
  }
}
```

- Example **Variables**:

```graphql
{
	"page": 1,
	"numberOfPages": 20
}
```

- Example **Response**:

```graphql
{
  "data": {
    "getCards": [
      {
        "_id": "5f11ebaf75b8bb436b25b10b",
        "pokemon_number": 1,
        "icon_url": "https://serebii.net/pokedex-swsh/icon/001.png",
        "english_name": "Bulbasaur",
        "type": [
          "grass",
          "poison"
        ],
        "abilities": [
          "Overgrow",
          "Chlorophyll",
          ""
        ],
        "experience": 1059860,
        "generation": "1",
        "attack": 49,
        "special_attack": 65,
        "defense": 49,
        "special_defense": 65,
        "speed": 45,
        "hp": 45,
        "image_url": "https://serebii.net/pokemon/art/001.png",
        "weight_kg": "6.9kg",
        "height_m": "0.7m",
        "percentage_male": "88.14%",
        "percentage_female": "11.86%",
        "group_by_force": 0
      },
      {
        "_id": "5f11ebaf75b8bb436b25b10c",
        "pokemon_number": 2,
        "icon_url": "https://serebii.net/pokedex-swsh/icon/002.png",
        "english_name": "Ivysaur",
        "type": [
          "grass",
          "poison"
        ],
        "abilities": [
          "Overgrow",
          "Chlorophyll",
          ""
        ],
        "experience": 1059860,
        "generation": "1",
        "attack": 62,
        "special_attack": 80,
        "defense": 63,
        "special_defense": 80,
        "speed": 60,
        "hp": 60,
        "image_url": "https://serebii.net/pokemon/art/002.png",
        "weight_kg": "13.0kg",
        "height_m": "1.0m",
        "percentage_male": "88.14%",
        "percentage_female": "11.86%",
        "group_by_force": 0
      },
      {
        "_id": "5f11ebaf75b8bb436b25b10d",
        "pokemon_number": 3,
        "icon_url": "https://serebii.net/pokedex-swsh/icon/003.png",
        "english_name": "Venusaur",
        "type": [
          "grass",
          "poison"
        ],
        "abilities": [
          "Overgrow",
          "Chlorophyll",
          ""
        ],
        "experience": 1059860,
        "generation": "1",
        "attack": 82,
        "special_attack": 100,
        "defense": 83,
        "special_defense": 100,
        "speed": 80,
        "hp": 80,
        "image_url": "https://serebii.net/pokemon/art/003.png",
        "weight_kg": "100.0kg",
        "height_m": "2.0m",
        "percentage_male": "88.14%",
        "percentage_female": "11.86%",
        "group_by_force": 0
      }
    ]
  }
}
```

---

# Search Cards 👇🏼

- Search Cards by:
  - type
  - experience
  - attack
  - name
- Just send what you want to search for in the query parameters, you can put any parameter you want.
- You can control the page and numberOfPages like in **getCards()**.

- Fields:

```graphql
searchCards(
	type: String
	experience: [Int]
	attack: [Int]
	name: String
	page: Int
	numberOfPages: Int
): [Card]
```

- Schema: **Card** schema above 👆🏼
- Example **Query**:

```graphql
{
  searchCards(type: "fire", page: 1, numberOfPages: 3) {
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
    group_by_force
  }
}
```

### Attack and Experience searching:

- Attack min and max values allowed:
  - **Min**: 5, **Max**: 185
- Experience min and max values allowed:
  - **Min**: 600000, **Max**: 1640000

Example **Query**:

```graphql
# In the attack and experience array firs is the Min and then Max number.
{
  searchCards(attack: [54, 55], experience: [1250000, 1260000]) {
    pokemon_number
    english_name
    type
    attack
    defense
    experience
  }
}
```

- Example **Response**:

```graphql
{
  "data": {
    "searchCards": [
      {
        "pokemon_number": 374,
        "english_name": "Beldum",
        "type": [
          "steel",
          "psychic"
        ],
        "attack": 55,
        "defense": 80,
        "experience": 1250000
      },
      {
        "pokemon_number": 602,
        "english_name": "Tynamo",
        "type": [
          "electric",
          ""
        ],
        "attack": 55,
        "defense": 40,
        "experience": 1250000
      },
      {
        "pokemon_number": 629,
        "english_name": "Vullaby",
        "type": [
          "dark",
          "flying"
        ],
        "attack": 55,
        "defense": 75,
        "experience": 1250000
      },
    ]
  }
}
```

---

# Get by Force 👇🏼

- Filter cards by Force:

  - 2: More Powerful Pokemons
  - 1: Standard Pokemons
  - 0: Weak Pokemons

- Fields:
  - **force** number is required.

```graphql
getByForce(
	force: Int!
	page: Int
	numberOfPages: Int
): [Card]
```

- Schema: **Card** schema above 👆🏼
- Example **Query**:

```graphql
{
  getByForce(force: 2, page: 1, numberOfPages: 20) {
    english_name
    type
    experience
    attack
    defense
    group_by_force
  }
}
```

- Example **Response**:

```graphql
{
  "data": {
    "getByForce": [
      {
        "english_name": "Rampardos",
        "type": [
          "rock",
          ""
        ],
        "experience": 600000,
        "attack": 165,
        "defense": 60,
        "group_by_force": 2
      },
      {
        "english_name": "Haxorus",
        "type": [
          "dragon",
          ""
        ],
        "experience": 1250000,
        "attack": 147,
        "defense": 90,
        "group_by_force": 2
      },
      {
        "english_name": "Melmetal",
        "type": [
          "steel",
          ""
        ],
        "experience": 1170000,
        "attack": 143,
        "defense": 143,
        "group_by_force": 2
      }
    ]
  }
}
```

---

# Get Legendary 👇🏼

- Returns the type that is most likely to be a Legendary Pokémon

  - **type** by default is **psychic**

- Fields:

```graphql
getLegendary(
	type: String
	page: Int
	numberOfPages: Int
): [Card]
```

- Schema: **Card** schema above 👆🏼
- Example **Query**:

```graphql
{
  getLegendary(type: "psychic", page: 1, numberOfPages: 20) {
    english_name
    type
    experience
    attack
    defense
    group_by_force
  }
}
```

- Example **Response**:

```graphql
{
  "data": {
    "getLegendary": [
      {
        "english_name": "Deoxys",
        "type": [
          "psychic",
          ""
        ],
        "experience": 1250000,
        "attack": 150,
        "defense": 50,
        "group_by_force": 1
      },
      {
        "english_name": "Solgaleo",
        "type": [
          "psychic",
          "steel"
        ],
        "experience": 1250000,
        "attack": 137,
        "defense": 107,
        "group_by_force": 1
      },
      {
        "english_name": "Metagross",
        "type": [
          "steel",
          "psychic"
        ],
        "experience": 1250000,
        "attack": 135,
        "defense": 130,
        "group_by_force": 2
      }
    ]
  }
}
```

---

# Get Legend Percentage 👇🏼

- Returns type percentage that is most likely to be a Legendary Pokémon

  - **type** by default is **psychic**

- Fields:

```graphql
getLegendPercentage(type: String): [Legend]
```

- Schema **Legend**:

```graphql
type Legend {
  _id: ID!
  type_pokemon: String
  prob_type_legendary: Float
}
```

- Example **Query**:

```graphql
{
  getLegendPercentage(type: "psychic") {
    type_pokemon
    prob_type_legendary
  }
}
```

- Example **Response**:

```graphql
{
  "data": {
    "getLegendPercentage": [
      {
        "type_pokemon": "psychic",
        "prob_type_legendary": 1.498
      }
    ]
  }
}
```

# Create Pokemon

Create new Pokémon.

- Fields:

```graphql
createPokemon(input: CardInput!): Card

# CardInput
pokemon_number: Int
icon_url: Upload
english_name: String!
type: [String]
abilities: [String]
experience: Int
generation: String
attack: Int
special_attack: Int
defense: Int
special_defense: Int
speed: Int
hp: Int
image_url: Upload
weight_kg: String
height_m: String
percentage_male: String
percentage_female: String
group_by_force: Int
```

- Example **Query**:

```graphql
mutation CreatePokemon($icon: Upload, $image: Upload) {
  createPokemon(
    input: {
      english_name: "NewPokemon"
      icon_url: $icon
      image_url: $image
      type: ["fire", "super"]
    }
  ) {
    pokemon_number
    english_name
    icon_url
    image_url
    type
  }
}
```

- Example **Response**:

```graphql
{
  "data": {
    "createPokemon": {
      "pokemon_number": 895,
      "english_name": "Poncho",
      "icon_url": "https://storage.cloud.google.com/pokedex-images/iconshark.png",
      "image_url": "https://storage.cloud.google.com/pokedex-images/frame.png",
      "type": [
        "rock"
      ]
    }
  }
}
```

# Update Pokemon

Edit the field of any pokemon

- Fields

```graphql
editPokemon(_id: ID!input: CardEditInput!): Card

# CardInput:
icon_url: String
english_name: String
type: [String]
abilities: [String]
experience: Int
generation: String
attack: Int
special_attack: Int
defense: Int
special_defense: Int
speed: Int
hp: Int
image_url: String
weight_kg: String
height_m: String
percentage_male: String
percentage_female: String
group_by_force: Int
```

- Example Query:

```graphql
mutation updatePokemon($image: Upload) {
  updatePokemon(
    _id: "5f22512feeac0feef3b9420b"
    input: {
      english_name: "Ponchito"
      image_url: $image
      type: ["shark"]
      abilities: ["sweam", "fast"]
    }
  ) {
    pokemon_number
    english_name
    icon_url
    image_url
    type
  }
}
```

- Example Response

```graphql
{
  "data": {
    "updatePokemon": {
      "pokemon_number": 895,
      "english_name": "Ponchito",
      "icon_url": "https://storage.cloud.google.com/pokedex-images/iconshark.png",
      "image_url": "https://storage.cloud.google.com/pokedex-images/frame.png",
      "type": [
        "shark"
      ]
    }
  }
}
```

# Delete Pokemon

Delete all information of a Pokémon:

- Fields:

```graphql
deletePokemon(_id: ID!): String
```

- Example Query:

```graphql
mutation {
  deletePokemon(_id: "5f1fa8f974158732e74e68d7")
}
```

- Example Response:

```graphql
{
  "data": {
    "deletePokemon": "Pokemon with id 5f1fa8f974158732e74e68d7 deleted successfully"
  }
}
```
