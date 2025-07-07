const totalPages = 10;
let currentPage = 0;
let score = 0;
let users =[];
let namelist = [];
let Clicked = false;
let Idstudent=[6801001,6801300]

const quizContainer = document.getElementById('quizContainer');

class QuizN2MY {
    constructor(_q,[_a1,_a2,_a3,_a4],[_s1,_s2,_s3,_s4]) {
        this.question = _q;
        this.choice = [_a1,_a2,_a3,_a4];
        this.score = [_s1,_s2,_s3,_s4];
    }
}

let listQuiz = [
    new QuizN2MY("(1) คำถาม 1", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(2) คำถาม 2", ["ช้อย 2.1", "ช้อย 2.2", "ช้อย 2.3", "ช้อย 2.4"], [0,1,2,3]),
    new QuizN2MY("(3) คำถาม 3", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(4) คำถาม 4", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(5) คำถาม 5", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(6) คำถาม 6", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(7) คำถาม 7", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(8) คำถาม 8", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(9) คำถาม 9", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
    new QuizN2MY("(10) คำถาม 10", ["ช้อย 1.1", "ช้อย 1.2", "ช้อย 1.3", "ช้อย 1.4"], [0,1,2,3]),
];

for (let i = 0; i < totalPages; i++) {

    const page = document.createElement('div');
    page.className = 'page';
    page.id = `page${i}`;
    page.innerHTML = listQuiz[i].question;

    for (let j = 0; j < 4; j++) {
        const button = document.createElement('button');
        button.innerHTML = listQuiz[i].choice[j];
        button.onclick = () => countScore(j);
        page.appendChild(button);
    }

    quizContainer.appendChild(page);
}

function startQuiz() {
    document.getElementById('startPage').classList.remove('active');
    showPage(currentPage);
}

function showPage(index) {
    document.getElementById(`page${index}`).classList.add('active');
}

function hidePage(index) {
    document.getElementById(`page${index}`).classList.remove('active');
}

function countScore(value) {
    score += value;
    hidePage(currentPage);
    currentPage++;
    
    if (currentPage < totalPages) {
        showPage(currentPage);
    } else {
        document.getElementById('Names').classList.add('active');
        document.getElementById('type').classList.add('active'); 
    }
}
       document.getElementById("submitname").addEventListener("click", function () {
    
    let userName = document.getElementById("nameInput").value.trim();
    let userId = document.getElementById("StudentId").value.trim();
    let userHouse = showAnswer(score);
    if (!userName || !userId) {
    alert("กรุณากรอกชื่อและรหัสให้ครบ");
    return;
}
    let isDuplicate = users.some(user => user.id&&user.id.toLowerCase() === userId.toLowerCase());
    if (isDuplicate) {
        alert("รหัสนี้ถูกใช้ไปแล้ว กรุณากรอกชื่อใหม่");
         document.getElementById('StudentId').value = '';
        document.getElementById('StudentId').focus();
        return;
    }
    let idNumber = parseInt(userId, 10);
if (
    isNaN(idNumber) || 
    userId.length !== 7 || 
    idNumber < 6801001 || 
    idNumber > 6801300
) {
    alert("กรุณากรอกรหัสนักศึกษาให้ถูกต้อง");
    document.getElementById("StudentId").value = '';
    document.getElementById("StudentId").focus();
    return;
}
    users.push({name:userName,id:userId,House:userHouse});
   localStorage.setItem('users', JSON.stringify(users));
console.log("ข้อมูลของทุกคน:", users);
document.getElementById("Name").classList.remove("active");
    document.getElementById("type").classList.remove("active");
    document.getElementById("resultPage").classList.add("active");
    document.getElementById("finalScore").innerText = showAnswer(score);

});
   

function saveName() {
    let input = document.getElementById("nameInput");
    let name = input.value;
    nameList.push(name);
}
function showAnswer(score) {
    if (score >= 0 && score <= 7){
        return "บ้าน A";
    } else if (score >= 8 && score <= 15){
        return "บ้าน B";
    } else if (score >= 16 && score <= 23){
        return "บ้าน C";
    } else if (score >= 24 && score <= 30){
        return "บ้าน D";
    }
}
