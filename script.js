// Get form and result elements
const form = document.querySelector('form');
const result = document.querySelector('#result');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');

// Function to determine BMI category and color based on value
function getBMICategory(bmi) {
    if (bmi < 16) return {cat: 'Severe Thinness', color: '#e53935'};
    if (bmi < 17) return {cat: 'Moderate Thinness', color: '#fb8c00'};
    if (bmi < 18.5) return {cat: 'Mild Thinness', color: '#fbc02d'};
    if (bmi < 25) return {cat: 'Normal', color: '#43a047'};
    if (bmi < 30) return {cat: 'Overweight', color: '#fbc02d'};
    if (bmi < 35) return {cat: 'Obese Class I', color: '#fb8c00'};
    if (bmi < 40) return {cat: 'Obese Class II', color: '#e53935'};
    return {cat: 'Obese Class III', color: '#b71c1c'};
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    // Check for empty fields
    if (!heightInput.value || !weightInput.value) {
        result.innerText = 'Fill Both Fields First';
        result.style.color = '#e53935';
        (!heightInput.value ? heightInput : weightInput).focus();
        return;
    }
    // Validate height
    if (isNaN(height) || height <= 0) {
        result.innerText = 'Invalid Height';
        result.style.color = '#e53935';
        heightInput.focus();
        return;
    }
    // Validate weight
    if (isNaN(weight) || weight <= 0) {
        result.innerText = 'Invalid Weight';
        result.style.color = '#e53935';
        weightInput.focus();
        return;
    }
    // Calculate BMI
    const bmi = parseFloat((weight / ((height * height) / 10000)).toFixed(2));
    const {cat, color} = getBMICategory(bmi);
    result.innerText = `${bmi} (${cat})`;
    result.style.color = color;
});

// Handle form reset
form.addEventListener('reset', () => {
    result.innerText = 'Result Will Appear Here';
    result.style.color = '#fff';
    heightInput.blur();
    weightInput.blur();
});

// Keyboard accessibility: Enter on inputs triggers submit
heightInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') form.requestSubmit();
});
weightInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') form.requestSubmit();
});