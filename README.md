# Stickruf UF 🌈

Hemsidan för Stickruf UF – custom stickers och färdiga stickerark i A4 för laptopen, skåpet och allt annat.

Sidan är byggd med ren HTML, CSS och JavaScript. Ingen installation och inget byggsteg behövs – öppna `index.html` i webbläsaren.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | All text och alla sektioner (hero, ark, byggare, FAQ, team, kontakt) |
| `css/style.css` | Utseendet. Färgerna ligger överst under `:root` |
| `js/main.js` | Produkter, priser, varukorg och custom-byggaren |

## Det här bör ni ändra innan lansering

1. **Mejladress** – `orderEmail` i `CONFIG` högst upp i `js/main.js`, och `hej@stickruf.se` i `index.html`.
2. **Priser** – `CONFIG` i `js/main.js` (custom-pris, holo-tillägg, frakt, klassrabatt) och `price` på varje produkt.
3. **Produkter** – listan `PRODUCTS` i `js/main.js`. Lägg till, ta bort eller byt emojis och färger.
4. **Teamet** – namn och roller i sektionen `#team` i `index.html`.
5. **Instagram** – länken i kontaktsektionen.
6. **Texter i FAQ** – stämmer leveranstid, frakt och laminering med hur ni faktiskt jobbar?

## Så funkar beställningar just nu

Kunden lägger saker i varukorgen och trycker på **Skicka beställning**. Då öppnas deras mejlprogram med en färdig beställning till er, och ni svarar med Swish-info. Custom-bilder bifogar kunden i samma mejl.

Det är enkelt och gratis, och det räcker gott för att komma igång. När ni växer kan ni byta till ett formulär (t.ex. Formspree) eller en riktig webbshop.

## Publicera gratis med GitHub Pages

1. Gå till repot på GitHub → **Settings** → **Pages**.
2. Under *Source*, välj branchen och mappen `/ (root)` och spara.
3. Efter någon minut ligger sidan på `https://<användarnamn>.github.io/stickruf/`.

Vill ni ha en egen domän, t.ex. `stickruf.se`, kan ni koppla den under samma inställning.
