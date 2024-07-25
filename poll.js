document.addEventListener('DOMContentLoaded', function() {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_URL_HERE/pub?output=csv';

    fetch(googleSheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Remove the header row
            const pollData = rows.map(row => row.split(','));
            const pollQuestion = pollData[0][0];
            const pollOptions = pollData.map(row => row[1]);

            document.getElementById('pollQuestion').textContent = pollQuestion;
            const pollOptionsContainer = document.getElementById('pollOptions');
            pollOptionsContainer.innerHTML = '';
            
            pollOptions.forEach(option => {
                const li = document.createElement('li');
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'pollOption';
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                li.appendChild(label);
                pollOptionsContainer.appendChild(li);
            });

            document.getElementById('pollSection').style.display = 'block';
            document.getElementById('resultSection').style.display = 'none';
        });

    const votes = [];
    
    document.getElementById('submitVoteButton').addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="pollOption"]:checked');
        
        if (selectedOption) {
            const vote = selectedOption.value;
            votes.push(vote);
            
            const results = pollOptions.map(option => ({
                option,
                count: votes.filter(v => v === option).length
            }));

            const resultList = document.getElementById('resultList');
            resultList.innerHTML = '';

            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = ${result.option}: ${result.count} votes;
                resultList.appendChild(li);
            });

            document.getElementById('resultSection').style.display = 'block';
        }
    });
});