const fs = require('fs');

// IMPORTANT!
// Please, uncomment exercise which you want to check.

// Blocking, synchronous way

// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOut = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}.`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');
// ===========================================================================

//Non-blocking, asynchronous way. Ex 1

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if(err) {
//         console.log(err)
//     } else {
//       console.log(data)
//     }
// });
// console.log('We will read file');
// ===========================================================================

//Non-blocking, asynchronous way. Ex 2
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data1)
//         }
//     })
// });
// ===========================================================================


//Non-blocking, asynchronous way. Ex 3  simple callback hell
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {
//         console.log(data1);
//
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data2) => {
//             console.log(data2);
//
//           fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', (err) => {
//               console.log('Your file has been written :-)');
//           });
//         });
//     })
// });
// ===========================================================================

//Non-blocking, asynchronous way. Ex 3  complex callback hell
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {

    if (err) {
        return console.log('Error on first step!', err)
    }

    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {

        if (err) {
            return console.log('Error on second step!', err)
        }

        console.log(data1);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data2) => {

            if (err) {
                return console.log('Error on third step!', err)
            }

            console.log(data2);
            fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', (err) => {
                console.log('Your file has been written :-)');
            });
        });
    })
});
// ===========================================================================


