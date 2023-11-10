Array.prototype.insert = function (index, ...items) {
  this.splice(index, 0, ...items);
};

function insertLabelBeforeValue(list, label, value) {
  const position = list.indexOf(value);
  list.insert(position, label);
}
async function work() {
  //Fetch Whitelist
  const response = await fetch("/whitelist");
  const list = await response.json();

  //Be kind to your users and insert some headings/labels, explains how the whitelist is ordered
  insertLabelBeforeValue(list, "== Addressindex ==", "getaddressbalance");
  insertLabelBeforeValue(list, "== Assets ==", "getassetdata");
  insertLabelBeforeValue(list, "== Blockchain ==", "decodeblock");
  insertLabelBeforeValue(list, "== Control ==", "help");
  insertLabelBeforeValue(
    list,
    "== Rawtransactions ==",
    "combinerawtransaction"
  );
  insertLabelBeforeValue(
    list,
    "== Restricted assets ==",
    "checkaddressrestriction"
  );
  insertLabelBeforeValue(list, "== Util ==", "estimatefee");
  insertLabelBeforeValue(list, "== Mining ==", "getblocktemplate");
  /*
        
        getassetdata "asset_name"
    */

  const select = document.getElementById("procedureSelect");

  list.map((item) => {
    const option = document.createElement("option");
    option.innerText = item;
    select.appendChild(option);
  });

  select.addEventListener("change", async function (event) {
    const value = event.target.value;
    if (value === "-") {
      document.getElementById("help").innerHTML = "";
      return;
    }
    if (value.startsWith("=") == true) {
      document.getElementById("help").innerHTML = "";
      return;
    }
    const data = await post("/rpc", { method: "help", params: [value] });
    document.getElementById("help").innerHTML = data.result;
  });

  async function fetchCodeExample(url, id) {
    fetch(url)
      .then((codeResponse) => codeResponse.text())
      .then((code) => {
        if (url.indexOf(".html") > -1) {
          code = code.replaceAll("<", "&lt;");
        }

        document.getElementById(id).innerHTML = code;
        Prism.highlightAll();
      });
  }
  fetchCodeExample("codeexample.js", "codeExample");
  fetchCodeExample("codeexample_result.json", "codeExampleResult");
  fetchCodeExample("/demo/index.html", "codeExampleWeb");
}

async function post(url, body) {
  const jsonString = JSON.stringify(body);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonString,
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
}

work();

//The settings JSON object as promise, will be (re) used by custom elements
const settingsPromise = fetch("/settings").then((r) => r.json());

//An HTML element that prints out the value of "endpoint".
//We want to print out "Ravencoin mainnet" or similar och many places and only fetch setting once
class Settings extends HTMLElement {
  connectedCallback() {
    const key = this.getAttribute("key");
    //When settings are available, print out endpoint
    settingsPromise.then((settings) => {
      this.innerHTML = settings[key];
    });
  }
}
customElements.define("rpc-settings", Settings);

//Update document title
settingsPromise.then((settings) => {
  document.title = "RPC " + settings.environment;
});
