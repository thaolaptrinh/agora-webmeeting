<script setup lang="ts">
const name = ref<string | null>('thao');

const isLocalVideoEnabled = ref(false);
const isCameraStarting = ref(false);
const isLocalAudioEnabled = ref(false);
const showRegisterCard = ref(false);
const showDeviceSettings = ref(false);

const videoRef = ref<HTMLVideoElement | null>(null);
let localStream: MediaStream | null = null;

const toggle = (target: Ref<boolean>) => target.value = !target.value;
const toggleRegisterCard = () => toggle(showRegisterCard);
const toggleDeviceSettings = () => toggle(showDeviceSettings);
const toggleLocalAudio = () => toggle(isLocalAudioEnabled);

const toggleLocalVideo = async () => {
	if (!isLocalVideoEnabled.value) {
		isCameraStarting.value = true;
		try {
			localStream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.value) {
				videoRef.value.srcObject = localStream;
				await videoRef.value.play();
			}
			isLocalVideoEnabled.value = true;
		}
		catch (error) {
			console.error('Cannot access webcam:', error);
			isLocalVideoEnabled.value = false;
		}
		finally {
			isCameraStarting.value = false;
		}
	}
	else {
		isLocalVideoEnabled.value = false;
		if (localStream) {
			localStream.getTracks().forEach(track => track.stop());
			localStream = null;
		}
		if (videoRef.value) {
			videoRef.value.srcObject = null;
		}
	}
};

const { params } = useRoute();
const agora = useAgora();

const join = async () => {
	const channelName = params?.channel as string;
	await agora.join(channelName);
};

onMounted(async () => {
	await agora.initClient();
});
</script>

<template>
	<div class="min-h-screen flex items-center justify-center px-4 py-10">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,340px)] gap-x-14 gap-y-8 max-w-5xl w-full items-center">
			<!-- Video Preview -->
			<div
				class="mx-auto relative w-full max-w-xl aspect-video rounded-xl overflow-hidden bg-[#202124] flex items-center justify-center"
			>
				<video
					v-show="isLocalVideoEnabled"
					ref="videoRef"
					autoplay
					muted
					playsinline
					class="absolute top-0 left-0 w-full h-full object-cover"
				/>

				<div
					v-if="!isLocalVideoEnabled"
					class="text-white text-md"
				>
					<span v-if="isCameraStarting">Camera is starting</span>
					<span v-else>Camera is off</span>
				</div>
			</div>

			<!-- Control Buttons -->
			<div class="lg:order-2 flex justify-center gap-6 text-gray-700 [&>*]:cursor-pointer">
				<UIcon
					:name="isLocalVideoEnabled ? 'ic:baseline-videocam' : 'ic:baseline-videocam-off'"
					class="size-6"
					@click="toggleLocalVideo"
				/>
				<UIcon
					:name="isLocalAudioEnabled ? 'ic:baseline-keyboard-voice' : 'ic:baseline-mic-off'"
					class="size-6"
					@click="toggleLocalAudio"
				/>
				<UIcon
					name="ic:outline-person-pin"
					class="size-6"
					@click="toggleRegisterCard"
				/>
				<UIcon
					name="ic:sharp-center-focus-strong"
					class="size-6"
				/>
				<UIcon
					name="ic:baseline-settings"
					class="size-6"
					@click="toggleDeviceSettings"
				/>
			</div>

			<!-- Info + Form -->
			<div class="w-full lg:max-w-sm flex flex-col items-center gap-4 text-center lg:text-left lg:items-start">
				<h2 class="text-3xl font-semibold leading-snug">
					Ready to join <br>
					a Video conference
				</h2>
				<p class="text-gray-700 text-sm">
					No one else has joined yet.
				</p>

				<label class="text-sm text-gray-600">Your Name</label>
				<UInput
					v-model="name"
					placeholder="Enter your name"
					class="w-full max-w-xs"
					:ui="{ base: 'px-3 py-[10px] rounded-full' }"
				/>

				<UButton
					class="w-fit px-6 py-2 rounded-full mt-2 cursor-pointer"
					@click="join"
				>
					Join Now
				</UButton>
			</div>
		</div>

		<!-- Lazy Panels -->
		<LazyRegisterBusinessCardPanel
			v-if="showRegisterCard"
			:visible="showRegisterCard"
			@close="showRegisterCard = false"
		/>
		<LazyDeviceSettingsPanel
			v-if="showDeviceSettings"
			:visible="showDeviceSettings"
			@close="showDeviceSettings = false"
		/>
	</div>
</template>
