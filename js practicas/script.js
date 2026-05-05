// 1. Estado de la aplicación
let gastos = []; // Array para almacenar los objetos de gasto
const presupuestoMinimo = 500000;

// 2. Referencias a elementos del DOM
const btnAgregar = document.getElementById('addBtn');
const btnReiniciar = document.getElementById('resetBtn');
const inputLimite = document.getElementById('limit');
const inputConcepto = document.getElementById('item');
const inputMonto = document.getElementById('amount');
const contenedorLista = document.getElementById('listContainer');
const contenedorResumen = document.getElementById('summary');

/**
 * Función 1: Validar si el presupuesto cumple con el rango mínimo.
 * Se activa cada vez que intentamos agregar un gasto.
 */
function validarPresupuestoBase() {
    const valorActual = parseFloat(inputLimite.value);

    if (isNaN(valorActual) || valorActual < presupuestoMinimo) {
        alert("⚠️ Error: El presupuesto configurado debe ser de al menos 500,000.");
        inputLimite.focus();
        inputLimite.style.backgroundColor = "#fff2f2"; // Color de advertencia
        return false;
    }

    inputLimite.style.backgroundColor = "white";
    return true;
}

/**
 * Función 2: Calcula el total de los gastos acumulados.
 * Utiliza un bucle "for" para recorrer el array (Requisito técnico).
 */
function calcularGastoTotal() {
    let acumulado = 0;
    for (let i = 0; i < gastos.length; i++) {
        acumulado += gastos[i].monto;
    }
    return acumulado;
}

/**
 * Función 3: Procesa el ingreso de un nuevo gasto.
 */
function agregarNuevoGasto() {
    // Primero validamos el rango del presupuesto
    if (!validarPresupuestoBase()) return;

    const nombre = inputConcepto.value.trim();
    const costo = parseFloat(inputMonto.value);

    // Validación de campos vacíos o valores inválidos
    if (nombre === "" || isNaN(costo) || costo <= 0) {
        alert("Por favor, ingresa un concepto válido y un monto mayor a 0.");
        return;
    }

    // Almacenamiento en el Array (Uso de variables let/const y objetos)
    const nuevoGasto = {
        id: Date.now(),
        nombre: nombre,
        monto: costo
    };
    
    gastos.push(nuevoGasto);

    // Limpiar campos de entrada
    inputConcepto.value = "";
    inputMonto.value = "";

    // Actualizar la interfaz de usuario
    actualizarInterfaz();
}

/**
 * Función 4: Renderiza los resultados en el DOM (innerHTML).
 */
function actualizarInterfaz() {
    // Limpiar el contenedor antes de renderizar
    contenedorLista.innerHTML = "";

    // Renderizar la lista de gastos
    if (gastos.length === 0) {
        contenedorLista.innerHTML = "<p>No hay gastos registrados aún.</p>";
    } else {
        gastos.forEach(gasto => {
            contenedorLista.innerHTML += `
                <div class="expense-item">
                    <span>${gasto.nombre}</span>
                    <strong>$${gasto.monto.toLocaleString()}</strong>
                </div>
            `;
        });
    }

    const total = calcularGastoTotal();
    const limite = parseFloat(inputLimite.value);

    // Lógica Condicional (If/Else) para comparar el presupuesto
    let alertaClase = "";
    let alertaMensaje = "";

    if (total > limite) {
        alertaClase = "danger";
        alertaMensaje = "⚠️ ¡Atención! Has superado el presupuesto establecido.";
    } else {
        alertaClase = "success";
        alertaMensaje = "✅ Estás operando dentro del límite permitido.";
    }

    // Modificación de contenido dinámico
    contenedorResumen.innerHTML = `
        <div style="margin-top: 20px;">
            <p><strong>Total de Gastos:</strong> $${total.toLocaleString()}</p>
            <p><strong>Saldo Restante:</strong> $${(limite - total).toLocaleString()}</p>
            <div class="alert ${alertaClase}">
                ${alertaMensaje}
            </div>
        </div>
    `;
}

/**
 * Función 5: Reinicia la aplicación a su estado inicial.
 */
function reiniciarApp() {
    if (confirm("¿Estás seguro de que quieres borrar todos los datos?")) {
        gastos = [];
        actualizarInterfaz();
        inputLimite.value = 500000;
        inputLimite.style.backgroundColor = "white";
    }
}

// 3. Listeners para Eventos (Event Listeners)
btnAgregar.addEventListener('click', agregarNuevoGasto);
btnReiniciar.addEventListener('click', reiniciarApp);

// Escuchar cambios en el input de presupuesto para validación inmediata
inputLimite.addEventListener('change', validarPresupuestoBase);