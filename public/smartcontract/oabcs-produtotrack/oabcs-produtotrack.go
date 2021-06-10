/**
 *
 */
 package main

 import (
	 "bytes"
	 "crypto/ecdsa"
	 "crypto/x509"
	 "encoding/json"
	 "fmt"
	 "math/big"
	 
	 "github.com/hyperledger/fabric/core/chaincode/shim"
	 sc "github.com/hyperledger/fabric/protos/peer"
 )
 
 // Define the Smart Contract structure
 type SmartContract struct {
 }

//etapa 1. gera etiquetas e distribui (gerador->familias)
type Etiqueta struct{
	CodigoEtiqueta string `json:"CodigoEtiqueta"` 
	TipoEntidade string `json:"TipoEntidade"` //familia ou cooperativa
	CodigoEntidade string `json:"CodigoEntidade"` //ex: 1 (familia 1)
 }
//etapa 2. ensaca os itens e envia para cooperativa (familias->cooperativas)
 type ItemEnsacado struct{
	EtiquetaFamilia string `json:"EtiquetaFamilia"` //codigo etiqueta familia
	Familia string `json:"Familia"`
	DataRegistro string `json:"DataRegistro"` //timestamp
	PesoSaca string `json:"PesoSaca"` 
	TipoProduto string `json:"TipoProduto"`
	CodigoCooperativa string `json:"CodigoCooperativa"` //para qual cooperativa vai enviar as sacas
 }
//etapa 3. envio da cooperativa para processamento
 type Processar struct{
	CodigoLote string `json:"CodigoLote"` //(as 2 cooperativas precisam corresponder nesse codigo) para que tenhamos o histórico de quem participou do lote final da natura.
	DataRegistro string `json:"DataRegistro"` //timestamp
	EtiquetaCooperativa string `json:"EtiquetaCooperativa"`
	QuantidadeSacas string `json:"QuantidadeSacas"`
	TipoProduto string `json:"TipoProduto"`
	ListaEtiquetasFamilia string `json:"ListaEtiquetasFamilia"`
 }
 //etapa 4. processamento enviado para natura - industrializacão
 type Processado struct{
	CodigoLoteProcessado string `json:"CodigoLoteProcessado"`//continua no mesmo lote que recebeu das cooperativas (novamente, para manter o vínculo, todo o processo faz parte do mesmo lote)
	DataRegistro string `json:"DataRegistro"` //timestamp
	Quantidade string `json:"Quantidade"` //litros
	TipoProduto string `json:"TipoProduto"`
 }
