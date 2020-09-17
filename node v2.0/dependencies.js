if(!process.env.jwtSecretKey){
    console.log('Error: JWT Secret not found');
    process.exit(1)
}
