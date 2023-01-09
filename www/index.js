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
    insertLabelBeforeValue(list, "== Rawtransactions ==", "combinerawtransaction");
    insertLabelBeforeValue(list, "== Restricted assets ==", "checkaddressrestriction")
    insertLabelBeforeValue(list, "== Util ==", "estimatefee");
    /*
        
        getassetdata "asset_name"
    */


    const select = document.getElementById("procedureSelect");

    list.map(item => {
        const li = document.createElement("li");


        if (item.startsWith("==") === true) {
            li.style.listStyle = "none";
            li.style.marginTop = "20px";
            li.style.marginBottom = "0";
            const h3 = document.createElement("h3");
            h3.style.margin = "0";
            h3.innerHTML = item;
            li.appendChild(h3);
        }
        else {
            const a = document.createElement("a");
            a.innerHTML = item;

            a.addEventListener("click", function (event) {

                showHelpDialog(item);
            })
            li.appendChild(a);
        }
        document.getElementById("whitelist").appendChild(li);



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
            .then(codeResponse => codeResponse.text())
            .then(code => {
                document.getElementById(id).innerHTML = code;
                Prism.highlightAll();
            })


    }
    fetchCodeExample("codeexample.js", "codeExample");
    fetchCodeExample("codeexample_result.json", "codeExampleResult");

}

async function post(url, body) {
    const jsonString = JSON.stringify(body);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonString
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

async function showHelpDialog(procedure) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("open", true);

    const data = await post("/rpc", { method: "help", params: [procedure] });
    document.getElementById("help").innerHTML = data.result;


    dialog.innerHTML = `
    <article style="min-width: calc(80vw); font-size: 80%;">
      <header>
        <a href="#close" aria-label="Close" class="close"></a>
        ${procedure}
      </header>
      <p>
      <pre><code class="language-text" id="codeExample"> ${data.result}</code></pre>
      </p>
    </article>`

    dialog.querySelector("a").addEventListener("click", function () {
        document.body.removeChild(dialog);
    })

    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            document.body.removeChild(dialog);
        }

    });

    //Close on escape
    document.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.key === "Escape") {
            document.body.removeChild(dialog);
        }
    });

    document.body.appendChild(dialog);
    Prism.highlightAll();


}

work();