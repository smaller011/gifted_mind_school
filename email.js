document.addEventListener("DOMContentLoaded", function () {

  (function () {
    // --- CONFIGURE THESE ---
    const EMAILJS_PUBLIC_KEY  = 'mQ3f-d-m95iuMlwcb';
    const EMAILJS_SERVICE_ID  = 'service_kqbttfv';
    const EMAILJS_TEMPLATE_ID = 'template_jt7950k';
    // ------------------------

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.warn('EmailJS keys missing in email.js');
    }

    // Initialize EmailJS (NEW v4 Syntax)
    if (window.emailjs && typeof emailjs.init === 'function') {
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
      });
    } else {
      console.warn('EmailJS SDK not loaded — ensure the NEW CDN is included BEFORE email.js');
    }

    /**
     * sendAdmissionEmails(formData)
     * Sends the admission form data to the school email.
     */
    window.sendAdmissionEmails = function (formData) {
      if (!window.emailjs) {
        return Promise.reject(new Error('EmailJS SDK not available'));
      }

      const schoolTemplateParams = {
        studentName: formData.studentName || '',
        dob: formData.dob || '',
        gender: formData.gender || '',
        classApplying: formData.classApplying || '',
        department: formData.department || '',
        lin: formData.lin || '',
        nin: formData.nin || '',
        parentName: formData.parentName || '',
        phoneNumber: formData.phoneNumber || '',
        email: formData.email || '',
        address: formData.address || '',
        prevSchool: formData.prevSchool || '',
        lastClass: formData.lastClass || '',
        submitted_at: new Date().toISOString()
      };

      // Send email using new SDK
      return emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        schoolTemplateParams
      );
    };
  })();
});
