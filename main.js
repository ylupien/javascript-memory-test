function dumpMemoryUsage(msg) {
  const used = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  console.log(`The script uses approximately ${used} MB`, ' - ', msg);
}

dumpMemoryUsage('Start');

console.log('Create a large array full of string just to fill memory');
let arr = Array(1e6).fill("some string");

dumpMemoryUsage('Just after defining a large array');

function callA(valueByCopy) {
  console.log(valueByCopy.length);
  dumpMemoryUsage('callA - Here we see in memory the variable is not a real duplication');
  callB(valueByCopy);
}

function callB(valueByCopy) {
  console.log(valueByCopy.length);
  dumpMemoryUsage('callB before modify variable');
  valueByCopy.push(1);
  dumpMemoryUsage('callB after modify the variable as we see here the variable get duplicated in memory');
  callC(valueByCopy);
}

function callC(valueByCopy) {
  console.log(valueByCopy.length);
  dumpMemoryUsage('callC no duplication in memory');
}

callA(arr);

dumpMemoryUsage('End of function call');

console.log('Calling the GC here will release variable created in callB by adding the 1 to the array.');
global.gc();

dumpMemoryUsage('Here as we see the memory used by the variable created in callB was released');

// Release variable
arr = null;

console.log('Calling the GC to make sure JS really release arr from memory and all variables without any references.');
global.gc();

dumpMemoryUsage('Here all variable have been release');