//etapa 5. natura recebe e gera a transacão para finalizar em unidades de produto
 type Finalizado struct{
	CodigoLoteNatura string `json:"CodigoLoteNatura"`
	DataRegistro string `json:"DataRegistro"` //timestamp
	Quantidade string `json:"Quantidade"` //unidades
	TipoProduto string `json:"TipoProduto"`
	CodigoLoteProcessamento string `json:"CodigoLoteProcessamento"` //esse vai ser o vínculo com o código do lote que esta vinculado tanto com a processadora, quanto com as cooperativas participantes.
 }
 //etapa 6 e 7. inserir os dados das etapas 1-5 no blockchain table


 
 func main() {
	 // Create a new Smart Contract
	 err := shim.Start(new(SmartContract))
	 if err != nil {
		 fmt.Printf("Error creating new Smart Contract: %s", err)
	 } else {
				 fmt.Printf("Success creating new Smart Contract")
		 }
 }
 
 /**
  *
  */
 func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	 return shim.Success(nil);
 }
 
 /**
  *
  */
 func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
	 // Retrieve the requested Smart Contract function and arguments
	 function, args := APIstub.GetFunctionAndParameters()
 
	 // Route to the appropriate handler function to interact with the ledger appropriately
	 if function == "addEtiqueta" {
		 return s.addEtiqueta(APIstub)
	 } else if function == "addSacas"{
		return s.addSacas(APIstub)
	 } else if function == "addProcessar"{
		return s.addProcessar(APIstub)
	 } else if function == "addProcessado"{
		return s.addProcessado(APIstub)
	 } else if function == "addNatura"{
		return s.addNatura(APIstub)
	 } else if function == "queryEvent"{
		return s.queryEvent(APIstub,args)
	 }
	 
	 return shim.Error("Invalid Smart Contract function name.")
 }
 
 func (s *SmartContract) queryEvent(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
 
	 //   0
	 // "queryString"
	 if len(args) < 1 {
		 return shim.Error("Incorrect number of arguments. Expecting 1")
	 }
 
	 queryString := args[0]

 
	 queryResults, err := getQueryResultForQueryString(APIstub, queryString)
	 if err != nil {
		 return shim.Error(err.Error())
	 }

	 return shim.Success(queryResults)
 }
 //ADICIONAR ETIQUETAS - REGRAS
 func (s *SmartContract) addEtiqueta(APIstub shim.ChaincodeStubInterface) sc.Response {
	_, args := APIstub.GetFunctionAndParameters()

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments for event. Expecting 3")
	};
	CodigoEtiqueta := args[0]
	if CodigoEtiqueta == "" {
		return shim.Error("Invalid value for parameter CodigoEtiqueta.")
	}
	TipoEntidade := args[1]
	if TipoEntidade == "" {
		return shim.Error("Invalid value for parameter TipoEntidade.")
	}
	CodigoEntidade := args[2]
	if CodigoEntidade == "" {
		return shim.Error("Invalid value for parameter CodigoEntidade.")
	}
	
	   strjson, err := getQueryResultForQueryString(APIstub,"{\"selector\":{\"CodigoEtiqueta\":\"" + CodigoEtiqueta + "\"}}");
	   if err != nil {
		   erromsg := "Erro no primeiro err: "+err.Error()+" STRJSON: "+string(strjson);
		   return shim.Error(erromsg)
	   }
	   if(string(strjson) != "[]"){
		   return shim.Error("Essa etique ja existe, tente utilizar outro codigo.")
	   }

	   errorMsg := registerEtiqueta(APIstub,CodigoEtiqueta,TipoEntidade,CodigoEntidade)
	   if errorMsg != "" {
		   erromsg := "Erro no segundo err: "+errorMsg;
		   return shim.Error(erromsg)
	   }


	return shim.Success(nil);
}

