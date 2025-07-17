import type {
	UID,
} from 'agora-rtc-sdk-ng';

export interface AgoraConfig {
	appId: string;
	channel: string;
	token?: string | null;
	uid?: UID | null;
}
