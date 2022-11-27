# SMART GRID - WorkSafe REST Server

## Introduzione

La presente app ha lo scopo di fornire tutti i servizi necessari all'applicazione 
per Android WorkSafe e all'applicazione per Wear OS. Per ulteriori dettagli consulta i repository:

* https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-2021-2022-AndroidApplication-Pizzolante
* https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-2021-2022-AppSmartWatch-Pizzolante

In particolare quest'app funge da server REST per:
1. Ottenere i parametri di setting.
2. Ottenere info sui beacons registrati (macchinari in movimento).
3. Memorizzare un nuovo evento di allarme.
4. Consultare lo storico dei rischi avvenuti in passato.

# Utilizzo

Per poter utilizzare l'app è necessario avere installato MongoDb. Quindi:
1. Importare il database in mongoDb (/worksafe\_server/worksafe_db)
2. Avviare il server mongoDb.
3. Avviare il server REST sulla porta 3000.
4. Dashboard disponibile all'indirizzo: http://localhost:63342/worksafe server/front-end.html

*NOTA BENE*: Per poter utilizzare correttamente il server è necessario andare a connetterlo
ad una rete comune, così come è stato fatto per gli altri dispositivi.
