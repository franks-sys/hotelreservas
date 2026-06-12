const API = "http://localhost:3000";

let quartos = [];

function abrirModalQuarto() {
    document.getElementById("modal-quarto").style.display = "flex";
}

function fecharModalQuarto() {
    document.getElementById("modal-quarto").style.display = "none";
}

function abrirModalReserva() {
    document.getElementById("modal-reserva").style.display = "flex";
}

function fecharModalReserva() {
    document.getElementById("modal-reserva").style.display = "none";
}

async function carregarQuartos() {
    try {
        const res = await fetch(`${API}/quarto/listar`);
        quartos = await res.json();
        renderQuartos();
    } catch (erro) {
        console.error("Erro ao carregar quartos:", erro);
    }
}

function renderQuartos() {
    const tbody = document.getElementById("tabela-quartos");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (quartos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center">
                    Nenhum quarto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    quartos.forEach(q => {
        tbody.innerHTML += `
            <tr>
                <td>${q.numero}</td>
                <td>${q.tipo}</td>
                <td>
                    <button class="btn-blue" onclick="verReservas(${q.id})">
                        Ver Reservas
                    </button>

                    <button class="btn-red" onclick="deletarQuarto(${q.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function criarQuarto() {
    const numero = document.getElementById("numero").value.trim();
    const tipo = document.getElementById("tipo").value.trim();

    if (!numero || !tipo) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const res = await fetch(`${API}/quarto/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                numero,
                tipo
            })
        });

        if (!res.ok) {
            throw new Error("Erro ao cadastrar quarto");
        }

        document.getElementById("numero").value = "";
        document.getElementById("tipo").value = "";

        fecharModalQuarto();
        carregarQuartos();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível cadastrar o quarto.");
    }
}

async function deletarQuarto(id) {
    if (!confirm("Deseja excluir este quarto?")) return;

    try {
        const res = await fetch(`${API}/quarto/excluir/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Erro ao excluir quarto");
        }

        carregarQuartos();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o quarto.");
    }
}

function verReservas(id) {
    localStorage.setItem("quartoId", id);
    window.location.href = "reservas.html";
}

async function criarReserva() {
    const quartoId = localStorage.getItem("quartoId");

    if (!quartoId) {
        alert("Nenhum quarto selecionado.");
        return;
    }

    const hospede = document.getElementById("hospede").value.trim();
    const entrada = document.getElementById("entrada").value;
    const saida = document.getElementById("saida").value;

    if (!hospede || !entrada || !saida) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const res = await fetch(`${API}/reserva/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hospede,
                data_entrada: new Date(entrada).toISOString(),
                data_saida: new Date(saida).toISOString(),
                quartoId: Number(quartoId)
            })
        });

        if (!res.ok) {
            throw new Error("Erro ao cadastrar reserva");
        }

        document.getElementById("hospede").value = "";
        document.getElementById("entrada").value = "";
        document.getElementById("saida").value = "";

        fecharModalReserva();
        carregarReservas();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível cadastrar a reserva.");
    }
}

async function carregarReservas() {
    try {
        const quartoId = localStorage.getItem("quartoId");

        if (!quartoId) return;

        const resQuartos = await fetch(`${API}/quarto/listar`);
        const quartos = await resQuartos.json();

        const quarto = quartos.find(q => q.id == quartoId);

        const titulo = document.querySelector(".titulo");

        if (titulo && quarto) {
            titulo.innerText =
                `Reservas do Quarto ${quarto.numero} - ${quarto.tipo}`;
        }

        const res = await fetch(`${API}/reserva/listar`);
        const reservas = await res.json();

        const filtradas =
            reservas.filter(r => r.quartoId == quartoId);

        const tbody = document.getElementById("tabela-reservas");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (filtradas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center">
                        Nenhuma reserva encontrada.
                    </td>
                </tr>
            `;
            return;
        }

        filtradas.forEach(r => {
            tbody.innerHTML += `
                <tr>
                    <td>${r.id}</td>
                    <td>${r.hospede}</td>
                    <td>${new Date(r.data_entrada).toLocaleDateString("pt-BR")}</td>
                    <td>${new Date(r.data_saida).toLocaleDateString("pt-BR")}</td>
                    <td>
                        <button class="btn-red" onclick="deletarReserva(${r.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar reservas:", erro);
    }
}

async function deletarReserva(id) {
    if (!confirm("Deseja excluir esta reserva?")) return;

    try {
        const res = await fetch(`${API}/reserva/excluir/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Erro ao excluir reserva");
        }

        carregarReservas();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir a reserva.");
    }
}

window.onload = () => {
    if (document.getElementById("tabela-quartos")) {
        carregarQuartos();
    }

    if (document.getElementById("tabela-reservas")) {
        carregarReservas();
    }
};