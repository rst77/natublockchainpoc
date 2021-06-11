import {
    variables
} from './globalvars.js'

var url = variables.url;
var channel = variables.channel;
var chaincodename = variables.chaincodename;
var chaincodeVer = variables.chaincodeVer;

//endpoints blockchain table
var endpoint_lotesnatura = variables.blockchaintable_lotesnatura;
var endpoint_lotesprocessadora = variables.blockchaintable_lotesprocessadora;
var endpoint_lotescooperativas = variables.blockchaintable_lotescooperativas;
var endpoint_sacas = variables.blockchaintable_sacas;


window.cadastrarSacas = function cadastrarSacas() {
    var textStatus = document.getElementById("textStatus1");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
    myHeaders.append("Content-Type", "application/json");


    var edtEtiquetaFamilia = (document.getElementById('edtEtiquetaFamilia').value).toString();
    var edtFamilia = (document.getElementById('edtFamilia').value).toString();
    var edtPesoSaca = (document.getElementById('edtPesoSaca').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto').value).toString();
    var edtCodigoCooperativa = (document.getElementById('edtCodigoCooperativa').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addSacas",
        "args": [edtEtiquetaFamilia, edtFamilia, datetimenow, edtPesoSaca, edtTipoProduto, edtCodigoCooperativa]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo1').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

window.cadastrarProcessar = function cadastrarProcessar() {
    var textStatus = document.getElementById("textStatus2");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLote = (document.getElementById('edtCodigoLote').value).toString();
    var edtEtiquetaCooperativa = (document.getElementById('edtEtiquetaCooperativa').value).toString();
    var edtQuantidadeSacas = (document.getElementById('edtQuantidadeSacas').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto').value).toString();
    var edtListaEtiquetasFamilia = (document.getElementById('edtListaEtiquetasFamilia').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addProcessar",
        "args": [edtCodigoLote, datetimenow, edtEtiquetaCooperativa, edtQuantidadeSacas, edtTipoProduto, edtListaEtiquetasFamilia]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo2').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

window.cadastrarProcessado = function cadastrarProcessado() {
    var textStatus = document.getElementById("textStatus3");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLoteProcessado = (document.getElementById('edtCodigoLoteProcessado').value).toString();
    var edtQuantidade = (document.getElementById('edtQuantidade3').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto3').value).toString();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addProcessado",
        "args": [edtCodigoLoteProcessado, datetimenow, edtQuantidade, edtTipoProduto]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // var myHeadersOIC = new Headers();
    // myHeadersOIC.append("Authorization", "Basic bWF1bWlldHRvQGdtYWlsLmNvbTpPcmFjbGVAQDIwMjI=");
    // myHeadersOIC.append("Content-Type", "application/json");

    // var rawOIC = JSON.stringify({"CodigoLoteProcessado":edtCodigoLoteProcessado,"DataRegistro":datetimenow,"Quantidade":edtQuantidade,"TipoProduto":edtTipoProduto});

    // var requestOptionsOIC = {
    // method: 'POST',
    // headers: myHeadersOIC,
    // body: rawOIC,
    // redirect: 'follow'
    // };
    // console.log(rawOIC);
    // fetch("https://oic-idvkxij5qkne-gr.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/INTEGRACAOPOCNAT_1622826459/1.0/", requestOptionsOIC)
    // .then(response => response.text())
    // .then(result => {
    //     var resp = JSON.parse(result.toString());
    //     console.log(resp);
    // })
    // .catch(error => console.log('error', error));

    //inserirHistoricoBlockchainTable(edtCodigoLoteProcessado);

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                //Envia o item processado para a Natura 
                var myHeadersOIC = new Headers();
                myHeadersOIC.append("Authorization", "Basic bWF1bWlldHRvQGdtYWlsLmNvbTpPcmFjbGVAQDIwMjI=");
                myHeadersOIC.append("Content-Type", "application/json");

                var rawOIC = JSON.stringify({"CodigoLoteProcessado":edtCodigoLoteProcessado,"DataRegistro":datetimenow,"Quantidade":edtQuantidade,"TipoProduto":edtTipoProduto});

                var requestOptionsOIC = {
                method: 'POST',
                headers: myHeadersOIC,
                body: rawOIC,
                redirect: 'follow'
                };

                fetch("https://oic-idvkxij5qkne-gr.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/INTEGRACAOPOCNAT_1622826459/1.0/", requestOptionsOIC)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

                inserirHistoricoBlockchainTable(edtCodigoLoteProcessado);



                document.getElementById('btnproximo3').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

window.cadastrarNatura = function cadastrarNatura() {
    var textStatus = document.getElementById("textStatus4");
    textStatus.innerHTML = "Enviando..";
    textStatus.style.color = "#FFFF00";
    console.log("cadastrar");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
    myHeaders.append("Content-Type", "application/json");


    var edtCodigoLoteNatura = (document.getElementById('edtCodigoLoteNatura').value).toString();
    var edtQuantidade = (document.getElementById('edtQuantidade').value).toString();
    var edtTipoProduto = (document.getElementById('edtTipoProduto').value).toString();
    var edtCodigoLoteProcessamento = (document.getElementById('edtCodigoLoteProcessamento').value).toString()

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var datetimenow = today.toLocaleDateString() + " " + today.toLocaleTimeString();

    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "addNatura",
        "args": [edtCodigoLoteNatura, datetimenow, edtQuantidade, edtTipoProduto, edtCodigoLoteProcessamento]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/invocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result.toString());
            if (resp.returnCode == "Success") {
                document.getElementById('btnproximo4').style.pointerEvents = 'all';
                textStatus.innerHTML = "Enviado - Liberado próximo passo !";
                textStatus.style.color = "#9ACD32"
            } else {
                textStatus.innerHTML = resp.info.peerErrors[0].errMsg;
                textStatus.style.color = "#FF0000"
                console.log(result)
            }


        })
        .catch(error => console.log('error', error));
}

var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
myHeaders.append("Content-Type", "application/json");


var myHeadersBlockchainTable = new Headers();
myHeadersBlockchainTable.append("Content-Type", "application/json");


window.inserirHistoricoBlockchainTable = async function inserirHistoricoBlockchainTable(codigoLoteProcessado) {

    //BUSCAR PELO CODIGO LOTE PROCESSADO - LotesNatura
    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"CodigoLoteProcessado\":\"" + codigoLoteProcessado + "\"}}"]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + objrs);
            var j = 0;
            //for (var i = (objrs.length-1); i >= 0 ; i--) {
            var CodigoLoteProcessado = objrs[j].Record.CodigoLoteProcessado;
            var DataRegistro = objrs[j].Record.DataRegistro;
            var Quantidade = objrs[j].Record.Quantidade;
            var TipoProduto = objrs[j].Record.TipoProduto;

            //INSERT NA BLOCKCHAIN TABLE - LotesProcessadora
            var rawblocktable = JSON.stringify({
                "codigoloteprocessado": CodigoLoteProcessado,
                "dataregistro": DataRegistro,
                "quantidade": parseInt(Quantidade, 10),
                "tipoproduto": TipoProduto
            });

            var requestOptions_blocktable = {
                method: 'POST',
                headers: myHeaders,
                body: rawblocktable,
                redirect: 'follow'
            };

            fetch(endpoint_lotesprocessadora, requestOptions_blocktable)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));



            //BUSCAR PELO CODIGO LOTE DAS COOPERATIVAS
            var raw = JSON.stringify({
                "channel": channel,
                "chaincode": chaincodename,
                "chaincodeVer": chaincodeVer,
                "method": "queryEvent",
                "args": ["{\"selector\":{\"CodigoLote\":\"" + CodigoLoteProcessado + "\"}}"]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var rs = JSON.parse(result.toString());
                    var objrs = rs.result.payload;
                    console.log("objrs: " + JSON.stringify(objrs));

                    for (var i = (objrs.length - 1); i == 0; i--) {
                        var CodigoLote = objrs[i].Record.CodigoLote;
                        var DataRegistro = objrs[i].Record.DataRegistro;
                        var EtiquetaCooperativa = objrs[i].Record.EtiquetaCooperativa;
                        var QuantidadeSacas = objrs[i].Record.QuantidadeSacas;
                        var TipoProduto = objrs[i].Record.TipoProduto;
                        var ListaEtiquetasFamilia = objrs[i].Record.ListaEtiquetasFamilia;

                        //INSERT NA BLOCKCHAIN TABLE - LotesCooperativas
                        var rawblocktable = JSON.stringify({
                            "codigolote": CodigoLote,
                            "dataregistro": DataRegistro,
                            "etiquetacooperativa": EtiquetaCooperativa,
                            "quantidadesacas": parseInt(QuantidadeSacas, 10),
                            "tipoproduto": TipoProduto,
                            "listaetiquetasfamilia": ListaEtiquetasFamilia
                        });

                        var requestOptions_blocktable = {
                            method: 'POST',
                            headers: myHeaders,
                            body: rawblocktable,
                            redirect: 'follow'
                        };

                        fetch(endpoint_lotescooperativas, requestOptions_blocktable)
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .catch(error => console.log('error', error));



                        //console.log("2");
                        var listaEtiquetasFamiliaArr = [];
                        if (ListaEtiquetasFamilia.indexOf(',') != -1) {
                            listaEtiquetasFamiliaArr = ListaEtiquetasFamilia.split(',');
                        } else {
                            listaEtiquetasFamiliaArr[0] = ListaEtiquetasFamilia;
                        }
                        if (listaEtiquetasFamiliaArr.length > 1) {
                            for (var i = 0; i < listaEtiquetasFamiliaArr.length; i++) {
                                //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
                                getFamilias(listaEtiquetasFamiliaArr, i);

                            }
                        } else {
                            getFamilias(listaEtiquetasFamiliaArr, 0);
                        }

                    }


                }).catch(error => console.log('error', error));

            //}

        }).catch(error => console.log('error', error));

    // textStatus.innerHTML = "Sucesso.";
    // textStatus.style.color = "#9ACD32"



}

