let valorNomeForm = document.querySelector ('#formulario__nome')
let valorDataForm = document.querySelector ('#formulario__data')
const botaoSalvar = document.querySelector ('.formulario__btn__salvar')
const tabela = document.querySelector ('.dados__tabela')

let dadosSalvos = JSON.parse(localStorage.getItem('dadosSalvos')) || [];
let itemExistente = ""



function atualizarDados() {
    localStorage.setItem('dadosSalvos', JSON.stringify(dadosSalvos));

}


function createLi(nome, data, index) {
 // Se um dos campos estiver vazio, não faça nada
    if (nome.trim() === '' || data.trim() === '') {
       
        return;
      }

// se houver conteudo construa o elemento linha

    const trLinhaTabela = document.createElement('tr')
    trLinhaTabela.classList.add('dados__tabela__linha')
    

    const tdLinhaNome = document.createElement('td')
    tdLinhaNome.classList.add('dados__tabela__nome')
    tdLinhaNome.textContent = nome
    trLinhaTabela.appendChild(tdLinhaNome)

    const tdLinhaData = document.createElement('td')
    tdLinhaData.classList.add('dados__tabela__data')
    tdLinhaData.textContent = data
    trLinhaTabela.appendChild(tdLinhaData)

    const tdLinhaAcao = document.createElement('td')
    tdLinhaAcao.classList.add('dados__tabela__acao')

    const aEdit = document.createElement('a');
    aEdit.classList.add('edit');
    aEdit.href = '#';
    aEdit.textContent = 'Editar';

    aEdit.onclick = () => {
        
        dadosSalvos
        const novoNome = prompt ('Digite o novo nome')
        const novaData = prompt('Digite a nova data')
        tdLinhaNome.textContent = novoNome
        tdLinhaData.textContent = novaData

        dadosSalvos[index].nome = novoNome
        dadosSalvos[index].data = novaData

        atualizarDados()

        console.log(dadosSalvos)

        
    }    

    const aRemove = document.createElement('a');
    aRemove.classList.add('remove');
    aRemove.href = '#';
    aRemove.textContent = 'Remover';

    aRemove.onclick = () => {

        trLinhaTabela.remove()
        dadosSalvos.splice(index, 1);
        atualizarDados()
    }    
    


    tdLinhaAcao.appendChild(aEdit);
    tdLinhaAcao.appendChild(aRemove);
    trLinhaTabela.appendChild(tdLinhaAcao);

    tabela.appendChild(trLinhaTabela);

}


function exibirDadosSalvos() {

    dadosSalvos 
  
    dadosSalvos.forEach((item, index) => {
      createLi(item.nome, item.data, index);
    });

    
  }

  exibirDadosSalvos()

let botaoEdit = document.querySelectorAll('.edit')
let botaoRemover = document.querySelectorAll('.remove')
let trLinhaTabelaRemover = document.querySelectorAll('.dados__tabela__linha')


botaoSalvar.addEventListener('click' , function (event) {
    event.preventDefault()
    
    // Verifica se já existe um item com o mesmo nome e data
    if (valorNomeForm.value.trim() === '' || valorDataForm.value.trim() === '') {
        alert('Por favor, preencha ambos os campos antes de salvar.');
        return;
    }

    itemExistente = dadosSalvos.find(item =>
        item.nome === valorNomeForm.value && item.data === valorDataForm.value
    );

    if (itemExistente) {
        alert('Essa pessoa já existe');
    } else {
        // Se não existir, adiciona o novo item
        createLi(valorNomeForm.value, valorDataForm.value);

        // Atualiza os dados salvos no localStorage
        dadosSalvos.push({
            nome: valorNomeForm.value,
            data: valorDataForm.value,
        });

        valorNomeForm.value = '';
        valorDataForm.value = '';

        atualizarDados()
    }
});













