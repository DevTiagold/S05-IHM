// objeto do usuário
const usuario = {
  nome: "Raphael",
  matricula: "123456",
  pendencia: false,
  acessibilidade: true,
};
const requisicao = { horario: "", minuto: "", dia: "", mes: "", ano: "" };
// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;

  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(
    (a) =>
      a.formato === tipoSelecionado &&
      a.status === true &&
      usuario.acessibilidade === a.acessivel
  );

  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById(
      "resultado"
    ).innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    document.getElementById("horario").innerText = ``;
    return;
  }

  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção.
  let armarioSorteado =
    armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  let armarioEmprestado = (armarios.find(
    (armario) => armario.id === armarioSorteado.id
  ).status = false);

  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  var d = new Date();

  requisicao.dia = d.getUTCDay();
  requisicao.mes = d.getUTCMonth();
  requisicao.ano = d.getFullYear();
  requisicao.horario = d.getHours();
  requisicao.minuto = d.getMinutes();

  data = new Date();
  data24horas = data.getTime() + 24 * 3600 * 1000;
  data24horas = new Date(data24horas);

  // Impmimimos uma mensagem de reserva para o usuário.
  document.getElementById(
    "resultado"
  ).innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!`;

  console.log(usuario);
  console.log(armarios);
}

function minhasPendencias() {
  if (usuario.pendencia === true) {
    document.getElementById(
      "resultado"
    ).innerText = `Olá, ${usuario.nome}! Você tem uma pendência!`;
    document.getElementById(
      "horario"
    ).innerText = `${usuario.nome}, você requisitou no dia ${requisicao.dia}/${requisicao.mes}/${requisicao.ano} às ${requisicao.horario}:${requisicao.minuto} \n`;
  } else
    document.getElementById(
      "resultado"
    ).innerText = `Olá, ${usuario.nome}! Você não tem nenhuma pendência!`;
}

function tempoRestante() {
  if (usuario.pendencia === true) {
    document.getElementById(
      "tempo"
    ).innerText = `${usuario.nome}, você deve devolver em ${data24horas} horas!`;
  } else
    document.getElementById(
      "resultado"
    ).innerText = `Olá, ${usuario.nome}! Você não tem nenhuma pendência!`;
}
