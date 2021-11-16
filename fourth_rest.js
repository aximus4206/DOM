
class RestView {
    constructor(data) {
        this.data = data;
        this.information = document.querySelector('.information');
        this.information.leftCol = document.querySelector('.left-col');
        this.information.rightCol = document.querySelector('.right-col');
        this.cardItem = document.querySelector('.cards__item');
        this.buttonWindowOpen = document.querySelector('.createButton');
        this.modal = document.querySelector('.modal');
        this.modalWindow = document.querySelector('.modal__window');
        this.modalValue = null;
        this.aboutRestoraunt();
        this.showWorker();
    }

    aboutRestoraunt() {
        let departmentsSalary = rest.countWholeSalaryDepartment(false);
        let middleDepartmentsSalary = rest.middleDepartmentSalary(false);
        let minDepartmentsSalary = rest.minDepartmentSalary(false);
        let maxDepartmentsSalary = rest.maxDepartmentSalary(false);
        let minPositionsSalary = rest.minPositionSalary(false);
        let maxPositionsSalary = rest.maxPositionSalary(false);
        let withoutDeputy = rest.showDepartmentWithoutPosition('deputyhead');
        let areDismissed = rest.dismissedWorkers(true);

        const departmentsSalaryInfo = document.createElement('div');
        departmentsSalaryInfo.className = 'departmentsSalary';

        const departmentSalaryHeader = document.createElement('h3');
        departmentSalaryHeader.innerHTML = '<h3>Total salary of department:</h3>';

        const middleDepartmentsSalaryInfo = document.createElement('div');
        middleDepartmentsSalaryInfo.className = 'departmentsMiddleSalary';

        const middleDepartmentsSalaryHeader = document.createElement('h3');
        middleDepartmentsSalaryHeader.innerHTML = '<h3>Middle salary of department:</h3>';

        const minDepartmentsSalaryInfo = document.createElement('div');
        minDepartmentsSalaryInfo.className = 'departmentsMinSalary';

        const minDepartmentsSalaryHeader = document.createElement('h3');
        minDepartmentsSalaryHeader.innerHTML = '<h3>Smallest salary of department:</h3>';

        const maxDepartmentsSalaryInfo = document.createElement('div');
        maxDepartmentsSalaryInfo.className = 'departmentsMaxSalary';

        const maxDepartmentsSalaryHeader = document.createElement('h3');
        maxDepartmentsSalaryHeader.innerHTML = '<h3>Highest salary of department:</h3>';

        const minPositionsSalaryInfo = document.createElement('div');
        minPositionsSalaryInfo.className = 'positionsMinSalary';

        const minPositionsSalaryHeader = document.createElement('h3');
        minPositionsSalaryHeader.innerHTML = '<h3>Smallest salary of each position:</h3>';

        const maxPositionsSalaryInfo = document.createElement('div');
        maxPositionsSalaryInfo.className = 'positionsMaxSalary';

        const maxPositionsSalaryHeader = document.createElement('h3');
        maxPositionsSalaryHeader.innerHTML = '<h3>Highest salary of each position:</h3>';

        const departmentsWithoutDeputyInfo = document.createElement('div');
        departmentsWithoutDeputyInfo.className = 'departmentWithoutDeputy';

        const departmentsWithoutDeputyHeader = document.createElement('h3');
        departmentsWithoutDeputyHeader.innerHTML = '<h3>Department without deputy:</h3>';

        const dismissedAmountInfo = document.createElement('div');
        dismissedAmountInfo.className = 'dismissedAmount';

        const dismissedAmountHeader = document.createElement('h3');
        dismissedAmountHeader.innerHTML = '<h3>Dismissed in department:</h3>';

        for (let value in departmentsSalary) {
            let result = value;
            departmentsSalaryInfo.innerHTML += `<p class="info"> ${++result} department: ${departmentsSalary[value]} $</p>`;
        }

        for (let value in middleDepartmentsSalary) {
            let result = value;
            middleDepartmentsSalaryInfo.innerHTML += `<p class="info"> ${++result} department: ${middleDepartmentsSalary[value]} $</p>`;
        }

        for (let value in minDepartmentsSalary) {
            minDepartmentsSalaryInfo.innerHTML += `<p class="info"> ${value}: ${minDepartmentsSalary[value]} $</p>`;
        }

        for (let value in maxDepartmentsSalary) {
            maxDepartmentsSalaryInfo.innerHTML += `<p class="info"> ${value}: ${maxDepartmentsSalary[value]} $</p>`;
        }

        for (let value in minPositionsSalary) {
            minPositionsSalaryInfo.innerHTML += `<p class="info"> ${value}: ${minPositionsSalary[value]} $</p>`;
        }

        for (let value in maxPositionsSalary) {
            maxPositionsSalaryInfo.innerHTML += `<p class="info"> ${value}: ${maxPositionsSalary[value]} $</p>`;
        }

        for (let value in withoutDeputy) {
            departmentsWithoutDeputyInfo.innerHTML += `<p class="info"> ${withoutDeputy[value]} </p>`;
        }

        for (let value in areDismissed) {
            let result = value;
            dismissedAmountInfo.innerHTML += `<p class="info"> ${++result} department: ${areDismissed[value]} worker(s)</p>`;
        }

        this.information.leftCol.append(departmentSalaryHeader);
        this.information.leftCol.append(departmentsSalaryInfo);
        this.information.leftCol.append(middleDepartmentsSalaryHeader);
        this.information.leftCol.append(middleDepartmentsSalaryInfo);
        this.information.leftCol.append(minDepartmentsSalaryHeader);
        this.information.leftCol.append(minDepartmentsSalaryInfo);
        this.information.leftCol.append(maxDepartmentsSalaryHeader);
        this.information.leftCol.append(maxDepartmentsSalaryInfo);
        this.information.rightCol.append(minPositionsSalaryHeader);
        this.information.rightCol.append(minPositionsSalaryInfo);
        this.information.rightCol.append(maxPositionsSalaryHeader);
        this.information.rightCol.append(maxPositionsSalaryInfo);
        this.information.rightCol.append(departmentsWithoutDeputyHeader);
        this.information.rightCol.append(departmentsWithoutDeputyInfo);
        this.information.rightCol.append(dismissedAmountHeader);
        this.information.rightCol.append(dismissedAmountInfo);
    }

