Per Mail: Nodejs und angularcli müssen installiert sein, npm i ausführen, Visual Studio Code benutzen im Optimalfall, Testweise ng serve ausprobieren

1. Cypress zum Laufen bringen
    a: Starte die Angular App mit "ng serve" (defaultmäßig wird der Port 4200 dafür verwendet, Test baut darauf auf)
    b: Starte Cypress im Terminal mit "npx cypress open", wähle e2e Tests mit dem Browser deiner Wahl
    c: Der bestehende Test sollte problemlos durchlaufen

2. Data-cys: An HTML Elemente hinzufügen und die ID von HTML Elementen herausfinden mit Cypress Tools
    a: Teste, ob die Überschrift "Itea - best furniture in town" ist. Du musst dafür das HTML Template in "header.component.html" bearbeiten
        Hint -> https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements und https://docs.cypress.io/api/commands/should
        -> funktioniert es nicht? Hast du die Seite aufgerufen?
    b: Teste zusätzlich, ob das Produkt "Lampe" auf der Seite sichtbar ist, schreibe dafür einen neuen it-case. Die data-cy der Lampe kannst du über den Cypress selektor
        rausfinden (oben mittig links neben der URL)
    c: Welches Problem hast du in der vorigen Aufgabe entdeckt? https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks
        schreibe den URL Aufruf in eine passende Hook und entferne ihn aus den it-cases
        -> BeforeEach statt before, weil Cypress nach jedem it case alles resettet, auch das Seitenladen

3. Reporting
    a: mochawesome, Cypress basiert darauf, deswegen gut einzubinden
    b: Test headless ausführen mit der Reporter Option "npx cypress run --reporter mochawesome
    c: der Reporter ist in den cypress.config.ts eingebunden mit den Optionen (können bei Bedarf auch auf der Konsole mit übergeben werden, z.B. wenn man kein override will)

TODO 4. Verschiedene Elemente bedienen: Button, Inputs (lesen+schreiben) - Bsp Text hat 5 drinnen, dann mit 10 überschreiben, sonst nicht -> Chaining; Seite: Registrieren, Formular

5. API Call
    a: Wir wollen testen, ob beim Klick auf die Lampe eine detailierte Ansicht aufgerufen wird. Prüfe auf der Detailseite nach einer beliebigen Data-cy, die jetzt vorhanden sein sollte (z.B. für den button) (component: product.component.html)
    b: Was könnte es für Probleme geben, wenn wir die Produkte so testen, wie wir es gerade tun? Woher kommen die Produktdaten? Untersuche die Requests, welchen könnten wir abfangen? Hinweis: Entwicklerkonsole, https://docs.cypress.io/api/commands/wait
    c: Schreibe den Test um, so dass du wait nimmst, logge dir einmal die response
    d: du kannst auch den default timeout verändern, wielange Cypress ein Element suchen soll

6. Commands schreiben: Produkt zu Warenkorb hinzufügen oder Detailansicht öffnen und Button drücken
    a: Schreibe den Test aus der Aufgabe davor für ein anderes Shopelement
    b: Du wirst sehen, dass beide ziemlich ähnlichen Code haben, wir können Aktionen in die Commands auslagern, die öfter in unseren Tests vorkommen
    c: Klicke dann den Button auf der Detailseite