func registerEtiqueta(APIstub shim.ChaincodeStubInterface, codigoEtiqueta string, tipoEntidade string, codigoEntidade string) (string) {
	//time1 := time.Now()
	//time1 := "tempo"
	newPosition := Etiqueta{CodigoEtiqueta: codigoEtiqueta, TipoEntidade: tipoEntidade, CodigoEntidade: codigoEntidade}
	positionEncoded, _ := json.Marshal(newPosition)
	err := APIstub.PutState(APIstub.GetTxID(), positionEncoded)
	if err != nil {
		return fmt.Sprintf("Failed to register" , "-")
	}	 
	return ""
}
//ADICIONAR SACAS - REGRAS
func (s *SmartContract) addSacas(APIstub shim.ChaincodeStubInterface) sc.Response {
	_, args := APIstub.GetFunctionAndParameters()

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments for event. Expecting 6")
	};
	EtiquetaFamilia := args[0]
	if EtiquetaFamilia == "" {
		return shim.Error("Invalid value for parameter EtiquetaFamilia.")
	}
	Familia := args[1]
	if Familia == "" {
		return shim.Error("Invalid value for parameter Familia.")
	}
	DataRegistro := args[2]
	if DataRegistro == "" {
		return shim.Error("Invalid value for parameter DataRegistro.")
	}
	PesoSaca := args[3]
	if PesoSaca == "" {
		return shim.Error("Invalid value for parameter PesoSaca.")
	}
	TipoProduto := args[4]
	if TipoProduto == "" {
		return shim.Error("Invalid value for parameter TipoProduto.")
	}
	CodigoCooperativa := args[5]
	if CodigoCooperativa == "" {
		return shim.Error("Invalid value for parameter CodigoCooperativa.")
	}
       //verifica uso da etiqueta
	   strjsonUsed, err1 := getQueryResultForQueryString(APIstub,"{\"selector\":{\"EtiquetaFamilia\":\"" + EtiquetaFamilia + "\"}}");
	   if err1 != nil {
		   erromsg := "Erro no primeiro err: "+err1.Error()+" STRJSON: "+string(strjsonUsed);
		   return shim.Error(erromsg)
	   }
	   if(string(strjsonUsed) != "[]"){
		   return shim.Error("Essa etiqueta de familia ja foi utilizada, tente utilizar outro codigo.")
	   }
	   //verifica existencia da etiqueta
	   strjsonExist, err2 := getQueryResultForQueryString(APIstub,"{\"selector\":{\"CodigoEtiqueta\":\"" + EtiquetaFamilia + "\"}}");
	   if err2 != nil {
		erromsg := "Erro no primeiro err: "+err2.Error()+" STRJSON: "+string(strjsonExist);
		return shim.Error(erromsg)
	   }
	   if(string(strjsonExist) == "[]"){
		return shim.Error("Essa etiqueta de familia não existe, tente utilizar outra.")
	   }

	   errorMsg := registerSacas(APIstub,EtiquetaFamilia,Familia,DataRegistro,PesoSaca,TipoProduto,CodigoCooperativa)
	   if errorMsg != "" {
		   erromsg := "Erro no segundo err: "+errorMsg;
		   return shim.Error(erromsg)
	   }


	return shim.Success(nil);
}

func registerSacas(APIstub shim.ChaincodeStubInterface, etiquetaFamilia string, familia string, dataRegistro string, pesoSaca string, tipoProduto string, codigoCooperativa string) (string) {
	//time1 := time.Now()
	//time1 := "tempo"
	newPosition := ItemEnsacado{EtiquetaFamilia: etiquetaFamilia, Familia: familia, DataRegistro: dataRegistro, PesoSaca: pesoSaca, TipoProduto: tipoProduto, CodigoCooperativa: codigoCooperativa}
	positionEncoded, _ := json.Marshal(newPosition)
	err := APIstub.PutState(APIstub.GetTxID(), positionEncoded)
	if err != nil {
		return fmt.Sprintf("Failed to register" , "-")
	}	 
	return ""
}

//ADICIONAR ItemProcessar - REGRAS
func (s *SmartContract) addProcessar(APIstub shim.ChaincodeStubInterface) sc.Response {
	_, args := APIstub.GetFunctionAndParameters()

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments for event. Expecting 6")
	};
	CodigoLote := args[0]
	if CodigoLote == "" {
		return shim.Error("Invalid value for parameter CodigoLote.")
	}
	DataRegistro := args[1]
	if DataRegistro == "" {
		return shim.Error("Invalid value for parameter DataRegistro.")
	}
	EtiquetaCooperativa := args[2]
	if EtiquetaCooperativa == "" {
		return shim.Error("Invalid value for parameter EtiquetaCooperativa.")
	}
	QuantidadeSacas := args[3]
	if QuantidadeSacas == "" {
		return shim.Error("Invalid value for parameter QuantidadeSacas.")
	}
	TipoProduto := args[4]
	if TipoProduto == "" {
		return shim.Error("Invalid value for parameter TipoProduto.")
	}
	ListaEtiquetasFamilia := args[5]
	if ListaEtiquetasFamilia == "" {
		return shim.Error("Invalid value for parameter ListaEtiquetasFamilia.")
	}
	
		strjson, err := getQueryResultForQueryString(APIstub,"{\"selector\":{\"CodigoEtiqueta\":\"" + EtiquetaCooperativa + "\",\"TipoEntidade\":\"familia\"}}");
		if err != nil {
		erromsg := "Erro no primeiro err: "+err.Error()+" STRJSON: "+string(strjson);
		return shim.Error(erromsg)
		}
		if(string(strjson) != "[]"){
			return shim.Error("Essa etiqueta é de familia e não pode ser usada neste processo, utilize uma etiqueta da cooperativa.")
		}

		errorMsg := registerProcessar(APIstub,CodigoLote,DataRegistro,EtiquetaCooperativa,QuantidadeSacas,TipoProduto,ListaEtiquetasFamilia)
		if errorMsg != "" {
			erromsg := "Erro no segundo err: "+errorMsg;
			return shim.Error(erromsg)
		}


	return shim.Success(nil);
}

