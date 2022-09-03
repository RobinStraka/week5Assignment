class Employee {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }

    describe() {
        return '${this.name} works as a ${this.title}.';
    }
}

class Office {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error('You can only add an Employee. Argument is not an employee: ${employee}');
        }
    }

    describe() {
        return '${this.name} has ${this.employees.length} employees.';
    }
}

class Menu {
    constructor() {
        this.offices = [];
        this.selectedOffice = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createOffice();
                    break;
                case '2':
                    this.viewOffice();
                    break;
                case '3':
                    this.deleteOffice();
                    break;
                case '4':
                    this.displayOffice();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new office
            2) view office
            3) delete office
            4) display all offices
        `);
    }

    showOfficeMenuOptions(officeInfo) {
        return prompt(`
            0) back
            1) create employee
            2) delete employee
            -----------------------
            ${officeInfo}
        `);
    }

    displayOffice() {
        let officeString = '';
        for (let i = 0; i < this.offices.length; i++) {
            officeString += i + ') ' + this.offices[i].name + '\n';
        }
        alert(officeString);
    }

    createOffice() {
        let name = prompt('Enter office name:');
        this.offices.push(new Office(name));
    }

    viewOffice() {
        let index = prompt('Enter the index of the Office you wish to view:');
        if (index > -1 && index < this.offices.length) {
            this.selectedOffice = this.offices[index];
            let description = 'Office Name: ' + this.selectedOffice.name + '\n';

            for (let i = 0; i < this.selectedOffice.employees.length; i++) {
                description += i + ') ' + this.selectedOffice.employees[i].name
                 + '-' + this.selectedOffice.employees[i].title + '\n';
            }

            let selection = this.showOfficeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }

    deleteOffice() {
        let index = prompt('Enter the index of the office you wish to delete:');
        if (index > -1 && index < this.offices.length) {
            this.offices.splice(index, 1);
        }
    }

    createEmployee() {
        let name = prompt('Enter name of new employee:');
        let title = prompt('Enter title for new employee:');
        this.selectedOffice.employees.push(new Employee(name, title));
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.selectedOffice.employees.length) {
            this.selectedOffice.employees.splice(index, 1);
        }
    }   
}

let menu = new Menu();
menu.start();
