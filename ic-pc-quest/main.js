console.log(questions.prd)

function addText(text) {
    document.getElementById('text').value += text;
}

function formatText(text) {
    return text.replaceAll('<b>', '<span class="bold-text">')
        .replaceAll('</b>', '</span>')
        .replaceAll('<i>', '<span class="italic-text">')
        .replaceAll('</i>', '</span>')
        .replaceAll('<br />', '<br />\n\t\t\t')
}

addText(`
    <!-- *************** -->
    <!-- questions start -->
    <!-- *************** -->
`);

questions.prd.map((item, index) => {
    addText(`
    <div class="question" id="question-${index}">
        <p class="text-question">
            ${formatText(item.pergunta)}
        </p>

        <div id="answer-a-question-${index}" class="answer answer-a ${item.resposta === 'a' ? 'q-c' : ''}">
            <div class="answer-letter-container">
                <div class="answer-letter answer-a-letter"></div>
            </div>
            <p class="text-answer">
                ${formatText(item.a)}
            </p>
        </div>

        <div id="answer-b-question-${index}" class="answer answer-b ${item.resposta === 'b' ? 'q-c' : ''}">
            <div class="answer-letter-container">
                <div class="answer-letter answer-b-letter"></div>
            </div>
            <p class="text-answer">
                ${formatText(item.b)}
            </p>
        </div>

        <div id="answer-c-question-${index}" class="answer answer-c ${item.resposta === 'c' ? 'q-c' : ''}">
            <div class="answer-letter-container">
                <div class="answer-letter answer-c-letter"></div>
            </div>
            <p class="text-answer">
                ${formatText(item.c)}
            </p>
        </div>
        
        <div class="dica-btn" id="dica-btn-${index}"></div>
    </div>
    <div class="dica" id="dica-${index}">
        <p class="text-dica">
            ${formatText(item.dica)}
        </p>
        <div class="dica-btn-voltar" id="dica-btn-voltar-${index}"></div>
    </div>`);
});

addText(`
    <!-- ************* -->
    <!-- questions end -->
    <!-- ************* -->
`);