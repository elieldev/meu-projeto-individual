var extratoRaw = localStorage.getItem('extrato')
if (extratoRaw != null) {
    var extrato = JSON.parse(extratoRaw)
} else {
    var extrato = [];
}

function desenhaTabela() {
    linhasExistentes = [...document.querySelectorAll('table.tabela-extrato tbody .conteudo-dinamico')];
    linhasExistentes.forEach((element) => {
        element.remove()
    });

    if (extrato.length == 0) {
        document.querySelector('table.tabela-extrato tbody').innerHTML +=
        `<tr class="conteudo-dinamico">  
            <td style="border:none; text-align:center; width:100%; padding-left:60px">Nenhuma Transação cadastrada</td> 
        </tr>`;
      }

    for (dados in extrato) {
        document.querySelector('table.tabela-extrato tbody').innerHTML += `
            <tr class="conteudo-dinamico">
                <td class="nome-mercadoria">
                    ${ (extrato[dados].compraVenda ? '-' : '+')} &nbsp; ${extrato[dados].nome}
                </td>
                <td class="preco-mercadoria">
                    R$ ${extrato[dados].valor}
                </td>
            </tr>`};
}

function limparDados(p) {
    
    if (
        extrato.length > 0 &&
        window.confirm("Deseja remover todas as informações?")
      ) {
        for (element of document.querySelectorAll(".conteudo-dinamico")) {
          element.remove();
          localStorage.clear();
          extrato = [];
          desenhaTabela();
        }
      } else if (extrato <= 0) {
        alert("Não foi possivel limpar os dados pois não há transações no extrato..");
      }
}

function testaForm(e) {
    e.preventDefault();
    
    var extratoRaw = localStorage.getItem('extrato')
    if (extratoRaw != null) {
        var extrato = JSON.parse(extratoRaw)
    } else {
        var extrato = [];
    }
    
    extrato.push({
        compraVenda: (e.target.elements['compra-venda'].value == 'compra'),
        nome: e.target.elements['inpt-nome'].value,
        valor: e.target.elements['inpt-valor'].value
    }) 

    localStorage.setItem('extrato', JSON.stringify(extrato))
    window.location.href = ''
}

function cadastroTransacoes() {
    document.getElementById("compra-venda").focus();
} 

function formatarMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){  
    var sep = 0;  
    var key = '';  
    var i = j = 0;  
    var len = len2 = 0;  
    var strCheck = '0123456789';  
    var aux = aux2 = '';  
    var whichCode = (window.Event) ? e.which : e.keyCode;  
    if (whichCode == 13 || whichCode == 8) return true;  
    key = String.fromCharCode(whichCode); 
    if (strCheck.indexOf(key) == -1) return false; 
    len = objTextBox.value.length;  
    for(i = 0; i < len; i++)  
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;  
    aux = '';  
    for(; i < len; i++)  
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);  
    aux += key;  
    len = aux.length;  
    if (len == 0) objTextBox.value = '';  
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;  
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;  
    if (len > 2) {  
        aux2 = '';  
        for (j = 0, i = len - 3; i >= 0; i--) {  
            if (j == 3) {  
                aux2 += SeparadorMilesimo;  
                j = 0;  
            }  
            aux2 += aux.charAt(i);  
            j++;  
        }  
        objTextBox.value = '';  
        len2 = aux2.length;  
        for (i = len2 - 1; i >= 0; i--)  
        objTextBox.value += aux2.charAt(i);  
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);  
    }  
    return false;  
}
desenhaTabela()

