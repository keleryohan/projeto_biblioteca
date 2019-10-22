var listaJogos = []; //lista dos jogos já criados (e não deletados)
var contador_id = 0; //contador usado para IDs dos jogos

//função chamada ao clicar no botão de add jogo   
$(document).ready(function(){
    $("button#botao_addjogo").on("click",function(){
    //criando as partes do objeto jogo
        let aux_nome = $("input#input_nome").val();
        let aux_genero = $("input#input_genero").val();
        let aux_plataforma = $("select#input_plataforma").val();
        let aux_jogado = !!+($('input[name=radio_jajogou]:checked', '#formulario').val()); //+ converte para inteiro e o !! para boolean
        let data = new Date();
        let aux_datacompra  = String(data.getDate()) + "/"+  String((data.getMonth()+1)) + "/" + String(data.getFullYear());
    //criando o objeto jogo
        let aux_jogo = {
            nome : aux_nome,
            genero : aux_genero,
            plataforma : aux_plataforma,
            jogado : aux_jogado,
            dataCompra : aux_datacompra,
            id: contador_id
        };
        contador_id++;
    //colocando o objeto jogo na lista de jogos
        listaJogos.push(aux_jogo);    
    });

    $("button#botao_gerartabela").on("click",function(){
        //resetando a tabela
        $("table#tabela").empty();

        //recriando a thead (pq ela some no .empty())
        let aux_tr_head = $("<tr>");
        let aux_th_nome = $("<th>").text("Nome");
        let aux_th_plataforma = $("<th>").text("Plataforma");
        let aux_th_genero = $("<th>").text("Gênero");
        let aux_th_data = $("<th>").text("Data de compra");
        let aux_th_jogado = $("<th>").text("Já jogado");
        let aux_th_deletar = $("<th>").text("Deletar");
        $(aux_tr_head).append(aux_th_nome,aux_th_plataforma,aux_th_genero,aux_th_data,aux_th_jogado,aux_th_deletar);
        $("table#tabela").append(aux_tr_head);

        //variável com o valor de plataforma. para a busca/seleção dos jogos
        let plataforma_escolhida = $("select#selecao_plataforma").val();

        //gerando a tabela 
        listaJogos.forEach(function(jogo){
            //selecionando de acordo com a plataforma selecionada pelo usuário
            if((jogo.plataforma == plataforma_escolhida) || (plataforma_escolhida=="Todas")){
                //criando as partes da tabela (tr e tds)
                let aux_tr = $("<tr>");
                let aux_td_nome = $("<td>").text(jogo.nome);
                let aux_td_plataforma = $("<td>").text(jogo.plataforma);
                let aux_td_genero = $("<td>").text(jogo.genero);
                let aux_td_data = $("<td>").text(jogo.dataCompra);
            
                //criando o botão de 'jogar' e colocando o id dele como o contador de jogos * -1(para associar o botão com o objeto na lista, e o *-1 para mante-lo unico)
                let aux_botao_jogar = $("<button>").addClass("botao_jogar btn-info"); //classe do botão de jogar <<<<
                $(aux_botao_jogar).attr("id",-jogo.id);
                if(jogo.jogado == true){
                    aux_botao_jogar.text("Jogado");
                }
                else if(jogo.jogado == false){
                    aux_botao_jogar.text("Jogar");
                }
                let aux_td_jogado = $("<td>").append(aux_botao_jogar);
                
                
                //criando o botão de deletar e colocando o id dele como o contador de jogos(para associar o botão com o objeto na lista)
                let aux_botao_deletar = $("<button>").addClass("botao_deletar btn-danger"); //classe do botão de deletar <<<<<
                $(aux_botao_deletar).attr('id',jogo.id);
                let aux_td_delete = $("<td>").append(aux_botao_deletar);
                aux_botao_deletar.text("Deletar");

                //juntando os tds ao tr, e o tr a tabela
                $(aux_tr).append(aux_td_nome,aux_td_plataforma,aux_td_genero,aux_td_data,aux_td_jogado,aux_td_delete);
                $("table#tabela").append(aux_tr);
            }
        });
    });
    
    

   //ao clicar no botão de deletar a row
   /*
   para se selecionar elementos gerados, usa-se um ancestral
   no $("") e o identificador do elemento em si após o "click"
   */
    //deleta o jogo na lista
    $("#tabela").on("click","button.botao_deletar",function(){
        let aux_id = this.id; //auxiliar que pega o ID do botão
        //agora eu encontro o jogo com mesmo atributo 'id' do ID do botão e o deleto da lista
        //retorna a lista sem o elemento v
        listaJogos = jQuery.grep(listaJogos, function(jogo) {
            if(jogo.id != aux_id){
                return (jogo);
            }
          });
    });


    //deleta o elemento na tabela
    $("#tabela").on("click", "button.botao_deletar", function() {
        $(this).closest('tr').remove();
    });


    //ao clicar no botão de 'jogar'
    $("#tabela").on("click","button.botao_jogar",function(){
        //console.log($(this).text());
        //mudando o texto na tabela
        if($(this).text() == "Jogado"){
            $(this).text("Jogar");
        }
        else if($(this).text() == "Jogar"){
            $(this).text("Jogado");
        }

        //mudando o valor do objeto jogo
        let aux_id = -this.id; //auxiliar que armazena o id do botão *-1
        listaJogos.forEach(function(jogo){
            if(aux_id == jogo.id){
                jogo.jogado = !jogo.jogado;
            }
        });
    });

});
    
    
