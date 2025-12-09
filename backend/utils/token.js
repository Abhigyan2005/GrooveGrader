export function getRandomString(length) {
    let rstring = '';

    for (let i = 0; i < length; i += 1){
        rstring+=Math.floor(Math.random() * length);
    }

    return rstring;
}