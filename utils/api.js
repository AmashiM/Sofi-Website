const axios = require('axios').default;

function authLink(client_id, client_secret, redirect_uri){
    let query = new URLSearchParams({
        client_id: client_id,
        client_secret, client_secret,
        redirect_uri: redirect_uri
    })
    return `https://discord.com/api/oath2/authorize?${query}`
}


class User {
    /**
     * @type {string}
     */
    id = null;
    /**
     * @type {string}
     */
    username = null;
    /**
     * @type {string}
     */
    avatar = null;
    /**
     * @type {string}
     */
    discriminator = null;
    
    constructor(data){
        this.id = data.id || null;
        this.username = data.username || null;
        this.avatar = data.avatar || null;
        this.discriminator = data.discriminator || null;

    }

    get tag(){
        return `${this.username}#${this.discriminator}`;
    }
}


class Auth {
    /**
     * @type {string}
     */
    access_token =  null;
    /**
     * @type {string}
     */
	token_type = null;
    /**
     * @type {number}
     */
	expires_in = null;
    /**
     * @type {string}
     */
	refresh_token = null;
    /**
     * @type {string}
     */
	scope = null;

    constructor(data){
        this.access_token = data.access_token || null;
        this.token_type = data.access_token || null;
        this.expires_in = data.expires_in || null;
        this.refresh_token = data.refresh_token || null;
        this.scope = data.scope || null;
    }

    get authorization(){
        return `${this.token_type} ${this.access_token}`
    }
}


/**
 * 
 * @param {Auth} auth 
 * @returns {User}
 */
async function getUser(auth){

    const userResult = await axios.get('https://discord.com/api/users/@me', {
        "headers": {
            "authorization": auth.authorization
        },
    });

    return new User(await userResult.json());
}



