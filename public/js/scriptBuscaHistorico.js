var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic cGVkcm8uYmxvY2tjaGFpbjpCbG9jayYxMjM0NTY3ODk=");
myHeaders.append("Content-Type", "application/json");

window.buscar = async function buscar() {
    //var etapas = [];

    var codigolotenatura = document.getElementById("edtCodigoNaturaBusca").value;
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
 
    fetch(url+"/bcsgw/rest/v1/transaction/query", requestOptions)
        .then(response => response.text())
        .then(result => {
            var rs = JSON.parse(result.toString());
            var objrs = rs.result.payload;
            console.log("objrs: "+JSON.stringify(objrs[0].Record));
            var j = 0;
            //for (var i = (objrs.length-1); i >= (objrs.length-2) ; i--) {
                var CodigoLoteNatura = objrs[j].Record.CodigoLoteNatura;
                var DataRegistro = objrs[j].Record.DataRegistro;
                var Quantidade = objrs[j].Record.Quantidade;
                var TipoProduto = objrs[j].Record.TipoProduto;
                var CodigoLoteProcessamento = objrs[j].Record.CodigoLoteProcessamento;
                console.log("proc: "+CodigoLoteProcessamento);
                var listaetapa4 = document.getElementById("listaetapa4");

                var childlist = document.createElement('ul');
                var item1 = document.createElement('li');
                var item2 = document.createElement('li');
                var item3 = document.createElement('li');
                var item4 = document.createElement('li');
                var item5 = document.createElement('li');

                item1.innerHTML = "Codigo Lote - Natura: "+CodigoLoteNatura;
                item2.innerHTML = "Data Registro: "+DataRegistro;
                item3.innerHTML = "Quantidade: "+Quantidade;
                item4.innerHTML = "Tipo Produto: "+TipoProduto;
                item5.innerHTML = "Codigo Lote - Processamento: "+CodigoLoteProcessamento;
                childlist.appendChild(item1);
                childlist.appendChild(item2);
                childlist.appendChild(item3);
                childlist.appendChild(item4);
                childlist.appendChild(item5);

                listaetapa4.appendChild(childlist);

                //BUSCAR PELO CODIGO LOTE PROCESSAMENTO
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
                
                fetch(url+"/bcsgw/rest/v1/transaction/query", requestOptions)
                .then(response => response.text())
                .then(result => {
                    var rs = JSON.parse(result.toString());
                    var objrs = rs.result.payload;
                    console.log("objrs: "+objrs);
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

                        item1.innerHTML = "Codigo Lote - Processado: "+CodigoLoteProcessado;
                        item2.innerHTML = "Data Registro: "+DataRegistro;
                        item3.innerHTML = "Quantidade: "+Quantidade;
                        item4.innerHTML = "Tipo Produto: "+TipoProduto;
                        childlist.appendChild(item1);
                        childlist.appendChild(item2);
                        childlist.appendChild(item3);
                        childlist.appendChild(item4);

                        listaetapa3.appendChild(childlist);

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
                        
                        fetch(url+"/bcsgw/rest/v1/transaction/query", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            var rs = JSON.parse(result.toString());
                            var objrs = rs.result.payload;
                            console.log("objrs: "+JSON.stringify(objrs));

                            for (var i = (objrs.length-1); i == 0 ; i--) {
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

                                item1.innerHTML = "Codigo Lote: "+CodigoLote;
                                item2.innerHTML = "Data Registro: "+DataRegistro;
                                item3.innerHTML = "Etiqueta Cooperativa: "+EtiquetaCooperativa;
                                item4.innerHTML = "Quantidade Sacas: "+QuantidadeSacas;
                                item5.innerHTML = "Tipo Produto: "+TipoProduto;
                                item6.innerHTML = "Lista Etiquetas Familia: "+ListaEtiquetasFamilia;
                                childlist.appendChild(item1);
                                childlist.appendChild(item2);
                                childlist.appendChild(item3);
                                childlist.appendChild(item4);
                                childlist.appendChild(item5);
                                childlist.appendChild(item6);

                                listaetapa2.appendChild(breakline);
                                listaetapa2.appendChild(childlist);
                                //console.log("2");
                                var listaEtiquetasFamiliaArr = [];
                                if (ListaEtiquetasFamilia.indexOf(',') != -1) {
                                    listaEtiquetasFamiliaArr = ListaEtiquetasFamilia.split(',');
                                }
                                else{
                                    listaEtiquetasFamiliaArr[0] = ListaEtiquetasFamilia;
                                }
                                if(listaEtiquetasFamiliaArr.length > 1){
                                    for(var i=0; i<listaEtiquetasFamiliaArr.length; i++){
                                        //PASSAR ETIQUETA POR ETIQUETA DA LISTA - PEGANDO OS DADOS
                                        getFamilias(listaEtiquetasFamiliaArr,i);
                                        
                                    }
                                }
                                else{
                                    getFamilias(listaEtiquetasFamiliaArr,0);     
                                }

                            }


                            }).catch(error => console.log('error', error));

                    //}

                }).catch(error => console.log('error', error));

            textStatus.innerHTML = "Sucesso.";
            textStatus.style.color = "#9ACD32"

        }).catch(error => console.log('error', error));



}

function getFamilias(listaEtiquetasFamiliaArr,i){
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


    fetch(url+"/bcsgw/rest/v1/transaction/query", requestOptions)
    .then(response => response.text())
    .then(result => {
        var rs = JSON.parse(result.toString());
        var objrs = rs.result.payload;
        console.log("objrs: "+JSON.stringify(objrs));

        for (var i = (objrs.length-1); i >= 0 ; i--) {
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
            
            imgitem.src = "http://www.r13a.com/familia-s-"+Familia+".jpg";
            imgitem.style.width = "100px";
            imgitem.style.height = "100px";

            localitem1.innerHTML = "Familia: "+Familia;
            localitem2.innerHTML = "Etiqueta Familia: "+EtiquetaFamilia;
            localitem3.innerHTML = "Data Registro: "+DataRegistro;
            localitem4.innerHTML = "Peso Saca: "+PesoSaca;
            localitem5.innerHTML = "Tipo Produto: "+TipoProduto;
            localitem6.innerHTML = "CodigoCooperativa: "+CodigoCooperativa;
    
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


        }

    })
    .catch(error => console.log('error', error));
}