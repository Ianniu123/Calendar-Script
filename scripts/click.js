function handleClick() {
    event.preventDefault();
    let OPEN_AI_KEY = document.getElementById('open_ai_key').value
    document.getElementById('open_ai_key').value = ""
    console.log(OPEN_AI_KEY)
    
    let prompt = "";
    let data = getGPTResponse(prompt)

    const arr = processDocument(data)

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

function getGPTResponse(prompt) {

}

function processDocument(data) {
    const objects = []


    return objects
}
