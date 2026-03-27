
function checkResult() {
  const examNo = document.getElementById('examNo').value.trim();
  const dob = document.getElementById('dob').value.trim();

  fetch('students.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n');
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        if (row[0] === examNo && row[1] === dob) {
          document.getElementById('result').innerHTML = `
            Name: ${row[2]}<br>
            BIO: ${row[3]}<br>
            PHY: ${row[4]}<br>
            Chem: ${row[5]}
          `;
          return;
        }
      }
      document.getElementById('result').innerHTML = 'No match found';
    });
}
