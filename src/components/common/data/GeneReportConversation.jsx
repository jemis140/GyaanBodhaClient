import React from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver"; // Import file-saver
import GradientButton from "../general/Button";

const GenerateReportConversation = ({ chatData }) => {
  // Function to generate the report
  const generateDocument = () => {
    // Create a new Document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: chatData.flatMap((item, index) => [
            new Paragraph({
              children: [
                new TextRun(
                  `${index % 2 === 0 ? "Question" : "Answer"}: ${item.content}`
                ), // Alternating "Question" and "Answer"
              ],
            }),
            new Paragraph(""),
          ]),
        },
      ],
    });

    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
      // Save the generated .docx file using file-saver
      saveAs(blob, "conversation.docx");
    });
  };

  return <GradientButton label="Generate Report" onClick={generateDocument} />;
};

export default GenerateReportConversation;
