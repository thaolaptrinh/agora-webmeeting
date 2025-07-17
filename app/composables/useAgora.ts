import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk';
import type {
	IAgoraRTCClient,
	IAgoraRTCRemoteUser,
	ILocalAudioTrack,
	IRemoteAudioTrack,
	IRemoteVideoTrack,
	UID,
} from 'agora-rtc-sdk-ng';
import { AgoraLogLevel } from '~/constants/agora';

export const useAgora = () => {
	const config = useRuntimeConfig();
	const store = useAgoraStore();

	const initClient = async () => {
		if (store.client) return;

		AgoraRTC.setLogLevel(import.meta.dev ? AgoraLogLevel.DEBUG : AgoraLogLevel.ERROR);

		const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
		store.setClient(client);

		client.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType) => {
			console.log('🚀 ~ client.on ~ user:', user);
			await client.subscribe(user, mediaType);

			if (mediaType === 'video') {
				const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
				remoteVideoTrack?.play(`user-${user.uid}`);
			}

			if (mediaType === 'audio') {
				const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
				remoteAudioTrack?.play();
			}
		});
	};

	const initRTM = async (userId: string, channelName: string) => {
		const rtm = new AgoraRTM.RTM(config.public.agoraAppId, userId);

		rtm.addEventListener('message', (event) => {
			console.log('📩 Message:', event.publisher, event.message);
		});

		await rtm.login();
		await rtm.subscribe(channelName);

		await rtm.publish(channelName, JSON.stringify({ type: 'JOIN', userId }));
	};

	const join = async (
		channel: string,
		token?: string | null,
		uid?: UID | null,
	) => {
		if (!store.client) return;
		const UID = await store.client.join(config.public.agoraAppId, channel, token ?? null, uid ?? null);

		const audioTrack: ILocalAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		await store.client.publish([audioTrack]);

		await initRTM(`user_${UID}`, channel);
	};

	const leave = async () => {
		if (!store.client) return;
		await store.client.leave();
	};

	return {
		initClient,
		join,
		leave,
	};
};
