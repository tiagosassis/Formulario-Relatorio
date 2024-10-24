// formDataHandler.js
// Funções para manipular e atualizar dados do formulário em tempo real.

import { toggleClassHidden } from "./utils.js"

export function updateReportExtraEmployee(event) {
    /**
     * Atualiza os campos de exibição no relatório em tempo real com os dados inseridos nos inputs de nome, pagamento e chave Pix dos funcionários extras.
     * Caso haja um nome inserido, torna a seção correspondente visível no relatório.
     * 
     * @param {Event} event - O evento 'input' que dispara a atualização.
     */
    const extraEmployeeId = event.target.id.match(/\d+/g) // pega o ID de qual input recebeu alguma informação
    const inputName = document.getElementById(`extra-employee-name-${extraEmployeeId}`)
    const inputPayment = document.getElementById(`extra-employee-daily-payment-${extraEmployeeId}`)
    const inputPixKey = document.getElementById(`extra-employee-pix-key-${extraEmployeeId}`)

    const name = document.getElementById(`textField-employee-name-${extraEmployeeId}`)
    const payment = document.getElementById(`textField-employee-daily-payment-${extraEmployeeId}`)
    const pixKey = document.getElementById(`textField-employee-pix-key-${extraEmployeeId}`)

    inputName.value ? name.textContent = `- ${inputName.value}` : name.textContent = ''
    inputPayment.value ? payment.textContent = `: R$ ${parseFloat(inputPayment.value).toFixed(2).replace('.', ',')}` : payment.textContent = ''
    inputPixKey.value ? pixKey.textContent = ` (Pix: ${inputPixKey.value})` : pixKey.textContent = ''

    
    name.textContent.length >= 1
        ? toggleClassHidden(document.getElementById('report-freelancer'), true)
        : toggleClassHidden(document.getElementById('report-freelancer'), false)

}

export function removeExtraEmployee() {
    /**
     * Remove o último funcionário extra da seção e do relatório.
     */
    const extraEmployee = document.querySelectorAll('#section-extra-employee > div')

    if (extraEmployee.length === 0) {
        console.warn('Não há funcionários extras para remover.')
        return
    }

    const extraEmployeeId = extraEmployee[extraEmployee.length - 1].firstChild.firstChild.id.match(/\d+/g)
    
    // remove a div onde os dados são expostos
    document.getElementById(`report-freelancer-${extraEmployeeId}`).remove()

    // remove a div onde os dados são inseridos
    extraEmployee[extraEmployee.length - 1].remove()
}