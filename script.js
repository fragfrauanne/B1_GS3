const tasks = [
    { question: "Hier darf man nicht parken.", answer: "Hier darf nicht geparkt werden." },
    { question: "Im Deutschkurs soll man nur Deutsch sprechen.", answer: "Im Deutschkurs soll nur Deutsch gesprochen werden." },
    { question: "Man sollte die Pakete vorsichtig transportieren.", answer: "Die Pakete sollten vorsichtig transportiert werden." },
    { question: "Man muss die Wohnung renovieren.", answer: "Die Wohnung muss renoviert werden." },
    { question: "In Brasilien spricht man Portugiesisch.", answer: "In Brasilien wird Portugiesisch gesprochen." },
    { question: "Man muss Onkel Ben leider operieren.", answer: "Onkel Ben muss leider operiert werden." },
    { question: "Man sollte das Bad mal wieder putzen.", answer: "Das Bad sollte mal wieder geputzt werden." },
    { question: "In der Goethestraße baut man eine neue Schule.", answer: "In der Goethestraße wird eine neue Schule gebaut." },
    { question: "Man kann die Prüfung wiederholen.", answer: "Die Prüfung kann wiederholt werden." },
    { question: "Man muss das Formular unterschreiben.", answer: "Das Formular muss unterschrieben werden." },
    { question: "An dieser Kasse kann man nur bar bezahlen.", answer: "An dieser Kasse kann nur bar bezahlt werden." },
    { question: "Angst schreibt man groß.", answer: "Angst wird großgeschrieben." },
    { question: "Bei uns trinkt man viel Kaffee.", answer: "Bei uns wird viel Kaffee getrunken." },
    { question: "Man repariert das Auto nächsten Montag.", answer: "Das Auto wird nächsten Montag repariert." },
    { question: "Man muss die Kinder ins Bett bringen.", answer: "Die Kinder müssen ins Bett gebracht werden." },
    { question: "Man informiert Sie rechtzeitig.", answer: "Sie werden rechtzeitig informiert." },
    { question: "Man muss Klara gegen Grippe impfen.", answer: "Klara muss gegen Grippe geimpft werden." },
    { question: "In der U-Bahn darf man nicht rauchen.", answer: "In der U-Bahn darf nicht geraucht werden." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
