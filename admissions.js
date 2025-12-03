// script.js - validation + UI
// Assumes email.js exposes a sendAdmissionEmails(formData) function that returns a Promise.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admissionForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');

  const modal = document.getElementById('successModal');
  const goHomeBtn = document.getElementById('goHomeBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Helper validators
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const digitsOnly = (v) => /^\d+$/.test(v);

  function showSpinner() {
    btnSpinner.classList.remove('d-none');
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
  }
  function hideSpinner() {
    btnSpinner.classList.add('d-none');
    btnText.textContent = 'Submit Application';
    submitBtn.disabled = false;
  }

  function showModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    // trap focus to Go Home for accessibility
    goHomeBtn.focus();
  }
  function hideModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  goHomeBtn.addEventListener('click', () => {
    window.location.href = './index.html';
  });
  closeModalBtn.addEventListener('click', hideModal);

  // Core validation routine
  function validateForm() {
    let valid = true;

    // Required fields list
    const requiredIds = [
      'studentName', 'dob', 'gender', 'classApplying',
      'parentName', 'phoneNumber', 'email', 'address'
    ];

    requiredIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.classList.add('is-invalid');
        valid = false;
      } else {
        el.classList.remove('is-invalid');
      }
    });

    // Email
    const email = document.getElementById('email');
    if (email && email.value.trim()) {
      if (!isEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        valid = false;
      } else {
        email.classList.remove('is-invalid');
      }
    }

    // Phone (10-15 digits)
    const phone = document.getElementById('phoneNumber');
    if (phone && phone.value.trim()) {
      const cleaned = phone.value.replace(/\D/g,'');
      if (!digitsOnly(cleaned) || cleaned.length < 10 || cleaned.length > 15) {
        phone.classList.add('is-invalid');
        valid = false;
      } else {
        phone.classList.remove('is-invalid');
      }
    }

    // NIN if provided must be 11 digits
    const nin = document.getElementById('nin');
    if (nin && nin.value.trim()) {
      const cleaned = nin.value.replace(/\D/g,'');
      if (!digitsOnly(cleaned) || cleaned.length !== 11) {
        nin.classList.add('is-invalid');
        valid = false;
      } else {
        nin.classList.remove('is-invalid');
      }
    }

    return valid;
  }

  // Build formData object to send to EmailJS
  function collectFormData() {
    const fd = {};
    new FormData(form).forEach((value, key) => {
      fd[key] = value;
    });
    return fd;
  }

  // Submit handler
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    // validate
    if (!validateForm()) {
      // scroll to first invalid field for better UX
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // All good — prepare to send
    const data = collectFormData();
    showSpinner();

    // call email.js send function (returns a Promise)
    if (typeof sendAdmissionEmails !== 'function') {
      hideSpinner();
      alert('EmailJS is not configured correctly (sendAdmissionEmails missing). Please check email.js.');
      return;
    }

    sendAdmissionEmails(data)
      .then(() => {
        hideSpinner();
        // reset form (optional)
        form.reset();
        showModal();
      })
      .catch((err) => {
        hideSpinner();
        console.error('Email send error:', err);
        alert('An error occurred while submitting the form. Please try again later.');
      });
  });

  // Allow Enter key submission from any input (default form behavior) — no extra code needed.
});
