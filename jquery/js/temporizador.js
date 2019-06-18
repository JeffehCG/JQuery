//Plugin Temporizador , contador regressivo, de uma data colocada 

(function($){ //Função auto invocada para proteger $
    $.fn.temporizador = function(opcoes){ //opcoes - conjunto de parametros
        const opcoesFinais = $.extend({ // Parametros padrões, caso não seja passados pelo usuario
            mensagem: 'Em breve!',
            horario: '23:59:59'
        },opcoes) //mesclando os parametros padrões com os que foram passados na chamada (Os que foram chamados sobrescreveram os padrões)
        
        //Campos dos valores da hora decrescente
        const horaDezena = $('<span class = "digito">').html('0')
        const horaUnidade = $('<span class = "digito">').html('0')
        const minutoDezena = $('<span class = "digito">').html('0')
        const minutoUnidade = $('<span class = "digito">').html('0')
        const segundoDezena = $('<span class = "digito">').html('0')
        const segundoUnidade = $('<span class = "digito">').html('0')

        //Separadores com :
        const separadorHora = $('<span class = "separador">').html(':')
        const separadorMinuto = $('<span class = "separador">').html(':')

        //Mensagem recebida como parametro
        const mensagem = $('<div class = "mensagem">').html(opcoesFinais.mensagem)

        $(this).addClass('temporizador') //Adicionando a classe temporizador no elemento selecionado
        $(this).append(horaDezena,horaUnidade,separadorHora,
            minutoDezena,minutoUnidade,separadorMinuto,
            segundoDezena,segundoUnidade,mensagem) //adicionando elementos

        const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/) //capturar horas nesse formato
        const horarioAlvo = regex.exec(opcoesFinais.horario) //Convertendo horario no formato acima (Para conseguir pegar separadamente hora, minuto e segundo)
        // console.log(horarioAlvo)

        let temporizador = setInterval(() => {
            const agora = new Date() //Hora e data atual
            const alvo = new Date() //hora alvo
            alvo.setHours(horarioAlvo[1]) //Colocando a hora
            alvo.setMinutes(horarioAlvo[2]) //Colocando os minutos
            alvo.setSeconds(horarioAlvo[3]) //Colocando os segundos

            const diferencaEmMili = alvo.getTime() - agora.getTime() //Desconbrindo a diferença entre o horario de agora e o alvo .getTime() - pega o horario em milisegundos
            if(diferencaEmMili >= 0) { //Verificando se a diferença é positiva, pois se o horario ja passou não faz sentido calcular
                const diferenca = regex.exec(new Date(diferencaEmMili).toISOString()) //Convertendo a diferençaEmMili em horas (Utilizando o regex criado para poder pegar os valores hora, minuto e segundo separados)
                // console.log(diferenca)

            horaDezena.html(diferenca[1][0]) //Pegando o primeiro caracter do indice 1 e colocando no elemento
            horaUnidade.html(diferenca[1][1]) //Pegando o segundo caracter do incice 1 e colocando no elemento
            minutoDezena.html(diferenca[2][0])
            minutoUnidade.html(diferenca[2][1])
            segundoDezena.html(diferenca[3][0])
            segundoUnidade.html(diferenca[3][1])

            }else{//Se a diferença for negativa(ou seja, a hora ja passou) parar de monitorar a hora
                clearInterval(temporizador)
            }

        }, 1000) //Intervalo de atualização

        return this
    }
})(jQuery)