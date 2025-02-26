function fetchStudentDetails() {
    const regNumber = document.getElementById("searchRegNumber").value.trim();
    const studentsData = JSON.parse(localStorage.getItem("studentsData")) || {};
    const studentDetailsDiv = document.getElementById("studentDetails");

    if (!regNumber || !studentsData[regNumber]) {
        studentDetailsDiv.innerHTML = "<p>Student not found.</p>";
        return;
    }

    const student = studentsData[regNumber];

    studentDetailsDiv.innerHTML = `
        <h3>Name: ${student.name}</h3>
        <p><strong>Reg Number:</strong> ${student.regNumber}</p>
        <p><strong>Exam Date:</strong> ${student.examDate}</p>
        <p><strong>Subjects:</strong> ${student.subjects.join(", ")}</p>
        <img src="${student.photo}" alt="Student Photo" width="100">
        <button onclick="downloadHallTicket('${student.regNumber}')">Download Hall Ticket</button>
        <div id="qr-${student.regNumber}"></div>
    `;

    // Generate QR Code for student
    new QRCode(document.getElementById(`qr-${student.regNumber}`), {
        text: `view-students.html?regNumber=${student.regNumber}`,
        width: 100,
        height: 100
    });
}

// Function to download Hall Ticket
function downloadHallTicket(regNumber) {
    const link = document.createElement("a");
    link.href = `hall_tickets/${regNumber}.json`;
    link.download = `${regNumber}-HallTicket.json`;
    link.click();
}
