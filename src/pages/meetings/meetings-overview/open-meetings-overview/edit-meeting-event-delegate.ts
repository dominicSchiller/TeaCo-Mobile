import {CreateMeetingEventDelegate} from "../../create-new-meeting/create-meeting-event-delegate";
import {CreateSuggestionEventDelegate} from "../../../suggestions/create-new-suggestion/create-suggestion-event-delegate";
import {ParticipantsManagerDelegate} from "../../../../components/participants/participants-manager/participants-manager-delegate";
import {MeetingProgress} from "../../../../models/meeting-progress";

/**
 * Delegate interface which defines callback functions
 * for editing meetings.
 */
export interface EditMeetingEventDelegate extends CreateMeetingEventDelegate, CreateSuggestionEventDelegate {
    /**
     * Callback function which will be called in case of
     * a suggestion has been deleted from a meeting.
     * @param meetingId The suggestions' associated meeting's id
     * @param suggestionId The deleted suggestions's id
     */
    onSuggestionDeleted(meetingId: number, suggestionId: number);
    /**
     * Callback function which will be called in case of the number
     * of participants has been updated.
     * @param meetingId The associated meeting's id
     * @param numberOfParticipants The updated participants count
     */
    onParticipantsUpdated(meetingId: number, numberOfParticipants: number);
    /**
     * Callback function which will be called in case of
     * a meeting's overall progress has been changed.
     * @param meetingId The suggestions' associated meeting's id
     * @param progress The new meeting progress
     */
    onMeetingProgressChanged(meetingId: number, progress: MeetingProgress);
    /**
     * Callback function which will be called in case of a meeting
     * planning got finalized.
     * @param meetingId The id of the meeting which got finalized
     */
    onMeetingFinalized(meetingId: number);
}