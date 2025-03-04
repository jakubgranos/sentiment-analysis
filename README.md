# Sentiment Analysis Application

Ocena umiejętności kandydata w zakresie pracy z JavaScript, TypeScript, CSS oraz
integracji z API i wykorzystania modeli AI.

Projekt został wykonany z użyciem:
node: v20.15.1
yarn 1.22.22

## Technologie i architektura

### Dlaczego NX + Vite?

Zdecydowałem się na wykorzystanie NX + Vite zamiast tradycyjnego Create React App (CRA) z kilku powodów:

-   Lepsza skalowalność projektu w porównaniu do CRA
-   Szybsze czasy budowania i hot-reload dzięki Vite
-   Możliwość łatwego dodawania nowych aplikacji/bibliotek w przyszłości
-   Wbudowane narzędzia do zarządzania monorepo
-   Lepsze wsparcie dla testów (np. łatwa integracja z Playwright lub innymi narzędziami do testów)
-   Zoptymalizowana konfiguracja dla TypeScript

### Stack technologiczny

-   **Framework**: React + TypeScript
-   **Build tool**: Vite
-   **Monorepo**: NX
-   **State Management**: React Query
-   **Styling**: SCSS Modules
-   **Testing**: Vitest + React Testing Library
-   **Code Quality**: ESLint + Prettier
-   **Git Hooks**: Husky + lint-staged

### Dlaczego React Query?

Zdecydowałem dodać się react-query ze względu na:

-   Wbudowaną obsługę cache
-   Automatyczne odświeżanie danych
-   Łatwe zarządzanie stanem ładowania i błędów
-   Możliwość ponownych prób w przypadku błędów
-   Zoptymalizowaną wydajność poprzez deduplication requestów

Dodatkowo do zapytań mógłbym użyć axios'a, ponieważ ułatwia trochę prace przy endpointach, lecz tutaj zdecydowałem się tego nie dodawac, gdyż pomyślałem, że celem zadania jest również sprawdzenie wiedzy w tym zakresie.

### Scss

Wybrałem stylowanie używając SCSS, dodatkowo tutaj mogłem to zrobić na kilka sposobów, np używajc scss modules i potem w kodzie react przekazywac to np jako styles.nazwa, ale zdecydowałem się na użycie BEM jak i prostego importu w konkretnym pliku,. gdyż jest to bardziej czytelne i łatwiejsze do zarządzania.

## Instrukcja uruchomienia

1. Instalacja odpalenia projektu:

```bash
npm install

lub

yarn
```

2. Konfiguracja zmiennych środowiskowych:

-   Skopiuj `.env.example` do `.env`

3. Uzupełnij

-   VITE_API_TOKEN - tokenem z darmowej aplikacji https://huggingface.co/
-   VITE_API_BASE_API_URL - base url api (https://api-inference.huggingface.co)

```bash
npm start

lub

yarn start
```

4. Uruchomienie testów:

```bash
npm test

lub

yarn test
```

5. Budowanie wersji produkcyjnej:

```bash
npm run build

lub
yarn build
```

## Analiza wyzwań

### Testy

Jednym z głównych wyzwań było skonfigurowanie i napisanie testów jednostkowych - moja wiedza była ograniczona jeśli chodzi o ten zakres, ale krótki research jak i tutoriale, pokazały mi jak mogę to zrobić, więc napisałem proste testy.

Udało sie napisać testy dla:

-   Test dla walidacji forma - tutaj dla testów podpiąłem validacje forma, sprawdzające np: czy jest error jak nie ma tesktu w polu, sprawdzanie czy jak sie wrzuci poprawne dane, to czy jest wszysstko okej oraz inne
-   Sprawzdenie endpointu do wysłania response, który jest odpowiedzialny za pokazanie sentymentu - tutaj napisałem testy sprawdzające różne kwestie związane z endpintem - np: sprawdzenie czy zwróci bład, czy błednym ustawieniu, network, jak i error response - loading

### GraphQL

Jeśli chodzi o GraphQL, to zdecydowałem się, że nie dodam go ze względu na to, że w GraphQL bardzo dawno nie pisałem i nie ukrywam, trochę się bałem o utrate punków, gdybym źle coś napisał i podpiął - dlatego badziej skupiłem się na innych kwestiach w kodzie

Aplikacja korzysta z Hugging Face API do analizy sentymentu. Więcej informacji [można uzyskać tutaj](https://huggingface.co/docs/api-inference/index)
