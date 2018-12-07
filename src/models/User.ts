/**
 * Represents a User
 */
export class User {
    /**
     * The user's unique Id
     */
    id: number;
    /**
     * The user's full name
     */
    name: string;
    /**
     * The user's email address
     */
    email: string;
    /**
     * The user's account creation date
     */
    created_at: Date;

    /**
     * Constructor
     * @param data JSOn data to parse all information from
     */
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.created_at = new Date(data.created_at);
    }
}