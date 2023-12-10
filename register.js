// module name: `register.js` to list students into it (possibly sorted too)

class ClassRegister {
  #length = undefined;
  // students is private, to avoid the Mismatch when reassigned `registry.students = []`
  #students = [];

  constructor() {
    console.log("new ClassRegister created");
    this.#length = 0;
  };

  get length() {
    if (this.#length === this.#students.length) {
      return this.#length;
    }
    else {
      // DEBUG :
      return `
        Mismatch of contents length:
        this.#length: ${this.#length}
        this.#students.length: ${this.#students.length}
      `
    }
  }

  /*  CRUD */

  /**
   * To add a new student object inside instance of `ClassRegister`. By adding one the attribute `this.#length` increase for a safety measure
   * To create a new student I simply pass three args, `name` , `surname`. and a `scores` array.
   * @param {string} name
   * @param {string} surname
   * @param {Array} scores
   */
  addStudent(name, surname, scores) {
    // To prevent undefined `scores` if it's null
    scores = scores || [];

    console.log(`new student {name: ${name}, surname: ${surname}, scores: ${JSON.stringify(scores)} } added to ClassRegister`);
    this.#length += 1;
    this.#students.push({ "name": name, "surname": surname, "scores": scores });
  }

  /**
   * To list all students this maps each `stud` students in the enumerate way (like in **Python**) to get their index `i` and correct it in human counting mode (first is `1`, not `0`).
   * @returns a new array created with `map()`
   */
  readStudents() {
    return this.#students.map((stud, i) => `${i + 1}: ${JSON.stringify(stud)}`);
  }

  /**
   * Giving a `name` and a `surname` it loops inside the array `students` to enumarate each `stud` student and when spotted it splice out that single fellow (thus decrease also `this.#length` for a safety measure).
   * @param {string} name
   * @param {string} surname
   * @returns
   */
  removeStudent(name, surname) {
    for (const [i, stud] of this.#students.entries()) {
      if (stud.name === name && stud.surname === surname) {
        // remove at index `i`, 1 stud
        this.#students.splice(i, 1);
        this.#length -= 1;
        console.log(`student ${name} ${surname} removed from ClassRegister!`);
        return true;
      }
    }

    console.log(`No student ${name} ${surname} found!`);
    return false;
  }


  /**
   * To update a student `name` + `surname` with `newName` + `newSurname`, this method loops inside instance of `ClassRegister`:
   * - replace the previous student names (name and surname) with a new args passed as params !
   * @param {string} name
   * @param {string} surname
   * @param {string} newName
   * @param {string} newSurname
   * @returns
   */
  updateStudentNames(name, surname, newName, newSurname) {
    for (const [i, stud] of this.#students.entries()) {
      if (stud.name === name && stud.surname === surname) {
        const updated = { "name": newName, "surname": newSurname, "scores": [] };
        // // remove at index `i`, 1 stud, + add new Student
        // this.#students.splice(i, 1, updated);

        this.#students[i].name = newName;
        this.#students[i].surname = newSurname;

        console.log(`Student ${name} ${surname} updated into ${newName} ${newSurname}!`);
        return true;
      }
    }
  }

  /* MUST HAVE TO PARSE INTO `JSON` so that `JSON.stringify(new ClassRegister)` works smoothly*/
  toJSON() {
    return {
      // wrapping The Block inside parenthesis allows arrow-fuction to interpret this block as an `object litteral`
      // without those `(` & `)` it execute that block as instructions
      students: this.#students.map(stud_ => ({
        // The Block
        name: stud_.name,
        surname: stud_.surname,
        scores: stud_.scores.map(score_ => ({
          // The Block
          punteggio: score_.punteggio,
          date: score_.date.toISOString()
        }))

      }))
    };
  }
}

// module.exports = ClassRegister;

let myRegistry = new ClassRegister();


/* D.O.M. Manipulation */

// variables of elements from <main>
const studentForm = document.querySelector("#studentForm");
const submitStudent = document.querySelector("#submitStudent");
const listStudents = document.querySelector("#listStudents");

function readStorageItem(item) {
  console.log(JSON.parse(localStorage.getItem(item)));
}

/**
 * function to save ad object inside localStorage with a key and the item which needs to be parse into a JSON string.
 * @param {string} key
 * @param {object} item
 */
function saveItemInStorage(key, item) {
  if (typeof item === "object") {
    localStorage.setItem(key, JSON.stringify(item));
  } else {
    console.error("the give item is not an object" + item);
  }
}

function loadRegisterFromLocalStorage() {
  const keyLocalStorage = "myRegistry";
  const storedRegistry = localStorage.getItem(keyLocalStorage);

  if (storedRegistry) {
    const registryObj = JSON.parse(storedRegistry);

    myRegistry = new ClassRegister();
    // adding one student at a time, because I don't have a method add-them-all .
    registryObj.students.forEach(stud_ => {
      myRegistry.addStudent(stud_.name, stud_.surname, stud_.scores);
    });

    return myRegistry;
  }

  // IN CASE: nothing to see inside localStorage :-(
  myRegistry = new ClassRegister();
}


function callRegister() {
  // from input fields
  let studentName = document.querySelector("#studentName").value;
  let studentSurname = document.querySelector("#studentSurname").value;
  const tempScore = [];

  studentName = studentName.trim();
  studentSurname = studentSurname.trim();
  console.log("- name:" + studentName + " surname:" + studentSurname + " " + tempScore);

  // triming whitespaces
  if (studentName !== "") {
    console.log(`-> adding new student to myRegistry`);
    myRegistry.addStudent(studentName, studentSurname, tempScore);

    // DEBUG :
    console.log("testing localStorage - adding to key 'myRegistry' the content of variable `myRegistry`");
    saveItemInStorage("myRegistry", myRegistry);
    readStorageItem("myRegistry");
  } else {
    console.error("--> inserted whitespace or empty string");
    alert("Caution: insert a valid name");
  }

  // Resetting input fields
  document.querySelector("#studentName").value = "";
  document.querySelector("#studentSurname").value = "";

}






// // need to parse object into a JSON string to enter in localStorage correctly
// localStorage.setItem("myRegistry", JSON.stringify(myRegistry));


// DEBUG :

console.log("\n\nINIZIO DOM\n\n");

// readStorageItem("myRegistry");

// to prevent default behaviour of forms
studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // NOTE :
  // - added this,
  // - the form `action="#"`
  // TODO : create, verify this type of function.

  callRegister();
})


// to allow to ""import the old `myRegistry` from the memory of `localStorage`""
window.onload = () => {
  const myRegistry = loadRegisterFromLocalStorage();

  console.log("Onload and from LocalStorage");
  console.log(myRegistry);
}

// // BEFORE FIXING event.preventDefault:
// // submit with focus on a field of the form
// studentForm.addEventListener(click, (event) => {
//   callRegister();
// })

// // ""submit"" with click on input `type="button"` of the form
// submitStudent.addEventListener(click, (event) => {
//   callRegister();
// })

console.log(listStudents);
