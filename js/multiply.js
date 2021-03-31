//multyple returns array (arr[0], arr[1] - multiplicanda, multiplier, arr[length -1] - answear, 
//arr[other] - steps long multiplication
//all elements are arrays in reverse order
function multiply(a, b) {

  const ar = a.split('').reverse();
  const br = b.split('').reverse();

  const lenAr = ar.length;
  const lenBr = br.length;

  let stack = [];
  let allSteps = [];

  allSteps.push(ar, br);

  for (let i = 0; i < lenBr; i++) {
    // to save intermediate results
    let step = [];
    for (let j = 0; j < lenAr; j++) {
      let prod = ar[j] * br[i];
      stack[i + j] = (stack[i + j]) ? prod + stack[i + j] : prod;
      step.push(prod);
    }
    allSteps.push(flatten(step));
  }

  function flatten(arr) {
    for (let i = 0, n = arr.length; i < n; i++) {
      let ones = arr[i] % 10;
      let tens = Math.trunc(arr[i] / 10);
      arr[i] = ones;
      if (arr[i + 1]) {
        arr[i + 1] += tens; arr
      } else if (tens != 0) {
        arr[i + 1] = tens;
      }
    }
    return arr;
  }

  let answear = flatten(stack);
  allSteps.push(answear);
  //if you need to see the result in the console
  // console.log(answear.join('')); 
  // console.log(allSteps);
  return allSteps;
}
//create answer in table 
function visualAnswear(arr, elemtoAdd) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  //add css for table
  let classNameTable = 'table table-bordered align-middle text-center'.split(' ');
  table.classList.add(...classNameTable);

  const tWidth = arr[arr.length - 1].length; //table width
  let parentArrLen = arr.length;
  arr.forEach((elemTr, index, parentArr) => createRow(elemTr, index, parentArr, tbody, tWidth, parentArrLen));

  table.append(tbody);
  elemtoAdd.append(table);

  function createRow(arr, index, parentArr, tbody, tWidth, parentArrLen) {

    const firstValues = 2; // these values start from the first cell
    let row = document.createElement('tr');
    let n = arr.length;

    if (index == 1 || index == parentArrLen - 2) {
      row.setAttribute('style', 'border-bottom: 1px black solid');
    }

    let befCells;
    if (index < 3 || index == parentArrLen - 1) {
      befCells = 0;
    } else {
      befCells = index - firstValues;
    }
    let afterCells = tWidth - befCells - n;

    //empties cell after the step
    for (let i = 0; i < befCells; i++) {
      createCell(row, ' ');
    }
    for (let i = 0; i < n; i++) {
      // if (index == 1 || )
      createCell(row, arr[i]);
    }
    //create sign multiply
    if (index == 0) {
      let lenO = parentArr[0].length;
      let lenOne = parentArr[1].length;
      afterCells -= 1;

      if (lenO >= lenOne) {
        createMultiplyCell(row);
      } else if (lenO < parentArr[1].length) {
        const afterFirstCells = parentArr[1].length - parentArr[0].length;
        for (let i = 0; i < afterFirstCells; i++) {
          createCell(row, ' ')
        }
        createMultiplyCell(row);
        afterCells = afterCells - afterFirstCells;
      }
    } else if (index == 1) {
      afterCells -= 1;
    }
    //empties cell before the step
    for (let i = 0; i < afterCells; i++) {
      createCell(row, ' ');
    }

    tbody.append(row);
    return tbody;
  }

  function createCell(row, content, attributes = {}) {
    let cell = document.createElement('td');
    Object.keys(attributes).forEach((key) => cell.setAttribute(key, attributes[key]));
    let cellText;
    cellText = document.createTextNode(content);
    cell.append(cellText);
    row.prepend(cell);
  }

  function createMultiplyCell(row) {
    const attributes = {
      rowspan: 2,
      'style': 'text-align: right; font-family: monospace; font-size: 1.5rem; border-bottom: 1px black solid;',
    };
    createCell(row, 'x', attributes);
  }
}

export {multiply, visualAnswear};

