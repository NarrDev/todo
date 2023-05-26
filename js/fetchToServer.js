export async function fetching(route, postingData) {
    const data = await fetch("http://localhost:8080/"+route, {
      method: "POST",
      body: JSON.stringify(postingData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
    return(data)
}