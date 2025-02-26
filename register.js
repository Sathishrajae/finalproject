// Sample student names mapped to registration numbers
const studentNames = {
    "22BCA043": "SATHISH RAJA E",
    "22BCA028": "MOHAMMED ALTHAF I",
    "22BCA040": "SABEER AHAMED",
    "1004": "Bob Williams"
};

// Auto-assign student name based on registration number
function assignStudentName() {
    const regNumber = document.getElementById("regNumber").value.trim();
    document.getElementById("studentName").value = studentNames[regNumber] || "Unknown Student";
}

document.getElementById("studentForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const regNumber = document.getElementById("regNumber").value.trim();
    const studentName = document.getElementById("studentName").value;
    const photoFile = document.getElementById("photo").files[0];

    if (!regNumber || !photoFile) {
        alert("Please enter a registration number and upload a photo.");
        return;
    }

    // Default Values
    const defaultExamDate = "2025-03-01"; 
    const defaultSubjects = ["WAD", "DATA MINNING", "IOT"];

    // Save photo filename
    const photoFilename = `photos/${regNumber}.jpg`; 

    // Create student object
    const studentData = {
        regNumber: regNumber,
        name: studentName,
        examDate: defaultExamDate,
        subjects: defaultSubjects,
        photo: photoFilename
    };

    let studentsData = JSON.parse(localStorage.getItem("studentsData")) || {};
    studentsData[regNumber] = studentData;
    localStorage.setItem("studentsData", JSON.stringify(studentsData));

    // Generate and save hall ticket
    generateHallTicket(studentData);

    alert("Student registered successfully!");
    document.getElementById("studentForm").reset();
});

// Generate Hall Ticket as JSON
function generateHallTicket(student) {
    const hallTicketData = {
        name: student.name,
        regNumber: student.regNumber,
        examDate: student.examDate,
        subjects: student.subjects,
        photo: student.photo
    };

    const hallTicketJSON = JSON.stringify(hallTicketData, null, 4);
    const blob = new Blob([hallTicketJSON], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `hall_tickets/${student.regNumber}.json`;
    link.click();
}
