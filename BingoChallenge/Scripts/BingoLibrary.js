var bingoLibrary = function () {
    // Private members.
    function TicketBox(ticket, row, column, value) {
        /// <summary>Represents a box on a ticket of the strip.</summary>
        /// <param name="ticket" type="Number">The number of the ticket on the strip (zero indexed).</param>
        /// <param name="row" type="Number">The number of the row of the current ticket that the box refers to (zero indexed).</param>
        /// <param name="column" type="Number">The number of the column of the current ticket the box refers to (zero indexed).</param>
        /// <param name="value" type="Number">The value of the current TicketBox.</param>

        this.ticket = ticket;
        this.row = row;
        this.column = column;
        this.value = value;
        this.putOnGrid = function () {
            /// <summary>Places the current TicketBox on the strip grid.</summary>
            var ticketBoxElement = document.getElementById("t" + this.ticket
                + "_r"
                + this.row
                + "_c" + this.column);
            ticketBoxElement.innerText = this.value;
            ticketBoxElement.setAttribute("data-value", this.value);
        };
    };

    // Public members.
    this.BingoStrip = function (ticketsNo, rowsNo, columnsNo, totalValues) {
        /// <summary>Represents a bingo ticket strip.</summary>
        /// <param name="ticketsNo" type="Number">The number of tickets in the bingo strip.</param>
        /// <param name="rowsNo" type="Number">The number of rows of each ticket in the bingo strip.</param>
        /// <param name="columnsNo" type="Number">The number of columns of each ticket in the bingo strip.</param>
        /// <param name="totalValues" type="Number">The number of filled text boxes in each ticket of the bingo strip.</param>


        // Public members.
        this.ticketsNo = ticketsNo;
        this.rowsNo = rowsNo;
        this.columnsNo = columnsNo;
        this.totalValues = totalValues;
        this.initializeEmptyStrip = function () {
            /// <summary>Displays the current bingo strip on the screen.</summary>

            var stripAreaElement = document.getElementById("stripArea");
            // Generate tickets.
            for (var i = 0; i < this.ticketsNo; i++) {
                var ticketTable = document.createElement("table");
                ticketTable.id = "t" + i.toString();
                ticketTable.setAttribute("class", "ticket");
                ticketTable.setAttribute("data-ticketNumber", (i + 1).toString());

                // Generate ticket rows.
                for (var j = 0; j < this.rowsNo; j++) {
                    var row = document.createElement("tr");
                    row.id = ticketTable.id + "_r" + j.toString();
                    row.setAttribute("class", "ticket");
                    ticketTable.appendChild(row);

                    // Generate columns for each row.
                    for (var l = 0; l < this.columnsNo; l++) {
                        var column = document.createElement("td");
                        column.id = row.id + "_c" + l.toString();
                        column.setAttribute("class", "ticket");
                        column.setAttribute("data-ticketNumber", (i + 1).toString());
                        row.appendChild(column);
                    }
                }
                stripAreaElement.appendChild(ticketTable);

                // Add the table number.
                var tableNumberEl = document.createElement("td");
                tableNumberEl.setAttribute("class", "tableNumber");
                tableNumberEl.setAttribute("rowspan", j.toString());
                tableNumberEl.innerText = (i + 1).toString();
                tableNumberEl.id = ticketTable.id + "_ticketNumber";
                var firstRowEl = document.getElementById("t" + i.toString() + "_r0");
                firstRowEl.appendChild(tableNumberEl);
            }
        };
        this.populateBingoStrip = function (ticketString) {
            /// <summary>Arranges values from a ticket string to the bingo strip tickets.</summary>
            /// <param name="ticketString" type="String">The ticket string containing the values.</param>

            var currTicket = 0;
            var currRow = 0;
            var currColumn = 0;
            var prevColumn = -1;

            var ticketValues = ticketString.match(/.{1,2}/g);
            for (var i = 0; i < ticketValues.length; i++) {
                var currValue = Number.parseInt(ticketValues[i]);
                currColumn = Math.floor(currValue / 10);

                // The last column also contains numbers from any higher tens.
                if (currColumn >= this.columnsNo)
                    currColumn = columnsNo - 1;

                // Find a later row or ticket on the strip.
                if (currColumn <= prevColumn) {
                    currRow++;
                    if (currRow >= this.rowsNo) {
                        currRow = 0;
                        currTicket++;
                    }
                }

                prevColumn = currColumn;
                var ticketBox = new TicketBox(currTicket, currRow, currColumn, currValue);
                ticketBox.putOnGrid();
            }
        };
    };
    return {
    };
}();