func registerProcessar(APIstub shim.ChaincodeStubInterface, codigoLote string, dataRegistro string, etiquetaCooperativa string, quantidadeSacas string, tipoProduto string, listaEtiquetasFamilia string) (string) {
	//time1 := time.Now()
	//time1 := "tempo"
	newPosition := Processar{CodigoLote: codigoLote, DataRegistro: dataRegistro, EtiquetaCooperativa: etiquetaCooperativa, QuantidadeSacas: quantidadeSacas, TipoProduto: tipoProduto, ListaEtiquetasFamilia: listaEtiquetasFamilia}
	positionEncoded, _ := json.Marshal(newPosition)
	err := APIstub.PutState(APIstub.GetTxID(), positionEncoded)
	if err != nil {
		return fmt.Sprintf("Failed to register" , "-")
	}	 
	return ""
}

//ADICIONAR ItemProcessado - REGRAS
func (s *SmartContract) addProcessado(APIstub shim.ChaincodeStubInterface) sc.Response {
	_, args := APIstub.GetFunctionAndParameters()

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments for event. Expecting 4")
	};
	CodigoLoteProcessado := args[0]
	if CodigoLoteProcessado == "" {
		return shim.Error("Invalid value for parameter CodigoLoteProcessado.")
	}
	DataRegistro := args[1]
	if DataRegistro == "" {
		return shim.Error("Invalid value for parameter DataRegistro.")
	}
	Quantidade := args[2]
	if Quantidade == "" {
		return shim.Error("Invalid value for parameter Quantidade.")
	}
	TipoProduto := args[3]
	if TipoProduto == "" {
		return shim.Error("Invalid value for parameter TipoProduto.")
	}
	
	   errorMsg := registerProcessado(APIstub,CodigoLoteProcessado,DataRegistro,Quantidade,TipoProduto)
	   if errorMsg != "" {
		   erromsg := "Erro no segundo err: "+errorMsg;
		   return shim.Error(erromsg)
	   }


	return shim.Success(nil);
}

func registerProcessado(APIstub shim.ChaincodeStubInterface, codigoLoteProcessado string, dataRegistro string, quantidade string, tipoProduto string) (string) {
	//time1 := time.Now()
	//time1 := "tempo"
	newPosition := Processado{CodigoLoteProcessado: codigoLoteProcessado, DataRegistro: dataRegistro, Quantidade: quantidade, TipoProduto: tipoProduto}
	positionEncoded, _ := json.Marshal(newPosition)
	err := APIstub.PutState(APIstub.GetTxID(), positionEncoded)
	if err != nil {
		return fmt.Sprintf("Failed to register" , "-")
	}	 
	return ""
}

