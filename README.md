***************************************************************************************
esercizio di oggi: Express Blog - API CRUD (parte 1)
repo: express-blog-api-crud
***************************************************************************************


Milestone 1

Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.
All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).
Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.
Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
Se tutto funziona, passiamo alla prossima milestone



Milestone 2

Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato. Importiamo questo file in cima al controller.
Ora passiamo ad implementare le logiche delle nostre CRUD:
Index dovrà restituire la lista dei post in formato JSON
Show dovrà restituire un singolo post in formato JSON
Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.



BONUS

Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.



Milestone 3

Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.
Testiamolo con postman.



Milestone 4

Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse.



BONUS

Quelli del giorno prima, se non già fatti
Aggiungere un controllo dell'errore nelle rotte che utilizzano un parametro obbligatorio :id quando la risorsa corrispondente non viene trovata, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
Aggiungere un controllo dell'errore per i parametri in ingresso nel body nelle rotte store e update , rispondere con uno stato 400 e un messaggio d’errore, sempre in formato JSON.





***************************************************************************************
esercizio di oggi: Express Blog - Middlewares
repo: express-blog-api-crud (sempre la stessa)
***************************************************************************************

Esercizio

Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.
Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio e uno status appropriato.