function getFamilias(listaEtiquetasFamiliaArr, i) {
    //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"EtiquetaFamilia\":\"" + listaEtiquetasFamiliaArr[i] + "\"}}"]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + JSON.stringify(objrs));

            for (var i = (objrs.length - 1); i >= 0; i--) {
                var EtiquetaFamilia = objrs[i].Record.EtiquetaFamilia;
                var Familia = objrs[i].Record.Familia;
                var DataRegistro = objrs[i].Record.DataRegistro;
                var PesoSaca = objrs[i].Record.PesoSaca;
                var TipoProduto = objrs[i].Record.TipoProduto;
                var CodigoCooperativa = objrs[i].Record.CodigoCooperativa;


                // var listaetapa1 = document.getElementById("listaetapa1");

                // var localchildlist = document.createElement('ul');
                // var imgitem = document.createElement('img');
                // var localitem1 = document.createElement('li');
                // var localitem2 = document.createElement('li');
                // var localitem3 = document.createElement('li');
                // var localitem4 = document.createElement('li');
                // var localitem5 = document.createElement('li');
                // var localitem6 = document.createElement('li');

                // imgitem.src = "http://www.r13a.com/familia-s-" + Familia + ".jpg";
                // imgitem.style.width = "100px";
                // imgitem.style.height = "100px";

                // localitem1.innerHTML = "Familia: " + Familia;
                // localitem2.innerHTML = "Etiqueta Familia: " + EtiquetaFamilia;
                // localitem3.innerHTML = "Data Registro: " + DataRegistro;
                // localitem4.innerHTML = "Peso Saca: " + PesoSaca;
                // localitem5.innerHTML = "Tipo Produto: " + TipoProduto;
                // localitem6.innerHTML = "CodigoCooperativa: " + CodigoCooperativa;

                // var breakline = document.createElement('br');

                // localchildlist.appendChild(imgitem);
                // localchildlist.appendChild(localitem1);
                // localchildlist.appendChild(localitem2);
                // localchildlist.appendChild(localitem3);
                // localchildlist.appendChild(localitem4);
                // localchildlist.appendChild(localitem5);
                // localchildlist.appendChild(localitem6);

                // listaetapa1.appendChild(breakline);
                // listaetapa1.appendChild(localchildlist);

                //INSERT NA BLOCKCHAIN TABLE - Sacas
                var rawblocktable = JSON.stringify({
                    "etiquetafamilia": EtiquetaFamilia,
                    "familia": Familia,
                    "dataregistro": DataRegistro,
                    "pesosaca": PesoSaca,
                    "tipoproduto": TipoProduto,
                    "codigocooperativa": CodigoCooperativa
                });

                var requestOptions_blocktable = {
                    method: 'POST',
                    headers: myHeaders,
                    body: rawblocktable,
                    redirect: 'follow'
                };

                fetch(endpoint_sacas, requestOptions_blocktable)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));


            }

        })
        .catch(error => console.log('error', error));
}

