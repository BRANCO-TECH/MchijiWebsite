
async function loadCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const text = await response.text();
    return text.split('\n').map(row => row.split(','));
  } catch (e) {
    console.error(e);
    document.getElementById('result').innerHTML = `Error: ${e.message}`;
    return [];
  }
}

async function fillReportCard(form, examNo, password) {
  const csvUrl = `form${form}.csv`;
  const data = await loadCSV(csvUrl);
  let found = false;
  for (let row of data.slice(2)) {
    const cols = row;
    if (cols.length < 64) continue;
    if (cols[1]?.trim() === examNo.trim() && password === "123456") {
      const nameIndex = 9;
      const formIndex = 0;
      const termIndex = 3;
      const yearIndex = 4;
      const headTeacherIndex = 5;
      const bankDetailsIndex = 6;
      const nextTermIndex = 7;
      const positionIndex = 62;
      const remarksIndex = 63;
      const subjects = ['AGRI', 'BIBLE', 'BIO', 'CHE', 'CHI', 'HFC', 'ENG', 'HIS', 'GEO', 'S/LF', 'MAT', 'PHY', 'COM'];
      let html = `
        <div class="card">
          <div style="text-align: center;">
            <h2>REPORT CARD</h2>
            <p>MCHINJI SECONDARY SCHOOL</p>
          </div>
          <p><strong>Name:</strong> ${cols[nameIndex]}</p>
          <p><strong>Form:</strong> ${cols[formIndex]} <strong>Term:</strong> ${cols[termIndex]} <strong>Year:</strong> ${cols[yearIndex]}</p>
          <p><strong>POSITION IN CLASS:</strong> ${cols[positionIndex]}</p>
          <p><strong>REMARKS:</strong> ${cols[remarksIndex]}</p>
          <div style="overflow-x: auto;">
            <table border="1">
              <tr>
                <th>SUBJECT</th>
                <th>AGGREGATE (%)</th>
                <th>GRADE</th>
                <th>POSITION</th>
                <th>REMARKS</th>
              </tr>
              ${subjects.map((subject, i) => {
                const baseIndex = 10 + (i * 4);
                return `
                  <tr>
                    <td>${subject}</td>
                    <td>${cols[baseIndex]}</td>
                    <td>${cols[baseIndex + 1]}</td>
                    <td>${cols[baseIndex + 2]}</td>
                    <td>${cols[baseIndex + 3]}</td>
                  </tr>
                `;
              }).join('')}
            </table>
          </div>
          <p><strong>HEADTEACHER:</strong> ${cols[headTeacherIndex]}</p>
          <p><strong>BANK DETAILS FOR FEES PAYMENT:</strong> ${cols[bankDetailsIndex]}</p>
          <p><strong>NEXT TERM OPENS ON:</strong> ${cols[nextTermIndex]}</p>
        </div>
      `;
      document.getElementById('result').innerHTML = html;
      found = true;
      return;
    }
  }
  if (!found) document.getElementById('result').innerHTML = '<div class="card">No matching record found or incorrect password</div>';
}

function checkResult() {
  const form = document.getElementById('form').value;
  const examNo = document.getElementById('examNo').value.trim();
  const password = document.getElementById('password').value.trim();
  fillReportCard(form, examNo, password);
}
