class BankView {
    constructor(data) {
        this.data = data;
        this.information = document.querySelector('.information');
        this.buttonWindowOpen = document.querySelector('.createButton');
        this.cardItem = document.querySelector('.cards__item');
        this.modal = document.querySelector('.modal');
        this.modalWindow = document.querySelector('.modal__window');
        this.modalValue = null;
        this.aboutBank();
        this.showClient();
    }

    aboutBank() {
        let totalBalance = bankOschad.countTotalBalanceBank();
        let creditMoney = bankOschad.countCreditMoney();
        let debtorsTotalDebts = bankOschad.countLoanDebtorsTotalDebt();

        const totalBankBalance = document.createElement('div');
        totalBankBalance.className = 'totalBankBalance';

        totalBalance.then(result => {
            totalBankBalance.innerHTML = `
            <p class="info"> Bank current balance : ${result} UAH</p>
            `;
        });

        const totalCreditMoney = document.createElement('div');
        totalCreditMoney.className = 'totalCreditMoney';

        creditMoney.then(result => {
            totalCreditMoney.innerHTML = `
            <p class="info"> Current credit money : ${result} UAH</p>
            `;
        });

        const debtorsDebt = document.createElement('div');
        debtorsDebt.className = 'debtorsDebt';

        debtorsTotalDebts.then(result => {
            debtorsDebt.innerHTML = `
            <p class="info"> Total debt : ${result} UAH</p>
            `;
        });

        this.information.append(totalBankBalance);
        this.information.append(debtorsDebt);
        this.information.append(totalCreditMoney);
    }

    showClient() {
        this.cardItem.innerHTML = ' ';
        const cards = this.data.map((data, index) => this.showClients(data, index));
        this.cardItem.append(...cards);
    }

    showClients(data, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3 class="client-fullname"> Fullname: <span class="fullname">${data.name} ${data.surname}</span></h3>
        <p class="client-info">Balance: ${data.credit.ownBalance.ownBalance} ${data.credit.ownBalance.currency}</p>
        <p class="client-info">Credit Balance: ${data.credit.creditBalance.creditBalance} ${data.credit.creditBalance.currency}</p>
        <p class="client-info">Credit Limit: ${data.credit.creditBalance.creditLimit} ${data.credit.creditBalance.currency}</p>
        <p class="client-info">Debit Balance: ${data.debit.curentBalance} ${data.debit.currency}</p>
        <p class="client-info">Activeted date: ${data.credit.ownBalance.activetedDate}</p>
        <p class="client-info">Expired date: ${data.credit.ownBalance.expiredDate}</p>
        <p class="client-info">Client status: ${data.isActive ? 'active' : 'inactive'}</p>
        `;

        const cardButtonContainer = document.createElement('div');
        cardButtonContainer.className = 'cardButtonContainer';
        card.append(cardButtonContainer);

        const modifyButton = document.createElement('button');
        modifyButton.className = 'button';
        modifyButton.innerHTML = 'Modify';
        cardButtonContainer.appendChild(modifyButton);
        modifyButton.addEventListener('click', this.modifyWindow.bind(this, data, index));

        this.buttonWindowOpen.addEventListener('click', this.createWindow.bind(this, data));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'button';
        deleteButton.innerHTML = 'Delete';
        cardButtonContainer.appendChild(deleteButton);
        deleteButton.addEventListener('click', this.deleteClient.bind(this, index));

        return card;
    }

    modalDisplay(data, index) {
        this.modal.classList.add('active');
        this.modalWindow.innerHTML = `
        <h2>Operate window</h2>
        <div class="modal-item">
            <p> Name </p>
            <input class="input" type="text" placeholder="Type client name" name="name"> 
        </div>
        <div class="modal-item">
            <p> Surname </p>
            <input class="input" type="text" placeholder="Type client surname " name="surname"> 
        </div>
        <div class="modal-item">
            <p> Debit Balance </p>
            <input class="input" type="text" placeholder="Type client Debit Balance" name="curentBalance"> 
        </div>
        <div class="modal-item">
            <p> Activeted Date </p>
            <input class="input" type="text" placeholder="Type client balance Activeted Date " name="activetedDate"> 
        </div>
        <div class="modal-item">
            <p> Expired Date </p>
            <input class="input" type="text" placeholder="Type client balance Expired Date " name="expiredDate"> 
        </div>
        <div class="modal-item">
            <p> Own Balance </p>
            <input class="input" type="text" placeholder="Type client Balance " name="ownBalance"> 
        </div>
        <div class="modal-item">
            <p> Сredit Balance </p>
            <input class="input" type="text" placeholder="Type client Сredit Balance " name="creditBalance"> 
        </div>
        <div class="modal-item">
            <p> Сredit Limit </p>
            <input class="input" type="text" placeholder="Type client Сredit Limit " name="creditLimit"> 
        </div>
        <div class="modal-item">
            <p> Currency </p>
            <input class="input" type="text" placeholder="Type client Currency " name="currency"> 
        </div>
        <div class="modal-check">
            <p> Status (active) </p>
            <input class="check" type="checkbox" name="isActive"> 
        </div>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';
        this.modalWindow.append(buttonContainer);

        const confirmButton = document.createElement('div');
        confirmButton.className = 'confirmButton';
        buttonContainer.appendChild(confirmButton);

        const button = document.createElement('button');
        button.className = 'createNewClient';
        button.innerText = 'Confirm';
        confirmButton.appendChild(button);

        confirmButton.addEventListener('click', this.createNewClient.bind(this, index));

        const closeDiv = document.createElement('div');
        closeDiv.className = 'closeDiv';
        buttonContainer.appendChild(closeDiv);

        const buttonClose = document.createElement('button');
        buttonClose.className = 'closeButton';
        buttonClose.innerText = 'Close';
        closeDiv.appendChild(buttonClose);

        closeDiv.addEventListener('click', this.closeWindow.bind(this));
    }

