import { defineStore } from 'pinia';
import type {
	IAgoraRTCClient,
} from 'agora-rtc-sdk-ng';

export const useAgoraStore = defineStore('agora', () => {
	const client = ref<IAgoraRTCClient | null>(null);

	const setClient = (c: IAgoraRTCClient | null) => client.value = c;

	return {
		client,
		setClient,
	};
});
