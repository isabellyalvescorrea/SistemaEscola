let prompt = require('prompt-sync')();
let alunos = []; // Lista de alunos (cada um será um objeto com nome e curso)
let cursos = []; // Lista de cursos disponíveis

let opcao; // Variável para armazenar a opção do menu

let senhaCorreta = 'senai123';
let tentativasenha = 0;
let acessoConcedido = false;

while (tentativasenha < 3) {
    let senhadigitada = prompt('digite a senha para acessar o sistema: ');
    if (senhadigitada === senhaCorreta) {
        console.log('senha correta! acesso concedido.');
        acessoConcedido = true;
        break;
    } else {
        tentativasenha++;
        console.log('senha incorreta. tentativas restantes: ' + (3 - tentativasenha));
    }
}

if (tentativasenha === 3) {
    console.log('acesso não autorizado. você excedeu o numero de tentativas');
    process.exit();
}




function cadastraraluno() {
    let nomeAluno = prompt('Digite o nome do aluno: ');
            if (nomeAluno && nomeAluno.trim() !== '') {
                alunos.push({ nome: nomeAluno.trim(), curso: null });
                console.log("Aluno cadastrado com sucesso!");
            } else {
                console.log("Nome inválido."); }
}

function excluiraluno() {
     let nomeExcluir = prompt('Digite o nome do aluno a excluir: ');
            let index = alunos.findIndex(aluno => aluno.nome === nomeExcluir);
            if (index !== -1) {
                alunos.splice(index, 1);
                console.log("Aluno excluído com sucesso!");
            } else {
                console.log("Aluno não encontrado.");
            }
}

function cadastrarcurso() {
    let nomeCurso = prompt('Digite o nome do curso: ');
            if (nomeCurso && nomeCurso.trim() !== '') {
                cursos.push(nomeCurso.trim());
                console.log("Curso cadastrado com sucesso!");
            } else {
                console.log("Nome inválido.");
            }
}

 function excluircurso() {
     let nomeExcluir = prompt('Digite o nome do curso a excluir: ');
            let index = cursos.indexOf(nomeExcluir);
            if (index !== -1) {
                cursos.splice(index, 1);
                // Remove o curso dos alunos matriculados nesse curso
                for (let i = 0; i < alunos.length; i++) {
                    if (alunos[i].curso === nomeExcluir) {
                        alunos[i].curso = null;
                    }
                }
                console.log("Curso excluído com sucesso!");
            } else {
                console.log("Curso não encontrado.");
            }
 }

function visualizarinformacoes() {
     let info = '\nAlunos Cadastrados:\n';
            if (alunos.length > 0) {
                for (let i = 0; i < alunos.length; i++) {
                    let aluno = alunos[i];
                    let cursoInfo = aluno.curso ? aluno.curso : 'Sem curso';
                    info += ` ${aluno.nome} (${cursoInfo})\n`;
                }
            } else {
                info += 'Nenhum aluno cadastrado.\n';
            }

            info += '\nCursos Cadastrados:\n';
            if (cursos.length > 0) {
                for (let i = 0; i < cursos.length; i++) {
                    info += `- ${cursos[i]}\n`;
                }
            } else {
                info += 'Nenhum curso cadastrado.\n';
            }

            console.log(info);
}
 
function cadastraralunoemcurso() {
 let nomeAluno = prompt('Digite o nome do aluno: ');
            let aluno = alunos.find(a => a.nome === nomeAluno);

            if (!aluno) {
                console.log("Aluno não encontrado.");
                
            }

            else if (cursos.length === 0) {
                console.log("Nenhum curso disponível.");
                
            }

            console.log("\nCursos disponíveis:");
            for (let i = 0; i < cursos.length; i++) {
                console.log(`${i + 1} - ${cursos[i]}`);
            }

            let numCurso = parseInt(prompt('Digite o número do curso desejado: '));

            if (numCurso >= 1 && numCurso <= cursos.length) {
                aluno.curso = cursos[numCurso - 1];
                console.log("Aluno matriculado com sucesso!");
            } else {
                console.log("Número do curso inválido.");
            }
}

function sairdosistema() {
      console.log("Saindo do sistema...");
            
}

do {
    // Exibe o menu de opções
    opcao = prompt(
        'Sistema Escolar\n\n' +
        '1 - Cadastrar aluno\n' +
        '2 - Excluir aluno\n' +
        '3 - Cadastrar curso\n' +
        '4 - Excluir curso\n' +
        '5 - Visualizar Informações\n' +
        '6 - Matricular Aluno em Curso\n' +
        '7 - Sair\n\n' +
        'Escolha uma opção:\n'
    );
    
switch (opcao) {
        case '1':
            cadastraraluno();
            break;
        case '2':
            excluiraluno();
            break;
        case '3':
            cadastrarcurso();
            break;
        case '4':
            excluircurso();
            break;
        case '5':
            visualizarinformacoes();
            break;
        case '6':
            cadastraralunoemcurso();
            break;
        case '7':
            sairdosistema();
            break;
        default:
            console.log("Opção inválida.");
    }

        
} while (opcao !== '7');

