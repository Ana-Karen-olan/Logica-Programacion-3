document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const calculateBtn = document.getElementById('calculateBtn');
    const numberInput = document.getElementById('numberInput');
    const resultContainer = document.getElementById('resultContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    // Elementos del historial
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');

    // Array para almacenar el historial
    let calculationHistory = JSON.parse(localStorage.getItem('factorialHistory')) || [];

    // Inicializar la vista del historial
    updateHistoryDisplay();

    // Configurar eventos
    calculateBtn.addEventListener('click', calculateFactorial);
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Función principal para calcular factorial
    function calculateFactorial() {
        resetMessages();
        const input = numberInput.value.trim();
        const number = parseFloat(input);
        
        if (isNaN(number)) {
            showError("Por favor ingrese un número válido");
            return;
        }
        
        if (!Number.isInteger(number) || number < 0) {
            showError("El factorial solo está definido para enteros no negativos");
            return;
        }
        
        const factorial = computeFactorial(number);
        showResult(number, factorial);
        addToHistory(number, factorial);
        
        console.log(`[Calculadora] Factorial calculado: ${number}! = ${factorial}`);
    }

    // Función para computar factorial
    function computeFactorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Funciones auxiliares de UI
    function resetMessages() {
        errorMessage.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultContainer.innerHTML = '<div class="result-placeholder">Resultado aparecerá aquí</div>';
    }

    function showResult(number, factorial) {
        resultContainer.innerHTML = `
            <h3>Resultado:</h3>
            <p>El factorial de <strong>${number}</strong> es:</p>
            <div class="factorial-result">${factorial}</div>
        `;
    }

    // Funciones para el historial
    function addToHistory(number, result) {
        calculationHistory.unshift({
            number: number,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Limitar el historial a 10 elementos
        if (calculationHistory.length > 10) {
            calculationHistory = calculationHistory.slice(0, 10);
        }
        
        // Guardar en localStorage
        localStorage.setItem('factorialHistory', JSON.stringify(calculationHistory));
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        
        if (calculationHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No hay cálculos recientes</div>';
            return;
        }
        
        calculationHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-operation">${item.number}!</span>
                <span class="history-result">= ${item.result}</span>
                <span class="history-time">${item.timestamp}</span>
            `;
            historyList.appendChild(historyItem);
        });
    }

    function clearHistory() {
        calculationHistory = [];
        localStorage.removeItem('factorialHistory');
        updateHistoryDisplay();
    }
});