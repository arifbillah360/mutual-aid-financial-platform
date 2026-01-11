/**
 * 7 ENSEMBLE - Modal Management
 * Handles all modal functionality
 */

// Open modal functions
function showSevenModal() {
    document.getElementById('sevenModal').classList.add('show');
}

function showThreeModal() {
    const modal = document.getElementById('threeModal');
    if (modal) {
        modal.classList.add('show');
    } else {
        console.warn('Three modal not found - defaulting to seven modal');
        showSevenModal();
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
    }
}

// Close modal functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        event.target.style.display = "none";
    }
}

// Form submission handler
function submitForm(event, formType) {
    event.preventDefault();

    // Get form data
    const formId = formType === 'seven' ? 'sevenForm' : 'threeForm';
    const form = document.getElementById(formId);

    if (!form) {
        console.error('Form not found:', formId);
        return false;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // TODO: Send data to backend
    console.log('Form submitted:', data);

    // Show success message
    alert('Merci ! Votre inscription a été reçue. Nous vous contacterons bientôt !');

    // Close modal
    const modalId = formType === 'seven' ? 'sevenModal' : 'threeModal';
    closeModal(modalId);

    // Reset form
    form.reset();

    return false;
}
