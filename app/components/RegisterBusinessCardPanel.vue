<script setup lang="ts">
defineProps<{ visible: boolean }>();
defineEmits(['close']);
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
						Register Business Card
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

				<p class="text-sm text-gray-500 mb-4">
					Let's register business cards! You can exchange e-business cards, or
					scan business cards. If you don't have a business card, just make one
					as your profile.
				</p>

				<button
					class="w-full border border-pink-300 text-pink-500 rounded-md py-2 mb-4 font-medium flex justify-center items-center gap-2"
				>
					<span>📷</span> SCAN YOUR BUSINESS CARD
				</button>

				<div class="flex items-center my-4 text-gray-400 text-sm">
					<div class="flex-grow border-t" />
					<span class="px-2">OR</span>
					<div class="flex-grow border-t" />
				</div>

				<form class="space-y-3 text-sm flex-1 flex flex-col">
					<UInput
						type="text"
						placeholder="Company"
						class="w-full rounded"
					/>

					<div class="flex gap-2">
						<UInput
							type="text"
							placeholder="Department"
						/>
						<UInput
							type="text"
							placeholder="Position"
						/>
					</div>

					<div class="flex gap-2">
						<UInput
							type="text"
							placeholder="First Name"
						/>
						<UInput
							type="text"
							placeholder="Last Name"
						/>
					</div>

					<div class="text-gray-500 pt-2">
						Address
					</div>
					<div class="flex gap-2">
						<UInput
							type="text"
							placeholder="Postcode"
						/>
						<UInput
							type="text"
							placeholder="State"
						/>
						<UInput
							type="text"
							placeholder="City"
						/>
					</div>

					<UButton
						size="lg"
						class="mt-auto w-full justify-center cursor-pointer"
					>
						REGISTER
					</UButton>
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
