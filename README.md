# GameHUB

- [Descrizione](#descrizione)
- [API](#api)
- [Styling Solution or Component Library](#styling-solution-or-component-library)
- [Pages](#pages)
- [API + User Interaction](#api--user-interaction)
- [Context API](#context-api)
- [Deployment](#deployment)

## Descrizione

L'app è una libreria per utenti che desiderano cercare giochi, leggerne un riassunto della trama e vederne i metascore. Possono registrarsi e avere una dashboard con i preferiti, lasciare recensioni o chattare con altri utenti.

## API

https://rawg.io/apidocs
    [x] Supports CORS
    [x] Requires an API Key
https://supabase.com/

## Styling Solution o Component Library

- https://getbootstrap.com/

## Pages

1. Home - Homepage del progetto che parte già con un elenco di giochi
2. Pagina di dettaglio del gioco - Dettaglio del gioco con informazioni aggiuntive, chat in tempo reale e recensioni
3. Review - Pagina in cui lasciare una review, accessibile solo dalla pagina di dettaglio del gioco
4. Login - Pagina di login con possibilità di accedere con autenticazione OAuth
5. Register - Pagina di registrazione con controllo sui campi del form
6. Genres - Filtro per genere di gioco
7. Account - Pagina in cui si possono vedere le proprie recensioni, giochi preferiti e avatar
8. Setting - Pagina in cui cambiare le info sul proprio account: nome, cognome, username e avatar

## API + User Interaction

- Utenti possono cercare un gioco con una query
- Utenti possono cliccare su un gioco per vederne il dettaglio e eventuali reviews
- Utenti possono filtrare su un gioco basandosi sul parametro genere
- Utenti loggati possono caricare informazioni profilo ( nome, cognome, avatar, username )
- Utenti loggati possono lasciare una review su un gioco specifico
- Utenti loggati possono creare una lista di giochi preferiti
- Utenti loggati possono rimuovere un gioco dai preferiti
- Utenti loggati possono chattare live su un gioco specifico

## Context API

- Utenti loggati possono condividere dati all'interno dell'applicazione.

## Deployment

- https://gamehub-delta.vercel.app/
