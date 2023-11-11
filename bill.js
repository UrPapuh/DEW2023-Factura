function format(data) {
  return parseFloat(data).toFixed(2);
  //return Math.round((parseFloat(data) + Number.EPSILON) * 100) / 100;
}
function insert() {
  const tbody = document.querySelector('tbody');
  // data
  const concepto = document.querySelector('[name="concepto"]').value; // string
  const cantidad = document.querySelector('[name="cantidad"]').value; // int
  const precioUnitario = format(document.querySelector('[name="precio"]').value); // float
  // fill tds
  const tr = document.createElement("tr"); // row
  const precioTotal = format(cantidad * precioUnitario);
  [concepto, cantidad, `${precioUnitario}€`, `${precioTotal}€`].forEach(data => {
    const td = document.createElement("td");
    td.textContent = data;
    tr.append(td);
  });
  // X function
  const td = document.createElement("td");
  td.textContent = 'X';
  td.setAttribute("onclick","del(this)");
  tr.append(td);
  tbody.append(tr); // append
  calculate();
}
function del(td) {
  td.parentElement.remove(); // tr.remove()
  calculate();
}
function setTasa(tasa) {
  document.getElementById('tasa').textContent = `${tasa}%`;
  calculate();
}
function calculate(){
  // data
  const tds = document.querySelectorAll('tbody td:nth-child(4)');
  const data = [...tds].map((td) => td.textContent);
  const tasa = parseInt(document.getElementById('tasa').textContent);
  // calc
  const subtotal = format(data.reduce((sum,precio) => sum += parseFloat(precio), 0));
  const impuestos = format(subtotal * tasa / 100);
  const total = parseFloat(subtotal) + parseFloat(impuestos);
  // sets
  document.getElementById('subtotal').textContent = `${subtotal}€`;
  document.getElementById('impuestos').textContent = `${impuestos}€`;
  document.getElementById('total').textContent = `${total}€`;
}