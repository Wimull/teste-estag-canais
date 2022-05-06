// id_transferencia|valor_transferencia|tipo_transferencia|nome_emissor|agencia_emissor|conta_emissor|cpf_emissor|nome_receptor|agencia_receptor|conta_receptor|cpf_receptor

// 1|500|PIX|Joao|001|1234|123.123.123-12|Maria|002|1335|112.113.114-15

const transferenciaTest = {
	transferencia: {
		id_transferencia: 1,
		valor_transferencia: 500,
		tipo_transferencia: <const>"PIX",
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

interface CalculoDaTransferênciaTypes {
	transferencia: {
		id_transferencia?: number;
		valor_transferencia?: number;
		tipo_transferencia?: "PIX" | "TED" | "DOC";
	};
	emissor: {
		nome_emissor?: string;
		agencia_emissor?: string;
		conta_emissor?: string;
		cpf_emissor?: string;
	};
	receptor: {
		nome_receptor?: string;
		agencia_receptor?: string;
		conta_receptor?: string;
		cpf_receptor?: string;
	};
}

function CalculoDaTransferência({
	transferencia: { id_transferencia, valor_transferencia, tipo_transferencia },
	emissor: { nome_emissor, agencia_emissor, conta_emissor, cpf_emissor },
	receptor: { nome_receptor, agencia_receptor, conta_receptor, cpf_receptor },
}: CalculoDaTransferênciaTypes) {
	if (!id_transferencia) {
		return console.error(
			`Sua transferência não foi completada pois não continha o número identificador(id) da transferência.`
		);
	}

	if (!valor_transferencia) {
		return console.error(
			`Sua transferência não foi completada pois não foi expecificado um valor a ser transferido.`
		);
	}
	if (!tipo_transferencia) {
		return console.error(
			`Sua transferência não foi completada pois não foi expecificado o tipo da transferido.`
		);
	}

	if (!nome_emissor || !nome_receptor) {
		return console.error(
			`Sua transferência não foi completada pois o nome do ${
				!nome_emissor ? `emissor` : `receptor`
			} não foi preenchido.`
		);
	}
	if (!agencia_emissor || !agencia_receptor) {
		return console.error(
			`Sua transferência não foi completada pois a agencia do ${
				!agencia_emissor ? `emissor` : `receptor`
			} não foi preenchida.`
		);
	}
	if (!conta_emissor || !conta_receptor) {
		return console.error(
			`Sua transferência não foi completada pois a conta do ${
				!conta_emissor ? `emissor` : `receptor`
			} não foi preenchida.`
		);
	}
	if (!cpf_emissor || !cpf_receptor) {
		return console.error(
			`Sua transferência não foi completada pois o CPF do ${
				!cpf_emissor ? `emissor` : `receptor`
			} não foi preenchido.`
		);
	}
	if (agencia_emissor == agencia_receptor) {
		return console.error(
			`Sua transferência não foi completada pois não são permitidas transferências para a mesma conta.`
		);
	}
	if (tipo_transferencia == "PIX" && valor_transferencia > 5000) {
		return console.error(
			`Sua transferência não foi completada pois o valor excede o valor máximo de R$5.000,00 para transfências via PIX.`
		);
	}
	if (
		tipo_transferencia == "TED" &&
		(valor_transferencia < 5000 || valor_transferencia > 10000)
	) {
		return console.error(
			`Sua transferência não foi completada pois o valor ${
				valor_transferencia < 5000
					? `é menor que o valor mínimo de R$5.000,00`
					: `excede o valor máximo de R$10.000,00`
			} para transfências via TED.`
		);
	}
	if (tipo_transferencia == "DOC" && valor_transferencia > 10000) {
		return console.error(
			`Sua transferência não foi completada pois o valor é menor que o valor mínimo de R$10.000,00 para transfências via DOC.`
		);
	}

	let saldo_receptor: number = 0;
	let saldo_emissor: number = 0;

	saldo_emissor -= valor_transferencia;
	saldo_receptor += valor_transferencia;

	console.log(
		`Sua transferência foi realizada com sucesso!
        Saldo emissor: R$${saldo_emissor.toFixed(2).replace(".", ",")}
        Saldo receptor: R$${saldo_receptor.toFixed(2).replace(".", ",")}
    `
	);

	return { saldo_emissor, saldo_receptor };
}

console.log(CalculoDaTransferência(transferenciaTest));
