const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxPath = '/Users/willemvandenberg/Documents/agent-girl/chat-d47cb79d/files/Intake Form The Care Ranch leadership Retreat LVD.docx';
const outputPath = path.join(__dirname, '../intake-form-parsed.txt');

mammoth.extractRawText({ path: docxPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.value);
    console.log('✅ Document parsed successfully!');
    console.log(`📄 Output saved to: ${outputPath}`);
    console.log('\n--- First 2000 characters ---\n');
    console.log(result.value.substring(0, 2000));
  })
  .catch(err => {
    console.error('❌ Error parsing document:', err);
  });
