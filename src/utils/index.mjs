import fs from 'fs';
import path from 'path';
import { Question } from '../domains/Question.mjs';
import { Choice } from '../domains/Choice.mjs';

const readFile = (fileName) => {
    const filePath = path.join('./', fileName);
    return fs.readFileSync(filePath, { encoding: 'utf-8' }, (err, data) =>
        err ? err : data
    );
};

/**
 * Parse the string to create list of questions and options
 * @param {string} data content of the file
 * @return {string} formated list of questions
 */
const getQuestions = (data) => {
  const questions = [];
  data = data.split("\n"); //Split by new line

    for (let i = 0; i < data.length; i += 6) {
        const question = data[i].trim();
        const options = [];
        let correctOption = undefined;

        for (let j = 1; j < 5; j++) {
            let option = data[i + j].trim();
            if (option.includes('(correct)')) {
                option = option.split(' ')[0];
                correctOption = option;
            }
            options.push(option);
        }
        // FIXME: last is always ans
        questions.push(
            Question(question, [
                ...options.map((option) => Choice(option)),
                Choice(correctOption, true),
            ])
        );
    }
    questions.push({ question, options, correctOption });
  }

   // return questions;
//};

export { readFile, getQuestions };