    createWindow(data) {
        this.modalValue = false;
        this.modalDisplay(data);
    }

    modifyWindow(data, index) {
        this.modalValue = true;
        this.modalDisplay(data, index);
    }

    closeWindow() {
        this.modal.classList.remove('active');
    }

    createClient(event) {
        event.preventDefault();

        let newClient = new FormData(event.target.closest('form'));

        this.data.unshift({
            name: newClient.get('name') || 'Name',
            surname: newClient.get('surname') || 'Surname',
            isActive: newClient.get('isActive') || false,
            debit: {
                curentBalance: Number(newClient.get('debitBalance')) || 0,
                activetedDate: newClient.get('activetedDate') || 'Activeted Date',
                expiredDate: newClient.get('expiredDate') || 'Expired Date',
                currency: newClient.get('currency') || 'UAH',
            },
            credit: {
                ownBalance: {
                    ownBalance: Number(newClient.get('ownBalance')) || 0,
                    currency: newClient.get('currency') || 'UAH',
                },
                creditBalance: {
                    creditBalance: Number(newClient.get('creditBalance')) || 0,
                    creditLimit: Number(newClient.get('creditLimit')) || 0,
                    currency: newClient.get('currency') || 'UAH',
                },
            },
        });
        this.showClient();
    }

    createNewClient(index, event) {
        this.information.innerHTML = ' ';
        if (this.modalValue === true) {
            this.modifyClient(event, index);
        } else if (this.modalValue === false) {
            this.createClient(event);
        }
        this.closeWindow();
        this.aboutBank();
    }

    deleteClient(index) {
        this.information.innerHTML = ' ';
        this.data.splice(index, 1);
        this.showClient();
        this.aboutBank();
    }

    modifyClient(event, i) {
        event.preventDefault();

        let workerModify = new FormData(event.target.closest('form'));

        this.data[i].name = workerModify.get('name') || this.data[i].name;
        this.data[i].surname = workerModify.get('surname') || this.data[i].surname;
        this.data[i].credit.ownBalance.ownBalance = workerModify.get('balance') || this.data[i].credit.ownBalance.ownBalance;
        this.data[i].credit.ownBalance.activetedDate = workerModify.get('activetedDate') || this.data[i].credit.ownBalance.activetedDate;
        this.data[i].credit.ownBalance.expiredDate = workerModify.get('expiredDate') || this.data[i].credit.ownBalance.expiredDate;
        this.data[i].credit.creditBalance.creditBalance = workerModify.get('creditBalance') || this.data[i].credit.creditBalance.creditBalance;
        this.data[i].credit.creditBalance.creditLimit = workerModify.get('creditLimit') || this.data[i].credit.creditBalance.creditLimit;
        this.data[i].isActive = workerModify.get('isActive') || this.data[i].isActive;

        this.showClient();
    }
}
const theBankView = new BankView(bankClients);