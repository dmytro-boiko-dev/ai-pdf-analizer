# AI PDF Analyzer

A Node.js + TypeScript server using tRPC to analyze a candidate's CV and a job description PDF through Gemini 1.5.

## Installation & run

*NOTE: in the `testClient.ts` already converted example of CV and job description are used.*

1. Add actual endpoint and auth key to the `.env` constants:

```text
GEMINI_API_TOKEN=
GEMINI_API_ENDPOINT=
```

2. Install dependencies:

```shell
npm install
```

3. Run server:

```shell
npm run dev
```

### Run tests from scripts:

```shell
npm run test
```

### Output example:

```text
{
 "text": "## Job Application Analysis: John Doe for Frontend Developer Position\n\n**Overall Impression:** John Doe's CV presents a strong candidate for the Frontend Developer position. He possesses the necessary technical skills, relevant experience, and a proactive approach to development.  His CV clearly highlights his expertise in React, TypeScript, and related technologies, aligning well with the job requirements. \n\n**Strengths:**\n\n* **Strong Technical Skills:** John demonstrates proficiency in essential frontend technologies, including JavaScript, TypeScript, HTML, CSS, React, Redux, and Next.js. His experience with Tailwind CSS further showcases his ability to create modern and responsive UIs.\n* **Relevant Experience:** His professional experience showcases his ability to build responsive UIs, implement state management solutions, and optimize performance.  The mention of code reviews, sprint planning, and paired programming demonstrates his collaborative nature and team-oriented approach.\n* **Continuous Learning:** John's commitment to continuous learning is highlighted through his involvement in open-source projects, online courses, and local developer meetups. This indicates his passion for staying updated with the latest trends and technologies.\n* **Clear and Concise:** The CV is well-structured, easy to read, and focuses on relevant information, emphasizing John's strengths and qualifications.\n\n**Areas for Improvement:**\n\n* **Quantify Achievements:** While the CV mentions achievements, it could be strengthened by providing specific data points. For example, instead of stating \"improved performance by optimizing API calls,\" quantify the improvement by mentioning the percentage reduction in load time or an increase in page speed. \n* **Highlight Soft Skills:**  While mentioning \"strong communication and collaborative skills,\" the CV could benefit from specific examples showcasing these skills. For instance, mention a successful project where John collaborated with designers or effectively communicated technical details to non-technical stakeholders. \n* **Tailor for Specific Company:** While the CV is well-written, tailoring it to the specific company and job description could further enhance its effectiveness. Research the company's culture and projects, and highlight specific skills and experiences that align with their needs and values.\n\n**Overall:** John Doe presents a strong candidate with a compelling resume that showcases his skills and experience. With some minor adjustments to quantify achievements and highlight soft skills, his application will be even more competitive. \n"
}
```