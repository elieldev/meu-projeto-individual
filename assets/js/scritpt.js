var extratoRaw = localStorage.getItem('extrato')
if (extratoRaw != null) {
    var extrato = JSON.parse(extratoRaw)
} else {
    var extrato = [];
}

const formatarMoedaTotal = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
});

desenhaTabela()

//Impede o usuário de colar algo no campo valor.
const inputValor = document.querySelector("#inpt-valor");
inputValor.addEventListener("paste", function(x){
    x.preventDefault()
});
 
function desenhaTabela() {

    let total = 0;
    
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
        
        let valor = parseFloat(extrato[dados].valor.replace(/[^0-9]/g, ""));
        
        if (extrato[dados].compraVenda) {
            total -= valor;
        } else {
            total += valor;
        }

        document.querySelector('table.tabela-extrato tbody').innerHTML += `
            <tr class="conteudo-dinamico">
                <td class="nome-mercadoria">${ (extrato[dados].compraVenda ? '-' : '+')} &nbsp; ${extrato[dados].nome}</td>
                <td class="preco-mercadoria">${extrato[dados].valor}</td>
            </tr>`
    };
    
    if (extrato.length > 0) {
      
        document.querySelector('table.tabela-extrato tbody').innerHTML += ` 
            <tr class="conteudo-dinamico"> 
                <td> </td> <td> </td>  
            </tr>
            <tr class="conteudo-dinamico">
                <td class="total-texto"><strong>Total</strong></td>
                <td class="total-valor">${formatarMoedaTotal.format(total.toString().replace(/([0-9]{2})$/g, ".$1"))}</td>
            </tr>`;

        if (total > 0) {
            document.querySelector('table.tabela-extrato tbody').innerHTML += `
                <tr class="conteudo-dinamico"> 
                    <td style="border:none;"> </td> 
                    <td  class="despesa-lucro">[Lucro]</td> 
                </tr>`
        } else if (total < 0) {
            document.querySelector('table.tabela-extrato tbody').innerHTML += `
                <tr class="conteudo-dinamico"> 
                    <td style="border:none;"> </td> 
                    <td  class="despesa-lucro">[Despesa]</td> 
                </tr>`
        }

    }
}

function limparDados() {
    
    if (extrato.length > 0 && window.confirm("Deseja remover todas as informações?")) {
        for (element of document.querySelectorAll(".conteudo-dinamico")) {
          element.remove();
          localStorage.clear();
          extrato = [];
          desenhaTabela();
        }
    } else if (extrato <= 0) {
        alert("Não foi possível limpar os dados pois não há transações no extrato..");
      }
} 

function testaForm(e) {
    e.preventDefault();
    
    extrato.push({
        compraVenda: (e.target.elements['compra-venda'].value == 'compra'),
        nome: e.target.elements['inpt-nome'].value,
        valor: e.target.elements['inpt-valor'].value
    }) 
    localStorage.setItem('extrato', JSON.stringify(extrato))
    desenhaTabela()
}

function cadastroTransacoes() {
    document.getElementById("compra-venda").focus();
} 

jQuery(function() {
        
    jQuery("#inpt-valor").maskMoney({
        prefix:'R$',
        thousands:'.', 
        decimal:','
    })
});