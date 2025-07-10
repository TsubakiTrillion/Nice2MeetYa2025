const totalPages = 10;
let currentPage = 0;
let score = 0;
let users = [];
let namelist = [];
let Clicked = false;
let Idstudent = [6801001, 6801300];

if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

const quizContainer = document.getElementById("quizContainer");

const listQuiz = [
  {
    question: "อาจารย์สั่งโปรเจกต์กลุ่มใหญ่ให้ทำหนังสั้น คุณจะ…",
    choice: [
      "รับหน้าที่ประสานงานและวางโครงสร้างทั้งภาพรวม",
      "ศึกษาการทำหนังสั้นเชิงลึกและจัดระบบงานที่ทำได้จริง",
      "คอยสังเกตว่าใครถนัดอะไร แล้วค่อยเสนอไอเดีย",
      "อาสาทำส่วนยากที่สุดและให้กำลังใจเพื่อนในกลุ่ม",
    ],
    score: [1, 0, 2, 3],
  },
  {
    question: "หากเพื่อนของคุณอกหักแล้วมาปรึกษาคุณ คุณจะตอบว่า…",
    choice: [
      "“มันเจ็บก็จริงนะ แต่เวลาจะเยียวยาทุกอย่างเอง”",
      "“อยากเล่าอะไรก็เล่าเลยนะ เราฟังอยู่”",
      "“มานั่งทบทวนสิ่งที่เกิดขึ้นและคิดว่าผ่านมันไปยังไง”",
      "“เก่งมากแล้วนะ เดี๋ยวเราไปทำอะไรสนุก ๆ กัน!”",
    ],
    score: [3, 2, 0, 1],
  },
  {
    question: "ในช่วงปิดเทอมหรือหยุดยาว คุณมักจะใช้เวลาไปกับ…",
    choice: [
      "สมัครงานอาสาหรือทำกิจกรรมนักศึกษา",
      "ลองฝึกทักษะใหม่ ๆ ด้วยตัวเองแบบจริงจัง",
      "รับสื่อเช่นหนังสือ ซีรีส์ที่ช่วยเปิดโลกทัศน์ใหม่ ๆ",
      "เข้าร่วมเวิร์กช็อปหรือคุยกับรุ่นพี่เพื่อหาแรงบันดาลใจ",
    ],
    score: [3, 0, 2, 1],
  },
  {
    question: "เมื่อมีงานกลุ่มที่ต้องพรีเซนต์หน้าห้อง คุณจะ…",
    choice: [
      "เสนอคนที่เหมาะสมที่สุด โดยคุณคอยซัพพอร์ต",
      "วางสคริปต์แบบมีเหตุมีผลให้คนอื่นไปพูด",
      "เสนอตัวพูดให้แม้จะไม่ได้เตรียมมาก แต่ขอให้ทีมมั่นใจ",
      "เขียนโฟลว์และจัดลำดับภาพรวมให้พรีเซนต์ออกมาลื่นไหล",
    ],
    score: [2, 0, 3, 1],
  },
  {
    question: "ถ้าคุณรู้สึกขัดแย้งในกลุ่มเพื่อน คุณจะ…",
    choice: [
      "พูดออกไปตรง ๆ เพื่อให้เคลียร์และเดินหน้าต่อ",
      "ไกล่เกลี่ยให้ทุกคนฟังกันและคืนดีกันได้",
      "ถอยออกมาคิดก่อน แล้วค่อยกลับไปด้วยมุมมองใหม่",
      "คุยกับแต่ละคนแยกกันแล้วเสนอแนวทางแก้",
    ],
    score: [3, 1, 2, 0],
  },
  {
    question: "ถ้าเพื่อนมาขอให้ช่วยติว คุณจะ…",
    choice: [
      "ติวแบบเน้นแก่น ไม่ท่องจำ พร้อมแชร์ประสบการณ์จริง",
      "สรุปเนื้อหาเป็นระบบและสอนแบบมีขั้นตอน",
      "ออกแบบแผนการติวให้เข้าใจง่ายและน่าเรียน",
      "ช่วยตีความโจทย์ยาก ๆ และตั้งคำถามให้คิดลึกขึ้น",
    ],
    score: [3, 0, 1, 2],
  },
  {
    question: "คุณมักได้รับคำชมจากคนอื่นว่า…",
    choice: [
      "แม่นยำ มีเหตุผล วางแผนดีเยี่ยม",
      "เข้าใจลึกแต่ไม่พูดมาก มองอะไรทะลุ",
      "โน้มน้าวเก่ง เข้าหาผู้คนเก่ง",
      "กล้าตัดสินใจ กล้าเสียสละ",
    ],
    score: [0, 2, 1, 3],
  },
  {
    question:
      "ถ้าคุณได้รับหน้าที่เป็นบัดดี้ดูแลนักศึกษาต่างชาติแต่พวกเขาดูไม่อยากร่วมกิจกรรม คุณจะ…",
    choice: [
      "ชวนคุยเป็นการส่วนตัว เพื่อเข้าใจเหตุผลเบื้องหลังและรู้สึกปลอดภัย",
      "วางแผนกิจกรรมเล็ก ๆ ที่ไม่กดดัน เช่น พาทัวร์คณะ พร้อมเตรียมแผนสำรอง",
      "เล่าเรื่องประสบการณ์ของเพื่อนต่างชาติคนอื่นที่เคยรู้สึกแบบเดียวกัน",
      "ยืนยันจะอยู่ข้างเขาให้ไม่รู้สึกโดดเดี่ยว",
    ],
    score: [2, 0, 1, 3],
  },
  {
    question: "ถ้าเพื่อนและคุณกำลังเดินกลับหอพัก แล้วพบว่าน้ำท่วม คุณจะ…",
    choice: [
      "รีบหาข้อมูลเลี่ยงจากรุ่นพี่ แล้วนำทางทุกคนกลับโดยปลอดภัย",
      "พยายามทำให้สถานการณ์ไม่เครียด แล้วหาทางข้ามน้ำ",
      "สังเกตระดับน้ำและพฤติกรรมคนรอบข้างก่อนเสนอวิธีการ",
      "อาสาเดินลุยน้ำสำรวจทางก่อนให้มั่นใจว่าปลอดภัย แม้ตัวเองจะเปียกก็ตาม",
    ],
    score: [0, 1, 2, 3],
  },
  {
    question: "คุณอยากเป็นที่จดจำว่าเป็น…",
    choice: [
      "ผู้กล้าที่ไม่กลัวการเปลี่ยนแปลง",
      "นักคิดที่สร้างสิ่งใหม่อย่างเงียบๆ",
      "นักสังเกตการณ์ลึกซึ้งผู้ไขปริศนา",
      "ผู้นำที่ดึงศักยภาพของผู้อื่นได้",
    ],
    score: [3, 0, 2, 1],
  },
];

