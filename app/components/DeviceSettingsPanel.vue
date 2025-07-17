<script setup lang="ts">
defineProps<{ visible: boolean }>();
defineEmits(['close']);

const devices = ref<MediaDeviceInfo[]>([]);

onMounted(async () => {
	await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

	devices.value = await navigator.mediaDevices.enumerateDevices();
});
</script>

<template>
	<transition name="slide">
		<div
			v-if="visible"
			class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-50 transition-transform duration-300"
		>
			<div class="p-6 overflow-y-auto h-full relative flex flex-col">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-bold">
						Device Settings
					</h2>
					<button
						class="text-gray-500 hover:text-black cursor-pointer flex items-center justify-center"
						@click="$emit('close')"
					>
						<UIcon
							name="ic:round-close"
							class="w-6 h-6"
						/>
					</button>
				</div>

				<form class="space-y-3 text-sm flex-1 flex flex-col">
					{{
						devices }}
				</form>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
