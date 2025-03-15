const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');
require('dotenv').config();

const SERVER_URL = 'http://localhost:3000';
const JOB_DESCRIPTION_PATH = './pdf/job_description.pdf';
const CV_PATH = './pdf/cv.pdf';

async function extractTextFromPDF(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error.message);
        process.exit(1);
    }
}

async function analyzePDFs(jobDescriptionText, cvText) {
    try {
        const response = await axios.post(`${SERVER_URL}/trpc/pdf.analyzePDFs`, {
            jobDescription: jobDescriptionText,
            cv: cvText,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.result.data;
    } catch (error) {
        console.error('Error analyzing PDFs:', error.message);
        process.exit(1);
    }
}

async function runTest() {
    console.log('Starting test...');

    console.log('Extracting text from PDFs...');
    // const jobDescriptionText = await extractTextFromPDF(uploadedFiles[0].path);
    const jobDescriptionText = await extractTextFromPDF(JOB_DESCRIPTION_PATH);
    // const cvText = await extractTextFromPDF(uploadedFiles[1].path);
    const cvText = await extractTextFromPDF(CV_PATH);

    console.log('Job Description Text:', jobDescriptionText);
    console.log('CV Text:', cvText);

    console.log('Analyzing PDFs...');
    const analysisResult = await analyzePDFs(jobDescriptionText, cvText);

    console.log('Analysis Result:', JSON.stringify(analysisResult, null, 2));

    if (analysisResult.candidates && analysisResult.candidates.length > 0) {
        const content = analysisResult.candidates[0].content;
        console.log('Content Details:', JSON.stringify(content, null, 2));
    } else {
        console.log('No candidates found in the analysis result.');
    }

    console.log('Test completed successfully!');
}

runTest();