    showWorker() {
        this.cardItem.innerHTML = ' ';
        const cards = this.data.map((data, index) => this.showWorkers(data, index));
        this.cardItem.append(...cards);
    }

    showWorkers(data, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3 class="fullname">fullname: <span class="fullname-user">${data.name} ${data.surname}</span></h3>
        <div class="card-container">
        <p class="personal-info">department: ${data.department}</p>
        <p class="personal-info">position: ${data.position}</p>
        </div>
        <div class="card-container">
        <p class="personal-info">salary: ${data.salary}$</p>
        <p class="personal-info">dismissed: ${data.dismissed ? 'dismissed' : 'active'}</p>
        </div>
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
        deleteButton.addEventListener('click', this.deleteWorker.bind(this, index));

        return card;
    }

    modalDisplay(data, index) {
        this.modal.classList.add('active');
        this.modalWindow.innerHTML = `
        <h2>Operate window</h2>
        <div class="modal-item">
            <p> Name </p>
            <input class="modal-name field" type="text" placeholder="Type worker name" name="name"> 
        </div>
        <div class="modal-item">
            <p> Surname </p>
            <input class="modal-surname field" type="text" placeholder="Type worker surname" name="surname"> 
        </div>
        <div class="modal-item">
            <p> Department </p>
            <input class="modal-dep field" type="text" placeholder="Type worker department" name="department"> 
        </div>
        <div class="modal-item">
            <p> Position </p>
            <input class="modal-pos field" type="text" placeholder="Type worker position" name="position"> 
        </div>
        <div class="modal-item">
            <p> Salary </p>
            <input class="modal-salary field" type="text" placeholder="Type worker salary" name="salary"> 
        </div>
        <div class="modal-check">
            <p> Dismissed </p>
            <input class="choose" type="checkbox" placeholder="Choose dismissed or active" name="dismissed"> 
        </div>
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';
        this.modalWindow.append(buttonContainer);

        const confirmButton = document.createElement('div');
        confirmButton.className = 'confirmButton';
        buttonContainer.appendChild(confirmButton);

        const button = document.createElement('button');
        button.className = 'createNewWorker';
        button.innerText = 'Confirm';
        confirmButton.appendChild(button);



        const closeDiv = document.createElement('div');
        closeDiv.className = 'closeDiv';
        buttonContainer.appendChild(closeDiv);

        const buttonClose = document.createElement('button');
        buttonClose.className = 'closeButton';
        buttonClose.innerText = 'Close';
        closeDiv.appendChild(buttonClose);

        closeDiv.addEventListener('click', this.closeWindow.bind(this));






        confirmButton.addEventListener('click', this.createNewWorker.bind(this, index));



    }


    createWindow(data) {
        this.modalValue = false;
        this.modalDisplay(data);
    }

    closeWindow() {
        this.modal.classList.remove('active');
    }

    modifyWindow(data, index) {
        this.modalValue = true;
        this.modalDisplay(data, index);
    }

    createWorker(event) {
        event.preventDefault();

        let newWorker = new FormData(event.target.closest('form'));
        let regularExpName = /^[a-zA-Z]{4,18}$/;
        let regularExpDep = /^[\d]{1}$/;
        let regularExpSal = /^[\d]{1,9}$/;

        this.data.unshift({
            name: newWorker.get('name') || 'Name',
            surname: newWorker.get('surname') || 'Surname',
            department: Number(newWorker.get('department')) || 'Department',
            position: newWorker.get('position') || 'Position',
            salary: Number(newWorker.get('salary')) || 'Salary',
            dismissed: newWorker.get('dismissed') || false,
        });
        if (this.data[0].name.match(regularExpName) && this.data[0].name !== 0) {
            if (this.data[0].surname.match(regularExpName) && this.data[0].surname !== 0) {
                if (regularExpDep.test(this.data[0].department) && this.data[0].department !== 0) {
                    if (this.data[0].position.match(regularExpName) && this.data[0].position !== 0) {
                        if (regularExpSal.test(this.data[0].salary) && this.data[0].salary !== 0) {
                            this.showWorker();
                        } else {
                            alert('Typed incorrect value, or some of the fields are empty!');
                            this.closeWindow();
                        }
                    } else {
                        alert('Typed incorrect value, or some of the fields are empty!');
                        this.closeWindow();
                    }
                } else {
                    alert('Typed incorrect value, or some of the fields are empty!');
                    this.closeWindow();
                }
            } else {
                alert('Typed incorrect value, or some of the fields are empty!');
                this.closeWindow();
            }
        } else {
            alert('Typed incorrect value, or some of the fields are empty!');
            this.closeWindow();
        }
    }

    createNewWorker(index, event) {
        this.information.leftCol.innerHTML = ' ';
        this.information.rightCol.innerHTML = ' ';
        if (this.modalValue === true) {
            this.modifyWorker(event, index);
        } else if (this.modalValue === false) {
            this.createWorker(event);
        }
        this.closeWindow();
        this.aboutRestoraunt();
    }

    deleteWorker(index) {
        this.information.leftCol.innerHTML = ' ';
        this.information.rightCol.innerHTML = ' ';
        this.data.splice(index, 1);
        this.showWorker();
        this.aboutRestoraunt();
    }

    modifyWorker(event, i) {
        event.preventDefault();

        let workerModify = new FormData(event.target.closest('form'));
        let regularExpName = /^[a-zA-Z]{4,18}$/;
        let regularExpDep = /^[\d]{1}$/;
        let regularExpSal = /^[\d]{1,9}$/;

        this.data[i].name = workerModify.get('name') || this.data[i].name;
        this.data[i].surname = workerModify.get('surname') || this.data[i].surname;
        this.data[i].department = workerModify.get('department') || this.data[i].department;
        this.data[i].position = workerModify.get('position') || this.data[i].position;
        this.data[i].salary = workerModify.get('salary') || this.data[i].salary;
        this.data[i].dismissed = workerModify.get('dismissed') || this.data[i].dismissed;

        if (this.data[i].name.match(regularExpName) && this.data[i].name !== 0) {
            if (this.data[i].surname.match(regularExpName) && this.data[i].surname !== 0) {
                if (regularExpDep.test(this.data[i].department) && this.data[i].department !== 0) {
                    if (this.data[i].position.match(regularExpName) && this.data[i].position !== 0) {
                        if (regularExpSal.test(this.data[i].salary) && this.data[i].salary !== 0) {
                            this.showWorker();
                        } else {
                            alert('Typed incorrect value, or some of the fields are empty!');
                            this.closeWindow();
                        }
                    } else {
                        alert('Typed incorrect value, or some of the fields are empty!');
                        this.closeWindow();
                    }
                } else {
                    alert('Typed incorrect value, or some of the fields are empty!');
                    this.closeWindow();
                }
            } else {
                alert('Typed incorrect value, or some of the fields are empty!');
                this.closeWindow();
            }
        } else {
            alert('Typed incorrect value, or some of the fields are empty!');
            this.closeWindow();
        }
    }
}
const restorauntView = new RestView(workersArr);
