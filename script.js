var databasePKB = [
    {
        pkb: "PKB-001",
        mekanik: "Budi Santoso",
        unit: "Avanza - B 1234 XYZ",
        parts: [
            { kode: "PT-089", nama: "Kampas Rem Depan", qty: 1, status: "Ready" }
        ]
    },
    {
        pkb: "PKB-002",
        mekanik: "Joko Anwar",
        unit: "Innova - B 5678 ABC",
        parts: [
            { kode: "PT-205", nama: "Shock Breaker Belakang", qty: 2, status: "Back Order (BO)" }
        ]
    }
];

window.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("searchBtn");
    var input = document.getElementById("searchPkb");

    btn.addEventListener("click", jalankanPencarian);
    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            jalankanPencarian();
        }
    });
});

function jalankanPencarian() {
    var inputElem = document.getElementById("searchPkb");
    var kw = inputElem.value.trim().toUpperCase();
    var found = null;

    for (var i = 0; i < databasePKB.length; i++) {
        if (databasePKB[i].pkb.toUpperCase() === kw) {
            found = databasePKB[i];
            break;
        }
    }

    var resContainer = document.getElementById("resultContainer");
    var errContainer = document.getElementById("errorContainer");

    if (found) {
        document.getElementById("displayPkb").textContent = found.pkb;
        document.getElementById("displayMekanik").textContent = found.mekanik;
        document.getElementById("displayUnit").textContent = found.unit;

        var tb = document.getElementById("tableBody");
        tb.innerHTML = "";

        for (var j = 0; j < found.parts.length; j++) {
            var part = found.parts[j];
            var tr = document.createElement("tr");
            var values = [part.kode, part.nama, part.qty];

            for (var k = 0; k < values.length; k++) {
                var td = document.createElement("td");
                td.textContent = values[k];
                tr.appendChild(td);
            }

            var statusCell = document.createElement("td");
            var badge = document.createElement("span");
            badge.className = "badge " + (part.status === "Ready" ? "ready" : "bo");
            badge.textContent = part.status;
            statusCell.appendChild(badge);
            tr.appendChild(statusCell);
            tb.appendChild(tr);
        }

        resContainer.classList.remove("hidden");
        errContainer.classList.add("hidden");
    } else {
        resContainer.classList.add("hidden");
        errContainer.textContent = kw
            ? "Nomor PKB tidak ditemukan. Silakan periksa kembali."
            : "Masukkan nomor PKB terlebih dahulu.";
        errContainer.classList.remove("hidden");
    }
}