function getFamiliasQR(listaEtiquetasFamiliaArr, i) {
    //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
    var raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"EtiquetaFamilia\":\"" + listaEtiquetasFamiliaArr[i] + "\"}}"]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + JSON.stringify(objrs));

            for (var i = (objrs.length - 1); i >= 0; i--) {
                var EtiquetaFamilia = objrs[i].Record.EtiquetaFamilia;
                var Familia = objrs[i].Record.Familia;
                var DataRegistro = objrs[i].Record.DataRegistro;
                var PesoSaca = objrs[i].Record.PesoSaca;
                var TipoProduto = objrs[i].Record.TipoProduto;
                var CodigoCooperativa = objrs[i].Record.CodigoCooperativa;


                var listaetapa1 = document.getElementById("listaetapa1");

                var localchildlist = document.createElement('ul');
                var imgitem = document.createElement('img');
                var localitem1 = document.createElement('li');
                var localitem2 = document.createElement('li');
                var localitem3 = document.createElement('li');
                var localitem4 = document.createElement('li');
                var localitem5 = document.createElement('li');
                var localitem6 = document.createElement('li');

                imgitem.src = "http://www.r13a.com/familia-s-" + Familia + ".jpg";
                imgitem.style.width = "100px";
                imgitem.style.height = "100px";

                localitem1.innerHTML = "Familia: " + Familia;
                localitem2.innerHTML = "Etiqueta Familia: " + EtiquetaFamilia;
                localitem3.innerHTML = "Data Registro: " + DataRegistro;
                localitem4.innerHTML = "Peso Saca: " + PesoSaca;
                localitem5.innerHTML = "Tipo Produto: " + TipoProduto;
                localitem6.innerHTML = "CodigoCooperativa: " + CodigoCooperativa;

                var breakline = document.createElement('br');

                localchildlist.appendChild(imgitem);
                localchildlist.appendChild(localitem1);
                localchildlist.appendChild(localitem2);
                localchildlist.appendChild(localitem3);
                localchildlist.appendChild(localitem4);
                localchildlist.appendChild(localitem5);
                localchildlist.appendChild(localitem6);

                listaetapa1.appendChild(breakline);
                listaetapa1.appendChild(localchildlist);

                // //INSERT NA BLOCKCHAIN TABLE - Sacas
                // var rawblocktable = JSON.stringify({
                //     "etiquetafamilia": EtiquetaFamilia,
                //     "familia": Familia,
                //     "dataregistro": DataRegistro,
                //     "pesosaca": PesoSaca,
                //     "tipoproduto": TipoProduto,
                //     "codigocooperativa": CodigoCooperativa
                // });

                // var requestOptions_blocktable = {
                //     method: 'POST',
                //     headers: myHeaders,
                //     body: rawblocktable,
                //     redirect: 'follow'
                // };

                // fetch(endpoint_sacas, requestOptions_blocktable)
                //     .then(response => response.text())
                //     .then(result => console.log(result))
                //     .catch(error => console.log('error', error));


            }

        })
        .catch(error => console.log('error', error));
}









