const listGIF = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

for (let i = 0; i < totalPages; i++) {
  const page = document.createElement("div");
  page.className = "quiz-page";
  page.id = `page${i}`;
  page.innerHTML = `${listQuiz[i].question}<br><img src="images/${listGIF[i]}.GIF" class="gif" alt="GIF Questions">`;

  for (let j = 0; j < 4; j++) {
    const button = document.createElement("button");
    button.innerHTML = listQuiz[i].choice[j];
    button.className = "quiz-button";
    button.onclick = () => countScore(j);
    page.appendChild(button);
  }

  quizContainer.appendChild(page);
}

function startQuiz() {
  document.getElementById("startPage").classList.remove("active");
  showPage(currentPage);
}

function showPage(index) {
  document.getElementById(`page${index}`).classList.add("active");
}

function hidePage(index) {
  document.getElementById(`page${index}`).classList.remove("active");
}

function countScore(value) {
  score += value;
  hidePage(currentPage);
  currentPage++;

  if (currentPage < totalPages) {
    showPage(currentPage);
  } else {
    document.getElementById("name").classList.add("active");
    document.getElementById("type").classList.add("active");
  }
}

document.getElementById("submitname").addEventListener("click", function () {
  let userName = document.getElementById("nameInput").value.trim();
  let userHouse = showAnswer(score);
  if (!userName) {
    alert("กรุณากรอกชื่อในช่องชื่อ");
    return;
  }
  users.push({ name: userName, house: userHouse });
  localStorage.setItem("users", JSON.stringify(users));
  console.log("ข้อมูลของทุกคน: ", users);
  document.getElementById("name").classList.remove("active");
  document.getElementById("type").classList.remove("active");
  document.getElementById("resultPage").classList.add("active");
  document.getElementById("finalScore").innerText = showAnswer(score);
});

function showAnswer(score) {
  if (score >= 0 && score <= 7) {
    return "Alchemoir";
  } else if (score >= 8 && score <= 15) {
    return "Verdanthorn";
  } else if (score >= 16 && score <= 23) {
    return "Noxmortha";
  } else if (score >= 24 && score <= 30) {
    return "Arcarum";
  }
}
