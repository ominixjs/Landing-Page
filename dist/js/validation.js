const form = document.getElementById("frm");
const cpf = document.getElementById("cpf");
const full_name = document.getElementById("full_name");
const email = document.getElementById("email");
const numeroCartao = document.getElementById("card_number");
const validade = document.getElementById("validade");
const cvv = document.getElementById("cvv");
const resultado = document.getElementById("res");

// Função para validar formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = numeroCartao.value.replace(/\s+/g, "");
  const data = validade.value;
  const codigo = cvv.value;

  let erros = [];

  full_name.value.trim();

  if (full_name.value === "") erros.push("Nome inválido.");
  if (email.value === "" || !validarEmail(email.value))
    erros.push("Email inválido.");
  if (!calcCpf(cpf.value)) erros.push("Número de CPF inválido.");
  if (!validarLuhn(numero)) erros.push("Número de cartão inválido.");
  if (!validarValidade(data)) erros.push("Validade inválida.");
  if (!validarCVV(codigo)) erros.push("CVV inválido.");

  if (erros.length > 0) {
    resultado.textContent = `❌ Erro: ${erros.join(" ")}`;
    return;
  } else {
    resultado.textContent = "✅ Cartão válido!";
  }
});

// Validar email
function validarEmail(input_email) {
  const regx = /^\S+@+\S+\.\S+$/;

  return regx.test(input_email);
}

// Validar CPF
function calcCpf(inputCpf) {
  let cpfValue = inputCpf;

  cpfValue = cpfValue.replace(/\D/g, ""); // remove tudo que não for número
  if (cpfValue.length !== 11) return false;

  // Checa se todos os números são iguais
  if (/^(\d)\1{10}$/.test(cpfValue)) return false;

  let soma = 0;

  // Verifica o 1° digito
  // O "for" vai pegar a posição de cada caractere
  for (let i = 0; i < 9; i++) {
    // Calcula os números do cpf.
    // Multiplica cada um dos 9 primeiros dígitos por um peso que vai de 10 até 2.
    // Soma os resultados
    // soma == valor dos numeros anteriores
    soma += parseInt(cpfValue.charAt(i)) * (10 - i);
  }
  // Calcula o resto da divisão da soma por 11.
  let resto = (soma * 10) % 11;
  // Se o resto for menor que 2, o dígito é 0. Senão, é 11 – resto.
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpfValue.charAt(9))) {
    return false;
  }

  soma = 0;
  // Verifica o 2° digito
  for (i = 0; i < 10; i++) {
    // Agora usa os 10 primeiros dígitos (já incluindo o dígito verificador encontrado antes).
    // Multiplica cada um deles por um peso que vai de 11 até 2.
    soma += parseInt(cpfValue.charAt(i)) * (11 - i);
  }
  // Faz a mesma regra do resto / 11.
  // Resto de 255 ÷ 11 = 2 → Como é maior que 2, 11 – 2 = 9.
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(cpfValue.charAt(10));
}

// 🔹 Função Luhn (checa número de cartão)
function validarLuhn(numero) {
  let soma = 0;
  let alternar = false;

  if (numero.length < 16) return false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero.charAt(i), 10);

    if (alternar) {
      n *= 2;
      if (n > 9) n -= 9;
    }

    soma += n;
    alternar = !alternar;
  }

  return soma % 10 === 0;
}

// 🔹 Validar data de validade
function validarValidade(data) {
  if (!/^\d{2}\/\d{2}$/.test(data)) return false;

  const [mes, ano] = data.split("/").map(Number);
  if (mes < 1 || mes > 12) return false;

  const anoAtual = new Date().getFullYear() % 100; // últimos 2 dígitos
  const mesAtual = new Date().getMonth() + 1;

  return ano > anoAtual || (ano === anoAtual && mes >= mesAtual);
}

// 🔹 Validar CVV (3 ou 4 dígitos)
function validarCVV(codigo) {
  return /^\d{3,4}$/.test(codigo);
}

// 🔹 Máscara para número do cartão (###.###.###-##)
cpf.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, ""); // remove não-dígitos
  valor = valor.substring(0, 11); // limita a 11 números
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  this.value = valor;
});

// 🔹 Máscara para número do cartão (#### #### #### ####)
numeroCartao.addEventListener("input", function () {
  this.value = this.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
});

// 🔹 Máscara para validade (MM/AA)
validade.addEventListener("input", function () {
  this.value = this.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .substring(0, 5);
});
