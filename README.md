# Fizzelix API

## Routes

#### General

| URL       | HTTP Verb | Protected | Response                                                           |
| --------- | --------- | --------- | ------------------------------------------------------------------ |
| /         | GET       | false     | Fizzelix API                                                       |
| /register | POST      | false     | validation errors object OR user model                             |
| /login    | POST      | false     | validation errors object OR { success: true, token: "Bearer ..." } |

#### Kombucha

_:type = "primary" or "secondary"_

| URL                         | HTTP Verb | Protected | Response                                                 |
| --------------------------- | --------- | --------- | -------------------------------------------------------- |
| /kombucha/:type             | POST      | true      | validation errors object OR newly created kombucha model |
| /kombucha/:type/:kombuchaId | GET       | true      | validation errors object OR kombucha model               |
| /kombucha/:type/:kombuchaId | PUT       | true      | validation errors object OR kombucha model               |
| /kombucha/:type/:kombuchaId | DELETE    | true      | validation errors object OR { success: true }            |

#### User

| URL            | HTTP Verb | Protected | Response                                                                                         |
| -------------- | --------- | --------- | ------------------------------------------------------------------------------------------------ |
| /users/current | GET       | true      | validation errors object OR { email: _user model's email_, kombuchas: _user model's kombuchas_ } |
| /users/:userId | PUT       | true      | validation errors object OR { success: "Successfully updated user!", user: _user model_ }        |
| /users/:userId | DELETE    | true      | validation errors object OR { success: "Successfully deleted user!" }                            |

## Data Models

#### User

```typescript
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 4 },
  username: { type: String, required: false },
  kombuchas: {
    primary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KombuchaPrimary",
      },
    ],
    secondary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KombuchaSecondary",
      },
    ],
  },
```

#### Primary Kombucha Fermentation

```typescript
  teaType: { type: String, required: true },
  containerSize: { type: String, required: true },
  containerType: { type: String, required: true },
  mainIngredients: {
    water: { type: Number, required: true },
    sugar: { type: Number, required: true },
    tea: { type: Number, required: true },
  },
  brewDate: { type: Date, required: true },
  brewDuration: { type: Number, required: true },
  notes: { type: String, required: false },
  archived: { type: Boolean, required: true },
  convertedToSecondary: { type: Boolean, required: true },

```

#### Secondary Kombucha Fermentation

```typescript
  bottleDate: { type: Date, required: true },
  fermentationDuration: { type: Number, required: true },
  flavors: { type: String, required: false },
  notes: { type: String, required: false },
  archived: { type: Boolean, required: true },
```

#### Validation Error Object

```typescript
errors: {
    general?: string;
    email?: string;
    password?: string;
  };
```
