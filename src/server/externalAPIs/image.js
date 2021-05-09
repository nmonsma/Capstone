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



// //Find a Photo Based on the Place Name
// const getPhoto = async (data) => {
//     //Pixabay
//     const imageKey = '21522846-27a00893d043b59f2a796a600';
//     const imageUrl = 'https://pixabay.com/api/?';
//     const searchTerm = encodeURIComponent(data);
//     //https://pixabay.com/api/
//     //https://pixabay.com/api/?key=21522846-27a00893d043b59f2a796a600&q=yellow+flowers&image_type=photo

//     //const response = await fetch (`https://pixabay.com/api/?key=21522846-27a00893d043b59f2a796a600&q=yellow+flowers&image_type=photo&pretty=true`);
//     const response = await fetch (`${imageUrl}key=${imageKey}&q=${searchTerm}&image_type=photo&pretty=true`);
//     try {
//         const returned = await response.json();
//         if (returned.total>0) {
//             console.log(returned);
//             return returned.hits[0].largeImageURL;
//         }else{

//             //If the first search returns no results, only search for the search string up until a special character. (e.g. "Chicago, IL" becomes "Chicago")

//             const newSearchTerm = searchTerm.substring(0, searchTerm.indexOf('%'));
//             const newResponse = await fetch (`${imageUrl}key=${imageKey}&q=${newSearchTerm}&image_type=photo&pretty=true`);
//             try {
//                 const newReturned = await newResponse.json();
//                 if (newReturned.total>0) {
//                     console.log(newReturned);
//                     return newReturned.hits[0].largeImageURL;
//                 } else {
                    
//                     // If the second search returns nothing, then return 'none';
                    
//                     return 'none';
//                 }
//             }catch(error){
//                 console.log("error", error);
//             }
//         }
//     }catch(error){
//         console.log("error",error);
//     }
//     //else
// }