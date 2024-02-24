function handleClick() {
    let OPEN_AI_KEY = document.getElementById('open_ai_key').value
    let outline = document.getElementById('course_outline').value

    document.getElementById('open_ai_key').value = ""
    document.getElementById('course_outline').value = ""



    console.log(OPEN_AI_KEY)
    console.log(outline)

    let prompt = `List out all the due dates with the tasks labeled from this document,
                  where each event is in the following json format: {summary: //the Course code//, description: //the task 
                  start: {date: //date of the task in yyyy-mm-dd format}, end: {date: //date of the task in yyyy-mm-dd format}}.
                  Here is the document: ` + outline

    let data = getGPTResponse(prompt, OPEN_AI_KEY)

    if (data === null) {
        return;
    }

    //const arr = formatResponse(data)

    for (let i = 0; i < arr.length; i++) {
        createEvent(JSON.stringify(arr[i]))
    }

}

function createEvent(event) {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        const headers = new Headers({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        })        

        const request = {
            headers,
            method: "POST",
            body: event
        }
        
        console.log(request)
        fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', request)
        .then((response) => response.json())
        .then(function(data) {
        })
    });
}

function getGPTResponse(prompt, key) {
    let data = null
    const headers = new Headers({
        'Authorization' : 'Bearer ' + key,
        'Content-Type': 'application/json'
    })
    
    const request = {
        headers,
        method: "POST",
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "response_format": { "type": "json_object" },
            "message": [
                {
                    "role": "user",
                    "content": "what?",
                }
            ]
        })
    }

    fetch('https://api.openai.com/v1/chat/completions', request)
    .then((response) => {
        data = response
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
        alert('invalid OpenAI key!')
    })

    return data
}

function formatResponse(data) {
    const objects = []


    return objects
}