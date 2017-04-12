var bingo = function () {
    // Private variables and functions.
    window.onload = function () {
        var testSequence = "011722475204365360702637497481233455758"
            + "3021540588819284467890612415073243348768407385761860"
            + "5113243781639566380081820659010455962821429466471093"
            + "5667287132130687703253151692742547985";

        var bingoStrip = new BingoStrip(6, 3, 9, 4);
        bingoStrip.initializeEmptyStrip();
        bingoStrip.populateBingoStrip(testSequence);
    }

    // Public variables and functions.
    return {
        goBingo: function () {
            /// <summary>Begin the bingo game.</summary>

            var notificationsElement = document.getElementById("notificationsArea");

            // Disable the Go! button.
            var goBtn = document.getElementById("goBtn");
            goBtn.setAttribute("class", "disabled");
            goBtn.setAttribute("disabled", "true");

            // Display drawn numbers under the Go! button.
            var lineBreakEl = document.createElement("br");
            notificationsElement.appendChild(lineBreakEl);

            // Initialize the number pool for the bingo game.
            var valuePool = [];
            for (var i = 1; i < 91; i++)
                valuePool.push(i);

            // Pick values from the valuePool at set intervals.
            var intervalListener = setInterval(function () {
                var removeIndex = Math.floor(Math.random() * valuePool.length);
                var currValue = valuePool.splice(removeIndex, 1);

                // Display the winning value on the notifications area.
                var winningValueElement = document.createElement("p");
                winningValueElement.innerText = currValue.toString();
                notificationsElement.appendChild(winningValueElement);

                // Mark the winning value.
                var currValueElement = document.querySelector("[data-value='" + currValue.toString() + "']");
                currValueElement.removeAttribute("data-value");
                currValueElement.classList.add("winningValue");

                if (valuePool.length < 1)
                    clearInterval(intervalListener);

                // Check for a winning ticket.
                var currentTicketNumber = currValueElement.getAttribute("data-ticketNumber");
                var currentTicketElement = document.querySelector("table[data-ticketnumber='" + currentTicketNumber + "']");
                var winningBoxes = currentTicketElement.querySelectorAll("[class='ticket winningValue']");
                if (winningBoxes.length >= 5) { // Winning bingo ticket.
                    clearInterval(intervalListener);
                    var currTicketNumberEl = document.getElementById("t" + (currentTicketNumber - 1) + "_ticketNumber");
                    currTicketNumberEl.classList.add("winningTicket");
                    var winningLabel = document.createElement("p");
                    winningLabel.innerText = "The winning ticket is " + currentTicketNumber + "!";
                    var lineBreakLabelEl = document.createElement("br");
                    notificationsElement.appendChild(lineBreakLabelEl);
                    notificationsElement.appendChild(winningLabel);
                }
            }, 2000);
        }
    };
}();