import * as fs from 'fs';
import { join } from 'path';
import { v1 } from 'uuid';
import { Question } from '../domains/Question';
import { Choice } from '../domains/Choice';

/**
 * Read file syncronously to return its content
 * @param {string} fileName name of the file to be read
 * @param {string} location path to the file
 * @returns {string} content of the file
 */
const readFile = (fileName, location = './') => {
    const filePath = join(location, fileName);
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
    data = data.split('\n'); //Split by new line
    // Iterating each lin
    for (let i = 0; i < data.length; i += 6) {
        const question = data[i].trim();
        const options = [];
        let correctOption = undefined;

        for (let j = 1; j < 5; j++) {
            let option = data[i + j].trim();

            // Checking if option is corrent; Correct answer contains (correct)
            if (option.includes('(correct)')) {
                // Removing the (correct) keyword
                option = option.split(' ')[0];
                correctOption = option;
                options.push(Choice(v1(), correctOption, true));
            } else {
                options.push(Choice(v1(), option));
            }
        }
        questions.push(Question(v1(), question, options));
    }

    return questions;
};

export { readFile, getQuestions };
