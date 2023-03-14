document.addEventListener("DOMContentLoaded", function () {

const studentsList = [
    {
     name: "Иван",
     surname: "Кривцов",
     patronymic: "Иваненко",
     birthDate: new Date(2000, 0, 22),
     startDate: '2016',
     faculty: "Юридический",
    },
    {
        name: "Андрей",
        surname: "Кривцов",
        patronymic: "Иваненко",
        birthDate: new Date(2000, 0, 22),
        startDate: '2016',
        faculty: "Юридический",
    },
    {
    name: "Олеся",
    surname: "Кривцов",
    patronymic: "Иваненко",
    birthDate: new Date(2001, 0, 22),
    startDate: '2016',
    faculty: "Юридический",
    },   
    {
        name: "Кристина",
        surname: "Кривцов",
        patronymic: "Иваненко",
        birthDate: new Date(2000, 2, 22),
        startDate: '2016',
        faculty: "Юридический",
    },
    {
        name: "Антон",
        surname: "Кривцов",
        patronymic: "Иваненко",
        birthDate: new Date(2010, 11, 22),
        startDate: '2016',
        faculty: "Юридический",
    },
]

function getStudentItem(studentObj) {
    const studentRow = document.createElement("tr");
    const studentName = document.createElement("td");
    studentName.innerText = studentObj.surname + " " + studentObj.name +  " " + studentObj.patronymic;
    studentRow.append(studentName);

    const studentBirthDate = document.createElement("td");
    const correctMonth = (studentObj.birthDate.getMonth() + 1).toString().length > 1 ? studentObj.birthDate.getMonth() + 1 : "0" + (studentObj.birthDate.getMonth() + 1);
    studentBirthDate.innerText = studentObj.birthDate.getDate() + "." + correctMonth + "." + studentObj.birthDate.getFullYear();
    studentRow.append(studentBirthDate);

    const studentStartDate = document.createElement("td");
    studentStartDate.innerText = studentObj.startDate;
    studentRow.append(studentStartDate);

    const studentFaculty = document.createElement("td");
    studentFaculty.innerText = studentObj.faculty;
    studentRow.append(studentFaculty);
    return studentRow;
}

function renderStudentsTable(studentsArray) {
    let table = document.getElementById('tbody');
    studentsArray.forEach(element => {
        table.append(getStudentItem(element));
    });
}

renderStudentsTable(studentsList)


const addStudentSubmit = document.getElementById("submit");
const addForm = document.getElementById("add-form");
const inputs = addForm.querySelectorAll("input");
const birhDateInput = document.getElementById("birthDate");

function clearTable() {
    while (tbody.children.length > 2) {
        tbody.removeChild(tbody.lastChild);
    }
}



addStudentSubmit.onclick  = function(event) {
    event.preventDefault();

    let oldMessages = document.querySelectorAll(".alertMessage")
    oldMessages.forEach(element => {
        element.remove();
    });
    let nextCheck = true;

    inputs.forEach(element => {
        
        element.classList.remove("alert");
        
        let elValue = element.value.trim();
        let alertMessageEmpty = document.createElement("p");
        let epmtyEl = document.getElementById(element.id);

        alertMessageEmpty.innerText = "Заполните поле";
        alertMessageEmpty.classList.add("alertMessage");

        //проверка на пустоту  
        if (elValue == "") {
            
            epmtyEl.classList.add("alert");
            addForm.insertBefore(alertMessageEmpty, epmtyEl);
            nextCheck = false;
            console.log(nextCheck)
            return;
        }        
    });

    if (nextCheck) {
       birthDate.value.split("-")[0] >= "1900" && birthDate.valueAsDate <= new Date() ? nextCheck = true : nextCheck = false;
    };

    if (nextCheck) {
        startDate.value >= "2000" && startDate.value <= new Date().getFullYear() ? nextCheck = true : nextCheck = false;
    };

    if (nextCheck) {
        let newStudent = {};

        inputs.forEach(element => {
            element.id == "birthDate" ? newStudent[element.id] = element.valueAsDate : newStudent[element.id] = element.value;
        });

        studentsList.push(newStudent);
        console.log(studentsList)

        inputs.forEach(element => {
            element.value = "";
        });

        clearTable()
        renderStudentsTable(studentsList)

    }


};

const nameSortBtn = document.querySelector(".nameHead");
const ageSortBtn = document.querySelector(".ageHead");
const startSortBtn = document.querySelector(".startHead");
const facHeadBtn = document.querySelector(".facHead");

console.log(nameSortBtn)

nameSortBtn.onclick = function() {
    let nameSort = studentsList.sort(function(a,b) {
        if ((a.surname + a.name + a.patronymic) < (b.surname + b.name + b.patronymic)) return -1;
    });
    clearTable()
    renderStudentsTable(nameSort)
}

ageSortBtn.onclick = function() {
    let birthSort = studentsList.sort(function(a,b) {
        if ((a.birthDate) < (b.birthDate)) return -1;
    });
    clearTable()
    renderStudentsTable(birthSort)
}

startSortBtn.onclick = function() {
    let startSort = studentsList.sort(function(a,b) {
        if ((a.startDate) < (b.startDate)) return -1;
    });
    clearTable()
    renderStudentsTable(startSort)
}


facHeadBtn.onclick = function() {
    let facSort = studentsList.sort(function(a,b) {
        if ((a.faculty) < (b.faculty)) return -1;
    });
    clearTable()
    renderStudentsTable(facSort)
}


// 

});