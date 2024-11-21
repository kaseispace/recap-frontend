<script setup lang="ts">
const cardBgColor = ref('')
const sealBgColor = ref('')
const rotationAngle = ref('')
const colorPalette = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
]
const colorSaturationLevels = [
  { cardSaturation: 100, sealSaturation: 600 },
  { cardSaturation: 200, sealSaturation: 100 }
]
const rotationAngles = [
  '-rotate-[3deg]', '-rotate-[5deg]', '-rotate-[7deg]', '-rotate-[10deg]',
  'rotate-[3deg]', 'rotate-[5deg]', 'rotate-[7deg]', 'rotate-[10deg]'
]

const generateRandomColor = () => {
  const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
  const selectedSaturation = colorSaturationLevels[Math.floor(Math.random() * colorSaturationLevels.length)]
  rotationAngle.value = rotationAngles[Math.floor(Math.random() * rotationAngles.length)]

  cardBgColor.value = `bg-${selectedColor}-${selectedSaturation.cardSaturation}`
  sealBgColor.value = `bg-${selectedColor}-${selectedSaturation.sealSaturation}/70`
}

onMounted(() => {
  generateRandomColor()
})
</script>

<template>
  <div>
    <div
      class="cursor-pointer duration-300 ease-in-out hover:scale-110"
      :class="rotationAngle"
    >
      <div
        class="relative flex size-60 items-center justify-center text-gray-800"
        :class="cardBgColor"
      >
        <div class="line-clamp-[8] size-48">
          <slot />
        </div>

        <div class="absolute bottom-[-5px] right-[7px] -z-10 h-1/2 w-[70%] rotate-[5deg] bg-[#d0d0d0] blur-sm" />
        <div
          class="absolute -top-3 left-1/2 h-8 w-20 -translate-x-1/2 rotate-3"
          :class="sealBgColor"
        />
      </div>
    </div>
  </div>
</template>
