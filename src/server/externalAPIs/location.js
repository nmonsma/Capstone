/*External API call*/
app.post('/location', async function (request, response){
    //OpenCage Lat-Long
    const latLongKey = '5a30cda702464b90a8e4ff72c17f0d2a';
    const latLongUrl = 'https://api.opencagedata.com/geocode/v1/json?';
    //https://opencagedata.com/api
    //https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=5a30cda702464b90a8e4ff72c17f0d2a

    const sentData = `${request.body.location}`;
    const externalResponse = await fetch(`${latLongUrl}q=${sentData}&key=${latLongKey}`)
    try {
        const returnedData = await externalResponse.json()
        response.send(returnedData)
    } catch(error) {
        console.log(error)
    }
})