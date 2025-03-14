import pdf from 'pdf-parse';

export async function parsePdfBase64(base64Pdf: string): Promise<string> {
    const dataBuffer = Buffer.from(base64Pdf, 'base64');
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
}
