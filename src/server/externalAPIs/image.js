/*External API call*/
app.post('/image', async function (request, response){
    const apiData = `${request.body.JSONNAME}`; //TODO: add JSON name
    const externalResponse = await fetch(`${apiUrl}&key=${apiKey}&${apiData}`) //TODO: check api info
    try {
        const data = await externalResponse.json()
        response.send(data)
    } catch(error) {
        console.log(error)
    }
})