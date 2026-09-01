(() => {
  const dialogs = {
    chooser: document.getElementById("chooserDialog"),
    buyer: document.getElementById("buyerDialog"),
    seller: document.getElementById("sellerDialog"),
  };

  const setBodyDialogState = () => {
    const anyOpen = Object.values(dialogs).some((dialog) => dialog && dialog.open);
    document.body.classList.toggle("dialog-open", anyOpen);
  };

  const openDialog = (name) => {
    const dialog = dialogs[name];
    if (!dialog) return;

    Object.values(dialogs).forEach((item) => {
      if (item && item.open) item.close();
    });

    dialog.showModal();
    setBodyDialogState();

    const firstInput = dialog.querySelector("input, select, button:not(.dialog-close)");
    window.setTimeout(() => firstInput?.focus(), 50);
  };

  document.querySelectorAll("[data-open-form]").forEach((button) => {
    button.addEventListener("click", () => openDialog(button.dataset.openForm));
  });

  document.querySelectorAll("[data-switch-form]").forEach((button) => {
    button.addEventListener("click", () => openDialog(button.dataset.switchForm));
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog")?.close();
      setBodyDialogState();
    });
  });

  Object.values(dialogs).forEach((dialog) => {
    if (!dialog) return;

    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

      if (clickedOutside) dialog.close();
    });

    dialog.addEventListener("close", setBodyDialogState);
  });

  document.querySelectorAll(".multi-step-form").forEach((form) => {
    const steps = Array.from(form.querySelectorAll(".form-step"));
    const nextButton = form.querySelector("[data-next]");
    const prevButton = form.querySelector("[data-prev]");
    const submitButton = form.querySelector(".submit-button");
    const formType = form.dataset.formType;
    const progress = document.querySelector(`[data-progress="${formType}"]`);
    const stepLabel = document.querySelector(`[data-step-label="${formType}"]`);

    let currentStep = 0;

    const showStep = (index) => {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach((step, stepIndex) => {
        step.classList.toggle("active", stepIndex === currentStep);
      });

      prevButton.style.display = currentStep === 0 ? "none" : "inline-flex";
      nextButton.style.display = currentStep === steps.length - 1 ? "none" : "inline-flex";
      submitButton.style.display =
        currentStep === steps.length - 1 ? "inline-flex" : "none";

      if (progress) {
        progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
      }

      if (stepLabel) {
        stepLabel.textContent = `Paso ${currentStep + 1} de ${steps.length}`;
      }

      steps[currentStep].querySelector("input, select")?.focus({ preventScroll: true });
    };

    const validateCurrentStep = () => {
      const fields = Array.from(
        steps[currentStep].querySelectorAll("input, select, textarea")
      ).filter((field) => !field.disabled);

      for (const field of fields) {
        if (!field.checkValidity()) {
          field.reportValidity();
          return false;
        }
      }

      return true;
    };

    nextButton.addEventListener("click", () => {
      if (validateCurrentStep()) showStep(currentStep + 1);
    });

    prevButton.addEventListener("click", () => showStep(currentStep - 1));

    showStep(0);
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
})();


// Envío de formularios mediante AJAX a Netlify Forms.
// Evita hacer POST directamente a gracias.html y redirige solo tras un envío exitoso.
function encodeFormData(formData){
  return new URLSearchParams(formData).toString();
}

document.querySelectorAll('.multi-step-form').forEach(form=>{
  form.addEventListener('submit',async event=>{
    event.preventDefault();

    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    const submit=form.querySelector('.submit-button');
    const originalText=submit?.textContent;

    if(submit){
      submit.disabled=true;
      submit.textContent='Enviando…';
    }

    try{
      const response=await fetch('/',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:encodeFormData(new FormData(form))
      });

      if(!response.ok){
        throw new Error(`Netlify respondió con ${response.status}`);
      }

      window.location.assign('/gracias.html');
    }catch(error){
      console.error('Error al enviar formulario:',error);
      alert('No pudimos enviar tu solicitud. Por favor inténtalo nuevamente.');

      if(submit){
        submit.disabled=false;
        submit.textContent=originalText;
      }
    }
  });
});
