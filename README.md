# Marketing Lab

Sito statico multipagina con immagini, animazioni e moduli Web3Forms.

## Build

Richiede Node.js 22 o successivo. Non usa dipendenze esterne.

```sh
npm install
npm run build
```

I file pubblicabili vengono generati in `dist/`. Modificare i contenuti in `public/`.

## Pubblicare su Vercel da GitHub

1. Importare il repository `marica98russo-a11y/marketing` in Vercel.
2. Framework Preset: **Other**.
3. Root Directory: radice del repository (lasciare il valore predefinito).
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Premere Deploy. La configurazione e gia presente in `vercel.json`.

Non occorre installare WordPress o un database. I successivi push sul branch
di produzione collegato a Vercel attivano un nuovo deploy.

## Moduli e privacy

Web3Forms resta configurato con la chiave pubblica del modulo, non una password.
Provare l'invio dal dominio Vercel e controllare eventuali restrizioni di dominio
nel proprio account Web3Forms. Non sono state inviate email di prova durante
la preparazione. L'informativa privacy del sito deve essere completata prima
dell'uso pubblico dei moduli.

Non sono stati aggiunti blocchi all'indicizzazione; l'indicizzazione effettiva
dipende dai motori di ricerca e dalle impostazioni di pubblicazione.