window.buscarQR = async function buscarQR(loteNatura) {

    var codigolotenatura = loteNatura;
    console.log(codigolotenatura);

    //BUSCAR PELO CODIGO LOTE NATURA
    var raw = "";
    raw = JSON.stringify({
        "channel": channel,
        "chaincode": chaincodename,
        "chaincodeVer": chaincodeVer,
        "method": "queryEvent",
        "args": ["{\"selector\":{\"CodigoLoteNatura\":\"" + codigolotenatura + "\"}}"]
    });

    //"args": ["{\"selector\":{\"Teste\":\"" + teste + "\",\"Destino\":\"" + dest + "\"}}"]


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    //RESETAR UL Lists
    document.getElementById("listaetapa1").innerHTML = '';
    document.getElementById("listaetapa2").innerHTML = '';
    document.getElementById("listaetapa3").innerHTML = '';
    document.getElementById("listaetapa4").innerHTML = '';


    var textStatus = document.getElementById("textStatus5");
    textStatus.innerHTML = "Buscando..";
    textStatus.style.color = "#FFFF00";

    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: " + JSON.stringify(objrs[0].Record));
            var j = 0;
            //for (var i = (objrs.length-1); i >= (objrs.length-2) ; i--) {
            var CodigoLoteNatura = objrs[j].Record.CodigoLoteNatura;
            var DataRegistro = objrs[j].Record.DataRegistro;
            var Quantidade = objrs[j].Record.Quantidade;
            var TipoProduto = objrs[j].Record.TipoProduto;
            var CodigoLoteProcessamento = objrs[j].Record.CodigoLoteProcessamento;
            console.log("proc: " + CodigoLoteProcessamento);
            var listaetapa4 = document.getElementById("listaetapa4");

            var childlist = document.createElement('ul');
            var item1 = document.createElement('li');
            var item2 = document.createElement('li');
            var item3 = document.createElement('li');
            var item4 = document.createElement('li');
            var item5 = document.createElement('li');

            item1.innerHTML = "Codigo Lote - Natura: " + CodigoLoteNatura;
            item2.innerHTML = "Data Registro: " + DataRegistro;
            item3.innerHTML = "Quantidade: " + Quantidade;
            item4.innerHTML = "Tipo Produto: " + TipoProduto;
            item5.innerHTML = "Codigo Lote - Processamento: " + CodigoLoteProcessamento;
            childlist.appendChild(item1);
            childlist.appendChild(item2);
            childlist.appendChild(item3);
            childlist.appendChild(item4);
            childlist.appendChild(item5);

            listaetapa4.appendChild(childlist);

            // //INSERT NA BLOCKCHAIN TABLE
            // var rawblocktable = JSON.stringify({
            //     "codigolotenatura": CodigoLoteNatura,
            //     "dataregistro": DataRegistro,
            //     "quantidade": parseInt(Quantidade, 10),
            //     "tipoproduto": TipoProduto,
            //     "codigoloteprocessamento": CodigoLoteProcessamento
            // });

            // var requestOptions_blocktable = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: rawblocktable,
            //     redirect: 'follow'
            // };

            // fetch(endpoint_lotesnatura, requestOptions_blocktable)
            //     .then(response => response.text())
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error));


            //BUSCAR PELO CODIGO LOTE PROCESSAMENTO - LotesNatura
            var raw = JSON.stringify({
                "channel": channel,
                "chaincode": chaincodename,
                "chaincodeVer": chaincodeVer,
                "method": "queryEvent",
                "args": ["{\"selector\":{\"CodigoLoteProcessado\":\"" + CodigoLoteProcessamento + "\"}}"]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var rs = JSON.parse(result.toString());
                    var objrs = rs.result.payload;
                    console.log("objrs: " + objrs);
                    var j = 0;
                    //for (var i = (objrs.length-1); i >= 0 ; i--) {
                    var CodigoLoteProcessado = objrs[j].Record.CodigoLoteProcessado;
                    var DataRegistro = objrs[j].Record.DataRegistro;
                    var Quantidade = objrs[j].Record.Quantidade;
                    var TipoProduto = objrs[j].Record.TipoProduto;

                    var listaetapa3 = document.getElementById("listaetapa3");

                    var childlist = document.createElement('ul');
                    var item1 = document.createElement('li');
                    var item2 = document.createElement('li');
                    var item3 = document.createElement('li');
                    var item4 = document.createElement('li');

                    item1.innerHTML = "Codigo Lote - Processado: " + CodigoLoteProcessado;
                    item2.innerHTML = "Data Registro: " + DataRegistro;
                    item3.innerHTML = "Quantidade: " + Quantidade;
                    item4.innerHTML = "Tipo Produto: " + TipoProduto;
                    childlist.appendChild(item1);
                    childlist.appendChild(item2);
                    childlist.appendChild(item3);
                    childlist.appendChild(item4);

                    listaetapa3.appendChild(childlist);

                    // //INSERT NA BLOCKCHAIN TABLE - LotesProcessadora
                    // var rawblocktable = JSON.stringify({
                    //     "codigoloteprocessado": CodigoLoteProcessado,
                    //     "dataregistro": DataRegistro,
                    //     "quantidade": parseInt(Quantidade, 10),
                    //     "tipoproduto": TipoProduto
                    // });

                    // var requestOptions_blocktable = {
                    //     method: 'POST',
                    //     headers: myHeaders,
                    //     body: rawblocktable,
                    //     redirect: 'follow'
                    // };

                    // fetch(endpoint_lotesprocessadora, requestOptions_blocktable)
                    //     .then(response => response.text())
                    //     .then(result => console.log(result))
                    //     .catch(error => console.log('error', error));



                    //BUSCAR PELO CODIGO LOTE DAS COOPERATIVAS
                    var raw = JSON.stringify({
                        "channel": channel,
                        "chaincode": chaincodename,
                        "chaincodeVer": chaincodeVer,
                        "method": "queryEvent",
                        "args": ["{\"selector\":{\"CodigoLote\":\"" + CodigoLoteProcessado + "\"}}"]
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url + "/bcsgw/rest/v1/transaction/query", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            var rs = JSON.parse(result.toString());
                            var objrs = rs.result.payload;
                            console.log("objrs: " + JSON.stringify(objrs));

                            for (var i = (objrs.length - 1); i == 0; i--) {
                                var CodigoLote = objrs[i].Record.CodigoLote;
                                var DataRegistro = objrs[i].Record.DataRegistro;
                                var EtiquetaCooperativa = objrs[i].Record.EtiquetaCooperativa;
                                var QuantidadeSacas = objrs[i].Record.QuantidadeSacas;
                                var TipoProduto = objrs[i].Record.TipoProduto;
                                var ListaEtiquetasFamilia = objrs[i].Record.ListaEtiquetasFamilia;
                                var listaetapa2 = document.getElementById("listaetapa2");

                                var childlist = document.createElement('ul');
                                var item1 = document.createElement('li');
                                var item2 = document.createElement('li');
                                var item3 = document.createElement('li');
                                var item4 = document.createElement('li');
                                var item5 = document.createElement('li');
                                var item6 = document.createElement('li');

                                var breakline = document.createElement('br');
                                //console.log("1");

                                item1.innerHTML = "Codigo Lote: " + CodigoLote;
                                item2.innerHTML = "Data Registro: " + DataRegistro;
                                item3.innerHTML = "Etiqueta Cooperativa: " + EtiquetaCooperativa;
                                item4.innerHTML = "Quantidade Sacas: " + QuantidadeSacas;
                                item5.innerHTML = "Tipo Produto: " + TipoProduto;
                                item6.innerHTML = "Lista Etiquetas Familia: " + ListaEtiquetasFamilia;
                                childlist.appendChild(item1);
                                childlist.appendChild(item2);
                                childlist.appendChild(item3);
                                childlist.appendChild(item4);
                                childlist.appendChild(item5);
                                childlist.appendChild(item6);

                                listaetapa2.appendChild(breakline);
                                listaetapa2.appendChild(childlist);

                                // //INSERT NA BLOCKCHAIN TABLE - LotesCooperativas
                                // var rawblocktable = JSON.stringify({
                                //     "codigolote": CodigoLote,
                                //     "dataregistro": DataRegistro,
                                //     "etiquetacooperativa": EtiquetaCooperativa,
                                //     "quantidadesacas": parseInt(QuantidadeSacas, 10),
                                //     "tipoproduto": TipoProduto,
                                //     "listaetiquetasfamilia": ListaEtiquetasFamilia
                                // });

                                // var requestOptions_blocktable = {
                                //     method: 'POST',
                                //     headers: myHeaders,
                                //     body: rawblocktable,
                                //     redirect: 'follow'
                                // };

                                // fetch(endpoint_lotescooperativas, requestOptions_blocktable)
                                //     .then(response => response.text())
                                //     .then(result => console.log(result))
                                //     .catch(error => console.log('error', error));



                                //console.log("2");
                                var listaEtiquetasFamiliaArr = [];
                                if (ListaEtiquetasFamilia.indexOf(',') != -1) {
                                    listaEtiquetasFamiliaArr = ListaEtiquetasFamilia.split(',');
                                } else {
                                    listaEtiquetasFamiliaArr[0] = ListaEtiquetasFamilia;
                                }
                                if (listaEtiquetasFamiliaArr.length > 1) {
                                    for (var i = 0; i < listaEtiquetasFamiliaArr.length; i++) {
                                        //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
                                        getFamiliasQR(listaEtiquetasFamiliaArr, i);

                                    }
                                } else {
                                    getFamiliasQR(listaEtiquetasFamiliaArr, 0);
                                }

                            }


                        }).catch(error => console.log('error', error));

                    //}

                }).catch(error => console.log('error', error));

            textStatus.innerHTML = "Sucesso.";
            textStatus.style.color = "#9ACD32"

        }).catch(error => console.log('error', error));



}