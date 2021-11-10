const apiGithub = axios.create({
    baseURL: "https://api.github.com/users/thobiassilva"
});

apiGithub.get("/").then((result) => console.log(result.data));
apiGithub.get("https://api.github.com/users/thobiassilva").then((result) => console.log(result.data));