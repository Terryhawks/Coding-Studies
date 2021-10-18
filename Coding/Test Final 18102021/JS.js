class student {
    constructor(identify, name, grade) {
        this.id = identify;
        this.name = name;
        this.grade = grade;
        this.hydrogen = "My id is " + identify + ", my name is " + name + " and i am grade " + grade + ".";
    }
}

const student1 = new student("1", "Hanna", "7A");
const student2 = new student("2", "Ivan", "7B");
const student3 = new student("3", "Julian", "8B");
const student4 = new student("4", "Kimberly", "8A");
const student5 = new student("5", "Logan", "9A");
const student6 = new student("6", "Noah", "9B");

document.write(student1.hydrogen)
document.write("<br>")
document.write(student2.hydrogen)
document.write("<br>")
document.write(student3.hydrogen)
document.write("<br>")
document.write(student4.hydrogen)
document.write("<br>")
document.write(student5.hydrogen)
document.write("<br>")
document.write(student6.hydrogen)