import {Vote} from "./vote";
import {DateTimeHelper} from "../utils/date-time-helper";

/**
 * Model class representing a suggestion.
 */
export class Suggestion {

    /**
     * The suggestion's unique id
     */
    id: number;
    /**
     * The associated meeting's unique ID
     */
    meetingId: number;
    /**
     * The initiator's id representing the creator of the suggestion.
     */
    creatorId: number;
    /**
     * Status whether this suggestions has been picked as final date or not
     */
    isPicked: boolean;
    /**
     * The suggestion's date
     */
    date: Date;
    /**
     * The suggestion's starting time
     */
    startTime: Date;
    /**
     * The suggestion's ending time
     */
    endTime: Date;
    /**
     * Timestamp of creation
     */
    createdAt: Date;
    /**
     * Timestamp of last update
     */
    updatedAt: Date;
    /**
     * List of associated votes
     */
    votes: Vote[];

    private isTimeZoneNormalized: boolean;

    private timeZoneOffset: number;

    /**
     * Constructor
     */
    constructor() {
        let now = new Date();
        this.id = -1;
        this.creatorId = -1;
        this.createdAt = now;
        this.updatedAt = now;
        this.date = undefined;
        this.startTime = undefined;
        this.endTime = undefined;
        this.votes = [];
        this.isTimeZoneNormalized = false;
        this.timeZoneOffset = 0;
    }

    /**
     * Create a new suggestion instance from given data object
     * @param data JSON data to parse suggestion information here
     * @return Build suggestion instance
     */
    public static of(data: any): Suggestion {
        let suggestion = new Suggestion();
        
        suggestion.id = data.id;
        suggestion.meetingId = data.meeting_id;
        suggestion.creatorId = data.creator_id;
        suggestion.isPicked = data.picked;
        suggestion.createdAt = new Date(data.created_at);
        suggestion.updatedAt = new Date(data.updated_at);
        suggestion.date = new Date(data.date);
        suggestion.startTime = new Date(data.start);
        suggestion.endTime = new Date(data.end);

        // normalize time zone
        suggestion.normalizeTimeZoneOffset();

        // parse votes
        if(data.votes != undefined) {
            data.votes.forEach(voteData => {
                suggestion.votes.push(new Vote(voteData))
            });
        }
        return suggestion;
    }

    /**
     * Will normalize the suggestion's times with the given time zone offset.
     */
    public normalizeTimeZoneOffset() {
        let timeZoneOffset = this.date.getTimezoneOffset()/60;
        if(this.startTime.getTimezoneOffset()/60 < 0) {
            this.startTime.setHours(this.startTime.getHours() + timeZoneOffset);
            this.endTime.setHours(this.endTime.getHours() + timeZoneOffset);
            this.isTimeZoneNormalized = true;
            this.timeZoneOffset = timeZoneOffset;
        }
    }

    /**
     * Will remove the the suggestion's times normalization if applied.
     */
    public denormalizeTimeZoneOffset() {
        if(this.isTimeZoneNormalized) {
            this.startTime.setHours(this.startTime.getHours() - this.timeZoneOffset);
            this.endTime.setHours(this.endTime.getHours() - this.timeZoneOffset);
            this.isTimeZoneNormalized = false;
            this.timeZoneOffset = 0;
        }
    }
}