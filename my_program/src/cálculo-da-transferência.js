"use strict";
// id_transferencia|valor_transferencia|tipo_transferencia|nome_emissor|agencia_emissor|conta_emissor|cpf_emissor|nome_receptor|agencia_receptor|conta_receptor|cpf_receptor
// 1|500|PIX|Joao|001|1234|123.123.123-12|Maria|002|1335|112.113.114-15
var transferenciaTest = {
    transferencia: {
        id_transferencia: 1,
        valor_transferencia: 500,
        tipo_transferencia: "PIX",
    },
    emissor: {
        nome_emissor: "Joao",
        agencia_emissor: "001",
        conta_emissor: "1234",
        cpf_emissor: "123.123.123-12",
    },
    receptor: {
        nome_receptor: "Maria",
        agencia_receptor: "002",
        conta_receptor: "1335",
        cpf_receptor: "112.113.114-15",
    },
};
function CalculoDaTransferência(_a) {
    var _b = _a.transferencia, id_transferencia = _b.id_transferencia, valor_transferencia = _b.valor_transferencia, tipo_transferencia = _b.tipo_transferencia, _c = _a.emissor, nome_emissor = _c.nome_emissor, agencia_emissor = _c.agencia_emissor, conta_emissor = _c.conta_emissor, cpf_emissor = _c.cpf_emissor, _d = _a.receptor, nome_receptor = _d.nome_receptor, agencia_receptor = _d.agencia_receptor, conta_receptor = _d.conta_receptor, cpf_receptor = _d.cpf_receptor;
    if (!id_transferencia) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois n\u00E3o continha o n\u00FAmero identificador(id) da transfer\u00EAncia.");
    }
    if (!valor_transferencia) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois n\u00E3o foi expecificado um valor a ser transferido.");
    }
    if (!tipo_transferencia) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois n\u00E3o foi expecificado o tipo da transferido.");
    }
    if (!nome_emissor || !nome_receptor) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois o nome do " + (!nome_emissor ? "emissor" : "receptor") + " n\u00E3o foi preenchido.");
    }
    if (!agencia_emissor || !agencia_receptor) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois a agencia do " + (!agencia_emissor ? "emissor" : "receptor") + " n\u00E3o foi preenchida.");
    }
    if (!conta_emissor || !conta_receptor) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois a conta do " + (!conta_emissor ? "emissor" : "receptor") + " n\u00E3o foi preenchida.");
    }
    if (!cpf_emissor || !cpf_receptor) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois o CPF do " + (!cpf_emissor ? "emissor" : "receptor") + " n\u00E3o foi preenchido.");
    }
    if (agencia_emissor == agencia_receptor) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois n\u00E3o s\u00E3o permitidas transfer\u00EAncias para a mesma conta.");
    }
    if (tipo_transferencia == "PIX" && valor_transferencia > 5000) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois o valor excede o valor m\u00E1ximo de R$5.000,00 para transf\u00EAncias via PIX.");
    }
    if (tipo_transferencia == "TED" &&
        (valor_transferencia < 5000 || valor_transferencia > 10000)) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois o valor " + (valor_transferencia < 5000
            ? "\u00E9 menor que o valor m\u00EDnimo de R$5.000,00"
            : "excede o valor m\u00E1ximo de R$10.000,00") + " para transf\u00EAncias via TED.");
    }
    if (tipo_transferencia == "DOC" && valor_transferencia > 10000) {
        return console.error("Sua transfer\u00EAncia n\u00E3o foi completada pois o valor \u00E9 menor que o valor m\u00EDnimo de R$10.000,00 para transf\u00EAncias via DOC.");
    }
    var saldo_receptor = 0;
    var saldo_emissor = 0;
    saldo_emissor -= valor_transferencia;
    saldo_receptor += valor_transferencia;
    console.log("Sua transfer\u00EAncia foi realizada com sucesso!\n        Saldo emissor: R$" + saldo_emissor.toFixed(2).replace(".", ",") + "\n        Saldo receptor: R$" + saldo_receptor.toFixed(2).replace(".", ",") + "\n    ");
    return { saldo_emissor: saldo_emissor, saldo_receptor: saldo_receptor };
}
console.log(CalculoDaTransferência(transferenciaTest));
