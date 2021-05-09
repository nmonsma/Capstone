const postData = async (url = '', data = {})=> {
    const response = await fetch(url, {   
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const returnedData = await response.json();
        return returnedData;        //This returns the returnedData to the function call
    }catch(error) {
        console.log("error", error);
        return 'error';
    }
};

export { postData };