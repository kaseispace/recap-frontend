export const useGenerateRandomColor = () => {
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

  const createRandomColor = () => {
    const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    const selectedSaturation = colorSaturationLevels[Math.floor(Math.random() * colorSaturationLevels.length)]
    rotationAngle.value = rotationAngles[Math.floor(Math.random() * rotationAngles.length)]

    cardBgColor.value = `bg-${selectedColor}-${selectedSaturation.cardSaturation}`
    sealBgColor.value = `bg-${selectedColor}-${selectedSaturation.sealSaturation}/70`
  }

  return { cardBgColor, sealBgColor, rotationAngle, createRandomColor }
}
