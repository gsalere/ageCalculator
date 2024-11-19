document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do botão

  // Obter valores dos campos
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dynamicYear = document.getElementById("dynamic-year");
  const dynamicMonth = document.getElementById("dynamic-month");
  const dynamicDay = document.getElementById("dynamic-day");

  const errors = document.querySelectorAll(".error");

  // Limpar mensagens de erro
  errors.forEach((error) => (error.style.display = "none"));

  let valid = true;
  // Validação básica dos campos
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  if (!day || day < 1 || day > 31) {
      showError(dayInput, "Please enter a valid day");
      valid = false;
  }
  if (!month || month < 1 || month > 12) {
      showError(monthInput, "Please enter a valid month");
      valid = false;
  }
  if (!year || year > new Date().getFullYear() || year < 1900) {
      showError(yearInput, "Please enter a valid year");
      valid = false;
  }

  // Validar se o dia é válido para o mês
  if (valid) {
      const maxDays = getMaxDaysInMonth(month, year);
      if (day > maxDays) {
          showError(dayInput, `This month has only ${maxDays} days`);
          valid = false;
      }
  }

  // Se algum campo estiver inválido, não prosseguir
  if (!valid) return;

  // Criar a data de nascimento
  const birthDate = new Date(year, month - 1, day); // Mês começa em 0

  // Validar se a data criada é válida
  if (birthDate.toString() === "Invalid Date") {
      alert("The date entered is invalid. Please check your inputs.");
      return;
  }

  // Calcular idade
  const today = new Date();
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Ajustar valores negativos
  if (ageDays < 0) {
      ageMonths -= 1;
      const daysInLastMonth = getMaxDaysInMonth(
          today.getMonth() === 0 ? 12 : today.getMonth(),
          today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()
      );
      ageDays += daysInLastMonth;
  }
  if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
  }

  // Atualizar o DOM
  dynamicYear.textContent = ageYears;
  dynamicMonth.textContent = ageMonths;
  dynamicDay.textContent = ageDays;
});

// Função para exibir mensagens de erro
function showError(input, message) {
  const errorLabel = input.nextElementSibling;
  errorLabel.textContent = message;
  errorLabel.style.display = "block";
}

// Função para obter o número máximo de dias em um mês
function getMaxDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate(); // O dia 0 retorna o último dia do mês anterior
}
