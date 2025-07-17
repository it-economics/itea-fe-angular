#### E2E Tests mit Cypress

Wir wollen unser itea Frontend um e2e Tests erweitern.<br>
In manchen Aufgaben befinden sich Hinweise, die euch weiterhelfen, falls ihr nicht weiterkommt. Ihr könnt es natürlich auch erstmal so probieren.<br>
Die e2e Tests befinden sich alle unter `cypress/e2e/spec.cy.ts`<br>
Ihr könnt mit `it.skip(...)` Tests einfach skippen, wenn ihr die Tests aus vergangenen Aufgaben nicht immer ausführen wollt.

##### Aufgabe 1
Zum ausführen der e2e Tests, muss unser Frontend laufen. Gebe dazu `ng serve` im Terminal ein. Standardmäßig startet das Frontend auf http://localhost:4200/. Prüfe einmal nach, ob dir das Frontend angezeigt wird und alles geklappt hat. Danach kannst du zusätzlich Cypress mit dem Kommando `npx cypress open` starten. Wähle einen Browser deiner Wahl aus, wenn Cypress den bestehenden Test ausführt, hat das Setup geklappt und du kannst mit der nächsten Aufgabe weitermachen.

##### Aufgabe 2
Einer der beiden existierenden Testfälle schlägt fehl. Schau dir in Cypress die detailierten Schritte an, um den Fehler zu finden und passe den Test an, so dass er grün wird.

Hinweis: Schau dir die best practices zum Selektieren von HTML Elementen an, um damit den obigen Fehler zu vermeiden https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements. Für die Änderung musst du Anpassungen im HTML Code vornehmen (Komponente ist die header.component.html)

##### Aufgabe 3
Schreibe einen neuen it-case. Du kannst dir aussuchen, welches Element du worauf prüfen willst. Eine Übersicht der üblichsten Tests findest du hier. Du kannst auch auf mehrere testen: https://docs.cypress.io/app/references/assertions#Common-Assertions

##### Aufgabe 4
Aktuell haben wir in jedem it-case einen Aufruf der Webseite. Um das nicht jedesmal angeben zu müssen, können wir hooks definieren. Welche es genau gibt, siehst du hier: https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks.
Wähle einen passenden Hook und lagere den cy.visit command dorthin aus

##### Aufgabe 5
Wir wollen jetzt ein bestimmtes Szenario testen: Nutzer xy möchte einen Stuhl zum Warenkorb hinzufügen. Dafür nutzt er die Produktsuche. Bei der Suche wollen wir testen, ob auch nur ein Produkt zurückgeliefert wird. Der Test endet nach dem "zum Warenkorb hinzufügen" Klick.

Tipp: Überlege dir hier, wo du am sinnvollsten data-cys einsetzt.

##### Aufgabe 6
In Cypress können Tests fehlschlagen, wenn die Daten im Backend nicht schnell genug geladen sind. Defaultmäßig versucht Cypress 4 Sekunden lang ein Command (z.B. cy.get) auszuführen, bevor er das Element als "nicht existierend" wahrnimmt. Werden in unserem Fall also erst nach den vier Sekunden die Produkte vom Backend geliefert, würden die Tests fehlschlagen.
Um den entgegenzuwirken, kann man in Cypress auf Requests warten (30s default). Zur Sicherheit wollen wir das bei uns einbauen, sobald wir die Seite laden.<br>
Du brauchst dafür das wait und intercept Command von Cypress: https://docs.cypress.io/api/commands/wait<br>
Schreibe einen it-case, in dem die Detailseite der Lampe aufgerufen wird, sobald die Response vom Call da ist.<br>
Logge dir gern die Response im wait Command einmal mit und schau sie dir in der Entwicklerkonsole an.

Hinweis: Du musst dein intercept Command vor dem API Aufruf (beforeHook) aufrufen.

##### Aufgabe 7
Cypress stellt einige Commands zur Verfügung (cy.get, cy.wait, ...). Wir können aber auch eigene Commands schreiben, die dann genauso mit cy.customCommand aufgerufen werden können. Zum Definieren und schreiben brauchst du die Datei `cypress/support/commands.ts`.<br>
Ein mögliches Beispiel wäre das aus Aufgabe 7. Wir können den Code aus dem it Case in ein Command auslagern und somit für verschiedene Produkte verwenden. Schreibe den it-case einmal um, so dass du nur noch ein Command verwendest.

##### Aufgabe 8
In Cypress können die Tests auch headless laufen. Die Ergebnisse können mit einem Reporter (extra npm package) schön aufbereitet werden. In dem Projekt ist mochawesome eingebunden. Du kannst mit `npx cypress run --reporter mochawesome` die Tests headless starten. Cypress hinterlegt einen HTML Report in dem Ordner `cypress/reporters`.