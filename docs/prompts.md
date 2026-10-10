# Prompt log

### 1. Ontwerp

> Ontwerp een product overzichtspagina voor een bouwmarkt webshop. Gebruik de kleuren van gamma.nl. Verlanglijst in een zijpaneel. De applicatie wordt gemaakt met Next.js en hero ui. Contrast wcag AA. Hou de header simpel voor nu, logo en “favorite” (verlanglijst) icon. De volgende afbeelding vind ik ook mooi ontwerp, deze mag je als inspiratie gebruiken.

### 2. Karwei Thema

> Voeg naast het gamma thema een karwei thema toe in app/themes/karwei.css, op dezelfde manier. Stijl van karwei.nl. Haal ook het lettertype op, wanneer google font importeren. Gratis font local font van next js gebruiken en anders een alternatief opzoeken. Verander ook punten zoals border radius. Maak een theme switch met `next-themes`. Gebruik hero ui switch in de header, met "Gamma" links en "Karwei" rechts. De keuze blijft bewaard, en er is geen layout shift.

### 3. Logo toevoegen

> Kun je via de websites van gamma en karwei de logo’s in svg ophalen? Zo ja, toon het logo bij het juiste thema. De link moet een zichtbare focus stijl hebben en met het toetsenbord bereikbaar zijn. Geef het logo ook een goede beschrijving

### 4. Skip link

> Voeg een "skip to content" link toe met de tekst "Overslaan en naar de inhoud gaan". Het moet het eerste element zijn dat focus krijgt met tab. De link is onzichtbaar tot focus met tab en goed contrast in beide thema's.

### 5. Product afbeeldingen

> Kun je deze twee foto's bij de producten zetten? De olijfboom hoort bij `olijfboom-sierpot`, de tuinslang bij `tuinslang-25m`. Gebruik next/image zowel op de kaart als in het zijpaneel en zorg dat `sizes` klopt met de grid, de browser zelf de juiste resolutie. Producten zonder foto houden gewoon hun icoon. Maak de bestanden ook wat kleiner, ze hoeven niet op volle grootte in de repo.

### 6. Web Vitals

> Kun je de build door lighthouse halen, op mobiel en desktop? Ik wil per meting de scores en de core web vitals zien, plus wat het lcp element is en waar de tijd in gaat zitten. Zet de verbeterpunten op volgorde, nog niks aanpassen, eerst even kijken.

### 7. Kolommen

> Op hele kleine schermen wil ik één kolom producten in plaats van twee. Gebruik een breakpoint in het thema, geen losse waarde.
