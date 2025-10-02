document.getElementById("admissionForm").addEventListener("submit", function(event) {
      event.preventDefault();
      let form = event.target;
      let valid = true;

      // Full Name
      if (!form.studentName.value.trim()) valid = false;

      // Date of Birth (age check ≥ 3 years)
      let dob = new Date(form.dob.value);
      let today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      let m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (isNaN(age) || age < 3) {
        form.dob.classList.add("is-invalid");
        valid = false;
      } else {
        form.dob.classList.remove("is-invalid");
      }

      // Phone Number
      let phone = form.phoneNumber.value.trim();
      if (!/^[0-9]{10,15}$/.test(phone)) {
        form.phoneNumber.classList.add("is-invalid");
        valid = false;
      } else {
        form.phoneNumber.classList.remove("is-invalid");
      }

      // Email
      let email = form.email.value.trim();
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        form.email.classList.add("is-invalid");
        valid = false;
      } else {
        form.email.classList.remove("is-invalid");
      }

      // NIN (optional but must be 11 digits if entered)
      let nin = form.nin.value.trim();
      if (nin && !/^\d{11}$/.test(nin)) {
        form.nin.classList.add("is-invalid");
        valid = false;
      } else {
        form.nin.classList.remove("is-invalid");
      }

      if (valid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });