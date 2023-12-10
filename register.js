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
   * To update a student `name` + `surname` with `newName` + `newSurname`, this method loops inside instance of `ClassRegister`
  *
  * NOTE :
  * - ~replace the previous student object with a new object with inside a **clean slate** `scores` array, BE WARNED !~
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
}

// module.exports = ClassRegister;

const myRegistry = new ClassRegister();


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




// // need to parse object into a JSON string to enter in localStorage correctly
// localStorage.setItem("myRegistry", JSON.stringify(myRegistry));


// DEBUG :
// readStorageItem("myRegistry");

// to prevent default behaviour of forms
studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // NOTE :
  // - added this,
  // - the form `action="#"`
  // TODO : create, verify this type of function. Use .submit() from DOM if necessary
})

console.log(listStudents);