//ADICIONAR Industrializacao(Final) - REGRAS
func (s *SmartContract) addNatura(APIstub shim.ChaincodeStubInterface) sc.Response {
	_, args := APIstub.GetFunctionAndParameters()

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments for event. Expecting 5")
	};
	CodigoLoteNatura := args[0]
	if CodigoLoteNatura == "" {
		return shim.Error("Invalid value for parameter CodigoLoteNatura.")
	}
	DataRegistro := args[1]
	if DataRegistro == "" {
		return shim.Error("Invalid value for parameter DataRegistro.")
	}
	Quantidade := args[2]
	if Quantidade == "" {
		return shim.Error("Invalid value for parameter Quantidade.")
	}
	TipoProduto := args[3]
	if TipoProduto == "" {
		return shim.Error("Invalid value for parameter TipoProduto.")
	}
	CodigoLoteProcessamento := args[4]
	if CodigoLoteProcessamento == "" {
		return shim.Error("Invalid value for parameter CodigoLoteProcessamento.")
	}

	   errorMsg := registerNatura(APIstub,CodigoLoteNatura,DataRegistro,Quantidade,TipoProduto,CodigoLoteProcessamento)
	   if errorMsg != "" {
		   erromsg := "Erro no segundo err: "+errorMsg;
		   return shim.Error(erromsg)
	   }


	return shim.Success(nil);
}

func registerNatura(APIstub shim.ChaincodeStubInterface, codigoLoteNatura string, dataRegistro string, quantidade string, tipoProduto string, codigoLoteProcessamento string) (string) {
	//time1 := time.Now()
	//time1 := "tempo"
	newPosition := Finalizado{CodigoLoteNatura: codigoLoteNatura, DataRegistro: dataRegistro, Quantidade: quantidade, TipoProduto: tipoProduto, CodigoLoteProcessamento: codigoLoteProcessamento }
	positionEncoded, _ := json.Marshal(newPosition)
	err := APIstub.PutState(APIstub.GetTxID(), positionEncoded)
	if err != nil {
		return fmt.Sprintf("Failed to register" , "-")
	}	 
	return ""
}

 func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string)([] byte, error) {
	 fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)
	 resultsIterator, err := stub.GetQueryResult(queryString)
	 defer resultsIterator.Close()
	 if err != nil {
		 return nil, err
	 }
	 // buffer is a JSON array containing QueryRecords
	 var buffer bytes.Buffer
	 buffer.WriteString("[")
	 bArrayMemberAlreadyWritten := false
	 for resultsIterator.HasNext() {
		 queryResponse,
		 err := resultsIterator.Next()
		 if err != nil {
			 return nil, err
		 }
		 // Add a comma before array members, suppress it for the first array member
		 if bArrayMemberAlreadyWritten == true {
			 buffer.WriteString(",")
		 }
		 buffer.WriteString("{\"Key\":")
		 buffer.WriteString("\"")
		 buffer.WriteString(queryResponse.Key)
		 buffer.WriteString("\"")
		 buffer.WriteString(", \"Record\":")
		 // Record is a JSON object, so we write as-is
		 buffer.WriteString(string(queryResponse.Value))
		 buffer.WriteString("}")
		 bArrayMemberAlreadyWritten = true
	 }
	 buffer.WriteString("]")
	 fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())
	 return buffer.Bytes(), nil
 }
 
 func cryptoVerify(hash []byte, publicKeyBytes []byte, r *big.Int, s *big.Int) (result bool) {
	 fmt.Println("- Verifying ECDSA signature")
	 fmt.Println("Message")
	 fmt.Println(hash)
	 fmt.Println("Public Key")
	 fmt.Println(publicKeyBytes)
	 fmt.Println("r")
	 fmt.Println(r)
	 fmt.Println("s")
	 fmt.Println(s)
 
	 publicKey, err := x509.ParsePKIXPublicKey(publicKeyBytes)
	 if err != nil {
		 fmt.Println(err.Error())
		 return false
	 }
 
	 switch publicKey := publicKey.(type) {
	 case *ecdsa.PublicKey:
		 return ecdsa.Verify(publicKey, hash, r, s)
	 default:
		 return false
	 }
 }
 
 