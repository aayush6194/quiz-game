import fs from 'fs';
import path from 'path';

const readFile = (fileName) => {
    const filePath = path.join('./', fileName);
    return fs.readFileSync(filePath, { encoding: 'utf-8' }, (err, data) => err ? err : data);
}

const getQuestions = (data) => {
    const questions = [];
    data = data.split('\n');

    for (let i = 0; i < data.length; i += 6) {
        const question = data[i].trim()
        const options = [];
        let correctOption = undefined;

        for (let j = 1; j < 5; j++) {
            let option = data[i + j].trim();
            if (option.includes('(correct)')) {
                option = option.split(' ')[0]
                correctOption = option;
            }
            options.push(option)

        }
        questions.push({ question, options, correctOption });
    }

    return (questions)
}

export { readFile, getQuestions }