/**
 * Model class representing a meeting.
 */
import {User} from "./User";
import {Suggestion} from "./Suggestion";


export class Meeting {

    /**
     * Id representing the meeting.
     */
    id: number;

    /**
     * Initator_id representing the creator of the meeting.
     */
    initiator_id: number;

    /**
     * Title of the meeting.
     */
    title: string;

    /**
     * Date the meeting was created.
     */
    created_at: Date;


    /**
     * Date the meeting was last updated.
     */
    updated_at: Date;

    /**
     * Whether the meeting is restricted.
     */
    restricted: boolean;

    /**
     * The meeting's initiator
     */
    initiator: User;

    /**
     * List of participants associated with this meeting
     */
    participants: User[];

    /**
     * List of suggestions proposed for this meeting
     */
    suggestions: Suggestion[];

    /**
     * Constructor
     * @param data JSON data to parse all meeting's information from
     */
    constructor(data: any) {
        this.id = data.id;
        this.initiator_id = data.initiator_id;
        this.title = data.title;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.restricted = data.restricted;
        this.initiator = new User(data.initiator);

        this.participants = [];
        data.participants.forEach(participantData => {
            this.participants.push(new User(participantData))
        });


        this.suggestions = [];
        // enable the following once server side is up to date
  //      data.suggestions.forEach(suggestionData => {
  //          this.suggestions.push(new Suggestion(suggestionData))
  //      })
    }

}