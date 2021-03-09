let counter = [];
let counterStep = 0;
let newField;
let tablePrint;
let productInfo = [];
let tNumber;
$("#addbtn").click(function () {
  fillReceipt();
  $("#gridContainer").append(newField);
});

function getProducts() {
  let totalBill = 0;
  for (let i = 0; i < counter.length; i++) {
    productInfo[i] = {
      name: $(`#product${counter[i]}Value`).val(),
      qnty: $(`#product${counter[i]}Qnty`).val(),
      price: $(`#product${counter[i]}Price`).val(),
      getProductTotal: function () {
        return this.qnty * this.price;
      },
    };
    if (productInfo[i].name == undefined) {
      continue;
    }
    tablePrint += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${productInfo[i].name}</td>
                    <td>${productInfo[i].qnty}</td>
                    <td>${productInfo[i].price}</td>
                    <td>${productInfo[i].getProductTotal()}</td>
                  </tr>`;
    totalBill += productInfo[i].getProductTotal();
  }
  tablePrint += `<tr>
                    <td colspan="4" class="text-center">Total</td>
                    <td>${totalBill}</td>
                  </tr>`;
}

$("#clcbtn").click(function () {
  tNumber = "Table Number:   " + $("#tableNumber input").val();
  getProducts();
  $("#fillReceipt label").append(tNumber);
  $("#tBody").html(tablePrint);
  $("#receipt").removeClass("d-none");
  $("#receipt").addClass("d-flix");
});

$("#closeIco").click(function () {
  tablePrint = "";
  tNumber = " ";
  $("#fillReceipt label").empty();
  $("#tableNumber input").val("");
  $("#tBody").empty();
  $("#receipt").removeClass("d-flex");
  $("#receipt").addClass("d-none");
});

function removeRow(rowNumber) {
  $(`.R${rowNumber}`).remove();
}

$("#clearbtn").click(function () {
  counterStep = 0;
  $("#gridContainer").empty();
  $("#tBody").empty();
  tablePrint = "";
});

function fillReceipt() {
  counter.push(counterStep);
  newField = `
  <div class="col-md-6 my-1 R${counter[counterStep]}">
            <input
              id="product${counter[counterStep]}Value"
              type="text"
              class="form-control d-block cart"
              placeholder="Product"
            />
          </div>
          <div class="col-md-2 col-sm-4 R${counter[counterStep]}">
            <input
              id="product${counter[counterStep]}Qnty"
              type="number"
              class="form-control d-block cart"
              placeholder="Quantity"
            />
          </div>
          <div class="col-md-2 col-sm-4 R${counter[counterStep]}">
            <input
              id="product${counter[counterStep]}Price"
              type="number"
              class="form-control d-block cart"
              placeholder="unit cost"
            />
          </div>
          <button onclick="removeRow(${counter[counterStep]})" class="R${counter[counterStep]} btn-c btn btn-outline-danger" type="button">
            Delete
           </button>
`;
  counterStep++;
}

function removeReceipt() {
  counter.pop(counterStep);
  newField = `
  <div class="col-md-6 my-1 R${counter[counterStep]}">
            <input
              type="text"
              class="form-control d-block cart"
              placeholder="Product"
            />
          </div>
          <div class="col-md-2 col-sm-4 R${counter[counterStep]}">
            <input
            id="qnty"
              type="number"
              class="form-control d-block cart"
              placeholder="Quantity"
            />
          </div>
          <div class="col-md-2 col-sm-4 R${counter[counterStep]}">
            <input
            id="uCost"
              type="number"
              class="form-control d-block cart"
              placeholder="unit cost"
            />
          </div>
          <button onclick="removeRow(${counter[counterStep]})" class="R${counter[counterStep]} btn-c btn btn-outline-danger" type="button">
            Delete
           </button>
`;
  counterStep--;
}

$("#printBtn").click(function () {
  $("#fillReceipt").printThis({
    importCSS: true,
    header: null, // prefix to html
    footer: null, // postfix to html
  });
});
